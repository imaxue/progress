### 一 createStore.tsx

```
import produce from "immer";
import React, { createContext, PureComponent } from "react";

interface IProviderComponent<STATE> extends PureComponent<{ store: Partial<STATE> }, STATE> {
    methods: ReturnType<typeof addMethodsToStore>;
    effects: ReturnType<typeof addEffectsToStore>;
}
type CreateMethods<STATE extends {}, METHODS> = (state: STATE, provider: IProviderComponent<STATE>) => METHODS;
type CreateEffects<STATE extends {}, METHODS, EFFECTS> = (methods: METHODS, provider: IProviderComponent<STATE>) => EFFECTS;

function addEffectsToStore<STATE, METHODS, EFFECTS>(createEffects: CreateEffects<STATE, METHODS, EFFECTS>, provider: IProviderComponent<STATE>) {
    const finalEffects = createEffects(provider.methods as any, provider);
    for (const key of Object.keys(finalEffects)) {
        finalEffects[key] = (...arg) => {
            return createEffects(provider.methods as any, provider)[key](...arg);
        };
    }
    return finalEffects;
}

function addMethodsToStore<STATE, METHODS>(createMethods: CreateMethods<STATE, METHODS>, provider: IProviderComponent<STATE>) {
    const finalMethods = createMethods(provider.state, provider);
    for (const key of Object.keys(finalMethods)) {
        finalMethods[key] = (...arg) => {
            let returnVal;
            const state = produce(provider.state, draftValue => {
                returnVal = createMethods(draftValue as any, provider)[key](...arg);
            });
            provider.setState(state);
            return returnVal;
        };
    }
    return finalMethods;
}

/**
 * 创建全局context
 * @param namespace store 名称 可通过window.store[namespace] 查看数据
 * @param appState 初始状态
 * @param createMethods 创建修改状态方法函数
 * @param createEffects 创建异步方法函数
 */
function createStore<STATE = {}, METHODS = {}, EFFECTS = {}>(namespace: string, appState: STATE, createMethods: CreateMethods<STATE, METHODS>, createEffects: CreateEffects<STATE, METHODS, EFFECTS>) {
    type Update = (state: STATE) => void;
    type ContextType = STATE & METHODS & EFFECTS & { update: (updater: Update) => void };
    const defaultContextValue: ContextType = Object.assign({}, appState, createMethods(appState, {} as any), createEffects({} as any, {} as any), { update: new Function() });
    const context = createContext(defaultContextValue);
    const { Provider, Consumer } = context;

    class ProviderComponent extends PureComponent<{ store: Partial<STATE> }, STATE> implements IProviderComponent<STATE> {
        public static defaultProps = { store: {} };
        public state = Object.assign({}, appState, this.props.store);
        public methods: METHODS;
        public effects: EFFECTS;
        public render() {
            const update = (updater: Update) => {
                const state = produce(this.state as any, (draftState) => {
                    updater(draftState);
                });
                this.setState(state);
            };
            this.methods = addMethodsToStore(createMethods, this);
            this.effects = addEffectsToStore(createEffects, this);
            if (typeof window === "object") {
                (window as any).store = { ...((window as any).store || {}), [namespace]: this.state };
                if (namespace === "root") (window as any).rootStore = this.state;
            }
            return <Provider value={Object.assign({}, this.state, this.methods, this.effects, { update })}>{this.props.children}</Provider>;
        }
    }

    return {
        Provider: ProviderComponent,
        context,
        Consumer,
        defaultContextValue,
    };
}

export default createStore;


```

### 二、context特性 (appContext.tsx)

```

/**
 * 全局 state
 */
import createStore from "./createStore";

const { Provider, Consumer, context, defaultContextValue } = createStore(
    "root",
    {
        eid: "0",
        isChrome: false,
        loginModalVisible: false,
        user: {
            userId: undefined,
            token: undefined,
            userUrl: undefined,
            isVisitor: true,
        } as api.ISessionUser,
    },
    function createMethods(state, provider) {
        return {
            setEid: (eid: string) => {
                state.eid = eid + state.eid;
            },
            hideLoginModal() {
                state.loginModalVisible = false;
            },
            showLoginModal() {
                state.loginModalVisible = true;
            },
            setUser(userInfo: api.ISessionUser) {
                state.user = userInfo;
                if (localStorage) localStorage.setItem("user", JSON.stringify(state.user));
            },
        };
    },
    function createEffect(methods, provider) {
        return {
            async asyncSetEid(eid: string) {
                await new Promise((res) => setTimeout(res, 1000));
                return methods.setEid(eid);
            },
        };
    });
type ContextType = typeof defaultContextValue;

export {
    Provider,
    Consumer,
    context,
    ContextType,
};


```

### 三、组件中使用

#### 1、使用context

```
import axios from "axios";
import { PureComponent, ReactNode } from "react";
import styled from "styled-components";
import { CompanyId, UserType } from "../../config";
import { context, ContextType } from "../appContext";

interface IFollowContainerProps {
    userId?: string; // 关注人userId
    token?: string;
    followedId: string; // 被关注人userId
    userType: UserType;
    isFollow: boolean; // 是否关注
}

interface IFollowButton extends IFollowContainerProps {
    handleFollow: () => void;
    children: ReactNode;
}
class FollowButtonContainer extends PureComponent<IFollowContainerProps & { children: (data: IFollowButton) => JSX.Element }> {
    public static contextType = context;
    public context: ContextType;
    public state = {
        isFollow: this.props.isFollow,
    };
    private onClickFollowBtn = async () => {
        this.setState({ isFollow: !this.state.isFollow }, async () => {
            let { user: { userId, token } } = this.context;
            if (!userId) {
                const user = await axios.get("/api/createUser" + location.search, { params: { userType: this.props.userType } }).then(res => res.data);
                this.context.setUser(user);
                userId = user.userId;
                token = user.token;
            }
            await axios.post(`/api/social/followuserV2?companyId=${CompanyId.分享页面}`, { userId, followedId: this.props.followedId, operate: this.state.isFollow ? "1" : "0", token }).then(res1 => res1.data);
        });
    }
    public render() {
        return this.props.children({ ...this.props, handleFollow: this.onClickFollowBtn, isFollow: this.state.isFollow });
    }
}

const FollowButton = styled.button < { isFollow: boolean } > `
    background: ${props => props.isFollow ? "rgb(200, 200, 200)" : "#fe2346"};
    border-radius: 5px;
    width: 77px;
    height: 27px;
    color: #fff;
    font-size: 14px;
    border: 0 none;
    padding: 0;
    outline: none;
    float: right;
`;

export {
    FollowButtonContainer as default,
    FollowButtonContainer,
    FollowButton,
};


```

#### 2、使用Consumer组件

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
import { Consumer, context, ContextType } from "../appContext";
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
class FloatComment extends PureComponent<IFloatCommentProps & { user: api.ISessionUser }> {
    private ele: any;
    public static contextType = context;
    public context: ContextType;
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
                        <img onClick={this.props.onClose} src={require("../../static/img/close.png")} />
                    </header>
                    {!this.state.comments.length && this.state.isFetched && <Blank>暂无评论，来抢沙发...</Blank>}
                    <CommentList as={TouchScroll} onTouchMove={console.log}>
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
                                if (!this.context.user.userId || this.context.user.isVisitor) this.context.showLoginModal();
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

const FloatCommentContainer: SFC<IFloatCommentProps> = (props) => <Consumer>{(appState) => <FloatComment {...props} user={appState.user} />}</Consumer>;

export default FloatCommentContainer;


```

#### 3、使用Provider

```

import App, { Container } from "next/app";
import Head from "next/head";
import Router from "next/router";
import React from "react";
import styled, { keyframes } from "styled-components";
import { Consumer, Provider } from "./appContext";
import Login from "./components/Login";
import Nav from "./components/Nav";
import "./normalize.css";

const pageAnimation = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const Page = styled.div`
    animation: ${pageAnimation} .3s linear;
`;

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
const Loader = styled.div`
    border: 6px solid #f3f3f3; /* Light grey */
    border-top: 6px solid #fd405e; /* Blue */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: ${spin} 1.5s linear infinite;
    margin-left: auto;
    margin-right: auto;
    margin-top: 60px;
`;

interface IProps {
    asPath: string; // 网址 pathname
    eid: string;
    user: api.ISessionUser;
    isChrome: boolean;
}

export default class MyApp extends App<IProps> {
    private store = {
        eid: this.props.eid,
        isChrome: this.props.isChrome,
        user: {
            userId: this.props.user.userId,
            token: this.props.user.token,
            userUrl: this.props.user.userUrl,
            isVisitor: this.props.user.isVisitor,
        },
    };
    public state = {
        loading: false,
    };
    private timer: NodeJS.Timer;
    public static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        const eid = ctx.query.eid || "0";
        const locals = ctx.res && ctx.res.locals || { user: {} };
        const isChrome = ((typeof navigator === "object" ? navigator.userAgent : ctx.req.headers["user-agent"]) || "").toLowerCase().includes("chrome");
        const user = typeof localStorage === "object" && localStorage ? JSON.parse(localStorage.getItem("user") || "{}") : (locals.user || { isVisitor: true });
        const { userId, token, userUrl, isVisitor = true } = user;
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ...ctx, user: { userId, token, isVisitor, userUrl }, locals });
        }
        return { pageProps, isChrome, asPath: ctx.asPath, eid, user };
    }
    public componentDidMount() {
        this.pageInit();
        if (localStorage) localStorage.setItem("user", JSON.stringify(this.store.user));
        Router.events.on("routeChangeStart", (url) => {
            // console.log("routeChangeStart", url);
            if (!url.includes("/login") && sessionStorage) sessionStorage.setItem("lastUrl", url);
            if (url === this.props.router.route) return;
            if (this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.setState({ loading: true });
                if (this.timer) clearTimeout(this.timer);
            }, 50);
        });
        Router.events.on("routeChangeComplete", () => {
            this.setState({ loading: false });
            if (this.timer) clearTimeout(this.timer);
        });
        Router.events.on("routeChangeError", () => {
            this.setState({ loading: false });
            if (this.timer) clearTimeout(this.timer);
        });
    }
    public componentWillUnmount() {
        if (this.timer) clearTimeout(this.timer);
    }

    public componentDidUpdate() {
        this.pageInit();
    }
    public componentDidCatch(err, info) {
        if (this.props.eid === "200003") {
            alert(err.toString());
            alert(JSON.stringify(info));
        }
    }
    /**
     * @desc 初始化页面，上报ga埋点，将页面props 赋值到 window上
     */
    private pageInit() {
        const win = window as any;
        win.data = { ...this.props.pageProps, ...this.props.user, eid: this.props.eid };
    }

    public render() {
        const { Component } = this.props;
        return (
            <Container>
                <Head>
                    <title>好看</title>
                    <meta name="keywords" content="美图,生活,社交,自然,城市,娱乐,美食,艺术,人物,时尚,动物,植物,家具,体育,交通,军事,动漫" />
                    <meta name="description" content="好看，记录精彩生活" />
                </Head>

                {this.props.eid === "200002" ? <Page key={this.props.router.route}>
                    <Component {...this.props.pageProps} {...this.props.user} eid={this.props.eid} />
                </Page> :
                    <Provider store={this.store}>
                        <Consumer>
                            {
                                ({ user, eid, setUser, loginModalVisible, hideLoginModal }) => this.state.loading ? <Loader /> :
                                    <Page key={this.props.router.route}>
                                        <Component {...this.props.pageProps} {...user} eid={eid} />
                                        {loginModalVisible && <Login onHide={hideLoginModal} setUser={setUser} />}
                                    </Page>
                            }
                        </Consumer>
                    </Provider>}

                {["/index/Index", "/discovery", "/post", "/msg", "/uid", "/test"].includes(this.props.asPath) &&
                    <Nav userId={this.props.user.userId} token={this.props.user.token} url={this.props.asPath} />
                }
            </Container>
        );
    }
}


```





