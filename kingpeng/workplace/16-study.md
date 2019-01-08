## 个人头像编辑裁剪包的使用：react-cropper

1、防止页面滚动：

```

import { PureComponent } from "react";
import { createGlobalStyle } from "styled-components";

const StopBodyScrollStyle = createGlobalStyle`
    html, body {
        overflow: hidden;
    }
`;

class StopBodyScroll extends PureComponent {
    private preventDefault = (e: Event) => e.preventDefault();
    public componentDidMount() {
        document.addEventListener("touchmove", this.preventDefault);
        document.addEventListener("wheel", this.preventDefault);
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

2、Cropper.tsx封装

```

import getConfig from "next/config";
import Head from "next/head";
import { PureComponent } from "react";
import Cropper from "react-cropper";
import styled from "styled-components";
import StopBodyScroll from "../../components/StopBodyScroll";
const { publicRuntimeConfig } = getConfig();

const Root = styled.div`
    width: 100%;
    position: fixed;
    bottom: 0; top:0; left: 0; right:0;
    z-index: 1100;
    display: flex;
    // align-items: flex-end;
    overflow: hidden;
    background-color: rgba(0,0,0,0.9);
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Container = styled.div`
    height: 80vh;
    flex: 1;
`;
const BtnContainer = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    justify-content: center;
    padding: .4rem 0;
`;

const Button = styled.button < { IsCancel?: boolean } > `
    background: ${props => props.IsCancel ? "#F5F5F5" : "#fe2346"};;
    border-radius: .12rem;
    width: 2.8rem;
    height: .8rem;
    color: ${props => props.IsCancel ? "#000" : "#fff"};;
    font-size: .3rem;
    border: 0 none;
    padding: 0;
    margin: 0 5px;
    outline: none;
`;

export default class Index extends PureComponent<{ url: string, onCancel: () => void; onSubmit: (i) => void; }> {
    public cropperRef: any;
    public static defaultProps = {
        onCancel: new Function(),
        onSubmit: new Function(),
    };
    public state = {
        cropResult: "",
        aspectRatio: 1 / 1,

    };
    public componentDidMount() {
        if (this.props.url) {
            const img = new Image();
            img.src = this.props.url;
            const that = this;
            img.onload = () => {
                that.setState({ aspectRatio: img.height / img.width });
            };
        }
    }
    private cancel = () => {
        this.props.onCancel();
    }

    private submit = () => {
        if (typeof this.cropperRef.getCroppedCanvas() === "undefined") return;
        const cropResult: string = this.cropperRef.getCroppedCanvas().toDataURL(this.props.url.split(";")[0].replace("data:", ""));
        if (this.props.onSubmit) this.props.onSubmit(cropResult);
    }

    public render() {
        const { url } = this.props;
        return (
            <Root>
                <Head>
                    <link rel="stylesheet" href={publicRuntimeConfig.resUrl + "/css/cropper.css"} />
                </Head>
                <StopBodyScroll />
                <Container>
                    <Cropper
                        ref={cropperRef => this.cropperRef = cropperRef}
                        src={url}
                        style={{ height: "100%", width: "100vw" }}
                        aspectRatio={1 / 1}
                        guides={false}
                        scalable={true}
                        center={true}
                        background={true}
                        highlight={true}
                        autoCrop={true}
                        viewMode={2}
                        cropBoxMovable={true}
                        autoCropArea={.5}
                        dragMode="none"
                        movable={true}
                        rotatable={true}
                        zoomOnWheel={false}
                        zoomOnTouch={true}
                    />
                </Container>
                <BtnContainer>
                    <Button IsCancel onClick={this.cancel}>取消</Button>
                    <Button onClick={this.submit}>确定</Button>
                </BtnContainer>
            </Root>
        );
    }
}

```

3、使用例子：

```

import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import React, { PureComponent } from "react";
import Textarea from "react-textarea-autosize";
import styled, { createGlobalStyle } from "styled-components";
import getImgBase64, { dataURLtoBlob } from "../../lib/base64TransformFile";
import Cropper from "./components/Cropper";
import SelectItemContainer from "./components/SelectItem";

const HtmlStyle = createGlobalStyle`
    html {
        background-color: #ffffff;
    }
`;

const Root = styled.div`
    padding: 0;
    .save {
        border-radius: .04rem;
        width: 1.18rem;
        height: .5rem;
        color: #fff;
        font-size: .26rem;
        border: 0 none;
        padding: 0;
        outline: none;
        line-height: .52rem;
        opacity: 0.9;
        background-image: linear-gradient(-180deg, #F82B5A 3%, #FD4444 94%);
        box-shadow: 0 1px 2px 0 rgba(0,0,0,0.20);
    }
`;

const Portrait = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: .9rem 0;
    margin-top: .8rem;
    img {
        display: block;
        width: 1.32rem;
        height: 1.32rem;
        border-radius: 50%;
        margin-bottom: .2rem;
    }
    div {
        font-size: .24rem;
        color: #666666;
    }
`;
const SpaceItem = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #D8D8D8;
    padding: 0 .3rem;
    .key {
        width: 21%;
        padding: .35rem 0;
        text-align: left;
        font-size: .28rem;
        color: #666666;
    }
    .sex {
        font-size: .28rem;
        color: #333333;
    }
    .textArea {
        flex: 1;
        font-size: .28rem;
        color: #333333;
        height: 100%;
        min-height: .46rem;
        display: flex;
        outline-style: none;
        outline: none;
        border: none;
        font-family: PingFangSC-Regular;
        line-height: 1.5;
        padding: 0;
        margin: .3rem 0;
    }
`;
const sexName = ["未知", "男", "女"];
export default class Edit extends PureComponent<{ userId: number, token: string, authorInfo: api.IAuthor, sex: string, did: string }> {
    public inputRef: any;
    public static contextType = context;
    public context: ContextType;
    public state = {
        user: {} as api.IUser,
        userName: this.props.authorInfo.authorName,
        userUrl: this.props.authorInfo.authorUrl || "", // 用户头像
        userSign: this.props.authorInfo.authorSign || "",
        region: this.props.authorInfo.region || "",
        sex: this.props.sex,
        showSelectSex: false,
        showSelectHead: false,
        item: {} as any,
        originalImgUrl: "", //
        file: {} as object,
    };
    public static async getInitialProps({ user, locals, eid }) {
        const { userId, token, did } = user;
        const { isChrome } = locals;
        if (!userId && typeof location === "object") return Router.push("/login");
        const authorInfo = await request<api.IAuthor>("authorinfo", { userId, token: token || "", authorId: userId }, did) || {};
        const sex = getSex(authorInfo.sex);
        return { userId, token, authorInfo: { ...authorInfo, authorUrl: replaceImgSrc(authorInfo.authorUrl, eid, isChrome, 360) }, sex, did };
    }

    public saveInfo = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let authorUrl = this.props.authorInfo.authorUrl;
        if (this.props.authorInfo.authorUrl !== this.state.userUrl) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(dataURLtoBlob(this.state.userUrl));
            const contentType = this.state.userUrl.split(";")[0].replace("data:", "");
            await new Promise((resolve) => reader.onload = resolve);
            authorUrl = await axios.post("/api/upload/headImg", reader.result, { headers: { "Content-Type": contentType } }).then(res1 => res1.data + "@!fw180");
        }

        const { userName, userSign, region, sex } = this.state;
        const { userId, token } = this.props;
        let user = {} as api.IUser;
        const res = await request<any>("updateUser", { userId, token, authorName: userName, authorSign: userSign, authorUrl, region, sex: sexName.indexOf(sex) }, this.props.did);

        if (res && res.status === 0) {
            if (localStorage) {
                user = JSON.parse(localStorage.getItem("user") || "{}") as api.IUser;
            }
            user.userName = userName;
            user.userSign = userSign;
            user.userUrl = authorUrl;
            if (localStorage) localStorage.setItem("user", JSON.stringify(user));
            this.context.setUser({ userId: userId + "", token, userUrl: authorUrl, isVisitor: this.context.user.isVisitor, did: this.context.user.did });
            Router.back();
        }
    }

    public render() {
        const { userUrl, sex, showSelectSex, showSelectHead } = this.state;
        return (
            <Root>
                <HtmlStyle />
                <Head>
                    <title>资料编辑</title>
                    <meta name="keywords" content="美图,搜索,关注,推荐,兴趣,粉丝,赞,喜欢,评论,回复,资料编辑" />
                </Head>
                <HeaderBar title="资料编辑" >
                    <button className="save" onClick={this.saveInfo}>保存</button>
                </HeaderBar>

                <Portrait>
                    <img src={userUrl} onClick={() => this.setState({ showSelectHead: true })} alt="" />
                    <div>点击更换头像</div>
                </Portrait>
                {!!this.state.originalImgUrl && <Cropper
                    onCancel={() => this.setState({ originalImgUrl: "" })}
                    onSubmit={(base64Url) => { this.setState({ originalImgUrl: "", userUrl: base64Url }); }}
                    url={this.state.originalImgUrl} />}
            </Root>
        );
    }
}


```






