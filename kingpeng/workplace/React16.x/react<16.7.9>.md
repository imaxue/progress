## 封装一下评弹窗组件：用到了最新的react的一下api

### 1、TouchScroll.tsx

```
** import { CSSProperties, PureComponent, TouchEvent, WheelEvent } from "react";
import StopBodyScroll from "./StopBodyScroll";

export default class TouchScroll extends PureComponent<{ className?: string, style?: CSSProperties }> {
    private touchBeginY = 0;
    private scrollTop = 0;
    private root: HTMLDivElement | null = null;
    private handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        if (this.touchBeginY === 0) return this.touchBeginY = e.touches[0].clientY;
        this.root!.scrollTop = this.touchBeginY - e.touches[0].clientY + this.scrollTop;
    }
    private handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
        this.touchBeginY = 0;
        this.scrollTop = this.root!.scrollTop;
    }
    private handleWheel = (e: WheelEvent<HTMLDivElement>) => {
        this.root!.scrollTop = this.root!.scrollTop + e.nativeEvent.deltaY;
        this.scrollTop = this.root!.scrollTop;
    }
    public static defaultProps = {
        style: {},
    };
    public render() {
        return (
            <div className={this.props.className} onWheel={this.handleWheel} ref={ele => this.root = ele} style={{ overflow: "auto", ...this.props.style }} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd} >
                {this.props.children}
                <StopBodyScroll />
            </div >
        );
    }
}

```

### 2、StopBodyScroll.tsx

```

import { PureComponent } from "react";
import { createGlobalStyle } from "styled-components";

const StopBodyScrollStyle = createGlobalStyle`
    html, body {
        overflow: hidden;
    }
`;

class StopBodyScroll extends PureComponent {
    private top = 0;
    private preventDefault = (e: Event) => e.preventDefault();
    public componentDidMount() {
        document.addEventListener("touchmove", this.preventDefault, { passive: false });
        document.addEventListener("wheel", this.preventDefault, { passive: false });
    }
    public componentWillUnmount() {
        document.removeEventListener("touchmove", this.preventDefault);
        document.removeEventListener("wheel", this.preventDefault);
    }
    public render() {
        return <StopBodyScrollStyle />;
    }
}

export default StopBodyScroll;


```


### 3、FloatComment.tsx

```
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import getConfig from "next/config";
import Router from "next/router";
import { PureComponent, SFC } from "react";
import styled from "styled-components";
import request from "../../lib/request";
import Utility from "../../lib/Utility";
import { Consumer, ContextValueType } from "../appContext";
import TouchScroll from "./TouchScroll";

dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

const { publicRuntimeConfig } = getConfig();
const FloatCommentShade = styled.div`
    position: fixed;
    bottom: 0; top:0; left: 0; right:0;
    z-index: 1100;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
`;
const FloatCommentRoot = styled.div`
    display: flex;
    flex-direction: column;
    background: #ffffff;
    height: 70vh;
    width: 100%;
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
    header{
        font-size: 12px;
        height: 1em;
        color: #aaaaaa;
        text-align: center;
        position: relative;
        flex: none;
        img {
            height: .9em;
            position: absolute;
            right: 0;
        }
    }
`;
const FloatCommentItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    font-size: 14px;
    line-height: 1.6;
    .headImg{
        height: .64rem;
        border-radius: 50%;
    }
    img {
        display: block;
    }
    .gray{
        color: #999999;
    }
    .like{
        text-align: center;
        color: #666666;
        img {
            height: 1.2em;
        }
    }
    .comment{
        flex: auto;
        margin: 0 15px;
    }
`;
const CommentInput = styled.div`
    display: flex;
    font-size: 14px;
    height: .9rem;
    line-height: .9rem;
    position: fixed;
    z-index: 300;
    width: 100%;
    bottom: 0;
    box-shadow: 0 -4px 12px 0 rgba(0,0,0,0.10);
    left: 0;
    input{
        flex: auto;
        color: #888888;
        height: 100%;
        display: block;
        outline: none;
        padding: 0 10px;
        border: none;
    }
    .sendButton {
        flex: 0 0 1.48rem;
        text-align: center;
        color: white;
        background: #f23854;
    }
`;

const ReplyShade = styled.div`
    position: fixed;
    z-index: 20;
    background: rgba(0,0,0,.1);
    top: 0; left: 0; right: 0; bottom: 0;
`;
const Blank = styled.div`
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #aaa;
`;

const CommentList = styled.div`
    overflow: auto;
    flex: auto;
    padding-bottom: .9rem;
`;

interface IFloatCommentProps {
    groupId: number;
    commentUserId: number | string;
    addCommentCount?: () => void;
    onClose?: () => void;
}
class FloatComment extends PureComponent<IFloatCommentProps & ContextValueType> {
    private ele: any;
    private input: HTMLInputElement | null = null;
    public state = {
        comments: [] as api.IComment[],
        size: 0,
        commentContent: "", // 评论内容
        replyCommentId: undefined as number | undefined, // 回复用户
        replyReplyId: undefined as number | undefined, // 针对回复进行回复 的回复id
        isFetched: false,
    };

    public static defaultProps = {
        onClose: new Function(),
    };
    public componentDidMount() {
        this.fetch();
    }

    /**
     * 拉取评论数据
     */
    private fetch = () => {
        request<api.ICommentList>("getCommentList/v2", {
            userId: this.props.user.userId,
            token: this.props.user.token,
            groupId: this.props.groupId,
            pageIndex: 1,
            pageSize: 100,
            orderFlag: 2,
        }).then(res => {
            this.setState({ isFetched: true, size: res.size, comments: res.comments, commentUserId: undefined, replyReplyId: undefined, commentContent: "" });
        });
    }
    /**
     * 对评论点赞
     */
    private like = async (type: 0 | 1 | 2, commentId: number) => {
        if (!this.props.user.userId) return Router.push("/login");
        const comment = this.state.comments.find(item => item.commentId === commentId);
        const operate = comment ? (+comment.isLike ? "0" : "1") : "1";

        await request("likeV2", {
            userId: this.props.user.userId,
            token: this.props.user.token,
            type, // 0，针对组图的操作；1，针对评论的操作；2:针对回复的操作
            groupId: this.props.groupId,
            targetId: commentId,
            operate,
            targetUId: this.props.commentUserId,
        });
        this.fetch();
    }
    /**
     * 保存评论
     */
    private saveComment = async () => {
        if (!this.state.commentContent) return;
        await request("saveCommentV2", {
            userId: this.props.user.userId,
            token: this.props.user.token,
            targetId: this.props.groupId,
            flag: 0,
            targetUid: this.props.commentUserId,
            content: this.state.commentContent,
        });
        this.fetch();
        if (this.props.addCommentCount) this.props.addCommentCount();
    }
    private saveCommentReply = async () => {
        if (!this.state.commentContent) return;
        await request("saveCommentReply", {
            userId: this.props.user.userId,
            token: this.props.user.token,
            groupId: this.props.groupId,
            commentId: this.state.replyCommentId,
            targetReplyId: this.state.replyReplyId || this.state.replyCommentId,
            replyType: this.state.replyReplyId ? 2 : 1,
            targetUid: this.props.commentUserId,
            fromUid: this.props.user.userId,
            content: this.state.commentContent,
        });
        this.fetch();
    }
    public render() {
        const comment = this.state.comments.find(item => item.commentId === this.state.replyCommentId);
        const replyComment = this.state.replyReplyId && comment && comment.replyList.find(item => item.replayId === this.state.replyReplyId);
        const inputPlaceholder = replyComment ? `回复@${replyComment.fromUserName}` : (comment ? `回复@${comment.wechatName || comment.userName}` : "说点什么吧");
        // (dayjs(item1.createtime) as any).fromNow()
        return (
            <FloatCommentShade ref={e => this.ele = e} onClick={this.props.onClose}>
                <FloatCommentRoot onClick={e => e.stopPropagation()}>
                    {!!replyComment && <ReplyShade onClick={() => this.setState({ replyCommentId: undefined })} />}
                    <header>
                        {this.state.comments.length > 0 && this.state.size + "条评论"}
                        <img onClick={this.props.onClose} src={publicRuntimeConfig.resUrl + "/img/close.png"} />
                    </header>
                    {!this.state.comments.length && this.state.isFetched && <Blank>暂无评论，来抢沙发...</Blank>}
                    ** <CommentList as={TouchScroll} onTouchMove={console.log}>
                        {this.state.comments.map(item => <div key={item.commentId}>
                            <FloatCommentItem
                                onClick={() => {
                                    this.setState({ replyCommentId: item.commentId, replyReplyId: undefined });
                                    if (this.input) this.input.focus();
                                }}
                            >
                                <img className="headImg" src={item.userUrl} alt="" />
                                <div className="comment">
                                    <div className="gray">{item.userName || item.wechatName}</div>
                                    <div>{item.content}</div>
                                    <div className="gray">{Utility.timeAgo(item.createtime) || "刚刚"}</div>
                                </div>
                                <div onClick={e => { e.stopPropagation(); this.like(1, item.commentId); }} className="like">
                                    <img src={`${publicRuntimeConfig.resUrl}/img/like${item.isLike ? "_hot" : ""}.png`} /> {item.collectNum}
                                </div>
                            </FloatCommentItem>
                            {!!item.replyCount && item.replyList.map(item1 => <div style={{ marginLeft: 15 }} key={item1.replayId}>
                                <FloatCommentItem
                                    onClick={() => {
                                        this.setState({ replyCommentId: item.commentId, replyReplyId: item1.replayId });
                                        if (this.input) this.input.focus();
                                    }}
                                >
                                    <img className="headImg" src={item1.fromUserUrl} />
                                    <div className="comment">
                                        <div className="gray">{item1.fromUserName}</div>
                                        <div>{item1.content}</div>
                                        <div className="gray">{Utility.timeAgo(item1.createtime) || "刚刚"}</div>
                                    </div>
                                    <div className="like" style={{ visibility: "hidden" }}>
                                        <img src={`${publicRuntimeConfig.resUrl}/img/like${item1.isLike ? "_hot" : ""}.png`} /> {item1.likeNum}
                                    </div>
                                </FloatCommentItem>
                            </div>)
                            }
                        </div>)}
                    </CommentList>
                </FloatCommentRoot>
                <CommentInput onClick={e => e.stopPropagation()}>
                    <input
                        onFocus={(e) => {
                            if (!this.props.user.userId) {
                                e.target.blur();
                                return this.props.toggleLoginModalVisible(true);
                            }
                        }}
                        ref={e => this.input = e}
                        onChange={e => this.setState({ commentContent: e.target.value })}
                        value={this.state.commentContent}
                        placeholder={inputPlaceholder}
                    />
                    <div onClick={() => this.state.replyCommentId ? this.saveCommentReply() : this.saveComment()} className="sendButton">发送</div>
                </CommentInput>
            </FloatCommentShade>
        );
    }
}

const FloatCommentContainer: SFC<IFloatCommentProps> = (props) => <Consumer>{(appState) => <FloatComment {...props} {...appState} />}</Consumer>;

export default FloatCommentContainer;


```
