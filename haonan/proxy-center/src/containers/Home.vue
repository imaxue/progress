<template>
	<div class="home">
		<div class="top">
			<div class="titleBlue"></div>
			<div class="titleWhite">
				<img :src="userInfo.headImgUrl">
				<div class="name">{{userInfo.nickname}}</div>
				<div class="time">
					<span>注册时间：{{info.flowTime}}</span>
					<span> | </span>
					<span>编号：{{info.number}}</span>
				</div>
			</div>
		</div>
		<div class="center">
			<div class="center-content">
				<div class="weui-grids">
					<div class="weui-grid">
						<div class="weui-grid__icon">
							<img src="/static/images/price.png">
						</div>
						<p class="weui-grid__label">我的佣金</p>
						<p class="weui-grid__label red">{{info.commission}} 元</p>
					</div>
					<div
					 class="weui-grid"
					 @click="$router.push('/directPush')"
					>
						<div class="weui-grid__icon">
							<img src="/static/images/directPush.png">
						</div>
						<p class="weui-grid__label">我的直推</p>
						<p class="weui-grid__label">{{info.firstAgentNum}} 人</p>
					</div>
					<div
					 class="weui-grid"
					 @click="$router.push('/withdraw')"
					>
						<div class="weui-grid__icon">
							<img src="/static/images/cashDraw.png">
						</div>
						<p class="weui-grid__label">佣金提现</p>
						<p class="weui-grid__label">&nbsp;</p>
					</div>
					<div class="weui-grid">
						<div class="weui-grid__icon">
							<img src="/static/images/secondTeam.png">
						</div>
						<p class="weui-grid__label">二级人数</p>
						<p class="weui-grid__label">{{info.secondAgentNum}} 人</p>
					</div>
					<div class="weui-grid">
						<div class="weui-grid__icon">
							<img src="/static/images/totalMoney.png">
						</div>
						<p class="weui-grid__label">我的总业绩</p>
						<p class="weui-grid__label red">{{info.totalRecord}} 元</p>
					</div>
					<div class="weui-grid">
						<div class="weui-grid__icon">
							<img src="/static/images/teamSum.png">
						</div>
						<p class="weui-grid__label">团队总人数</p>
						<p class="weui-grid__label">{{info.teamNum}} 人</p>
					</div>

					<div class="weui-grid">
						<div class="weui-grid__icon">
							<img src="/static/images/jintie.png">
						</div>
						<p class="weui-grid__label">推广注册补贴</p>
						<p class="weui-grid__label red">{{info.popularRecord}} 元</p>
					</div>
					<div
					 class="weui-grid"
					 @click="helpLink"
					>
						<div class="weui-grid__icon">
							<img src="/static/images/helpWord.png">
						</div>
						<p class="weui-grid__label">帮助文档</p>
						<p class="weui-grid__label">&nbsp;</p>
					</div>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="weui-footer">
				<p class="weui-footer__text">Copyright &copy; 由觅码科技独家提供技术支持 2018 - {{nowYear}}</p>
			</div>
		</div>
		<loading :is-show-loading="isShowLoading" />
	</div>
</template>

<script>
export default {
	name: "Home",

	data() {
		return {
			openId: this.$cookies.get("openId"),
			nowYear: new Date().getFullYear(),
			info: {},
			isShowLoading: false,
			userInfo: {}
		};
	},

	methods: {
		helpLink() {
			window.location.href = "https://shimo.im/docs/L0NVSElVxi4lR3kY";
		},
		async getUserInfo() {
			try {
				// 第一次进来的时候只有code，如果本地有openid了，则说明已经授权过并且是第二次以上进入页面，用openid获取用户信息
				const { data } = await this.$http.get(
					`/server/api/auth/userInfo?code=${
						this.openId
							? ""
							: this.$cookies.get("authorizationCode")
					}`
				);
				if (data.code === 200) {
					this.userInfo = data.result;
					// 取到openid后缓存起来，用于以后请求用户信息
					if (!this.openId) {
						this.$cookies.set("openId", data.result.openId);
						this.$http.defaults.headers["open-id"] =
							data.result.openId;
					}
				} else {
					this.$toast(data.message);
				}
			} catch (e) {
				this.isShowLoading = false;
				this.$toast("服务器开小差了!");
			}
		},
		async getInfo() {
			try {
				const { data } = await this.$http.get(
					"/server/api/agentCenter/survery"
				);
				this.isShowLoading = false;
				if (data.code === 200) {
					this.info = data.result;
				} else {
					this.$toast(data.message);
				}
			} catch (e) {
				this.isShowLoading = false;
				this.$toast("服务器开小差了!");
			}
		}
	},

	async created() {
		this.isShowLoading = true;
		await this.getUserInfo();
		await this.getInfo();
	}
};
</script>

<style scoped lang="scss">
.weui-grid__label {
	color: #585252;
}
.home {
	width: 100%;
	height: 100%;
	min-height: 100%;
	overflow-y: scroll;
}
.red {
	color: red;
}
.center {
	padding: 10px;
}

.top {
	margin-bottom: 40px;
	.titleBlue {
		height: 80px;
		background-color: #000000;
	}
	.titleWhite {
		background-color: white;
		height: 120px;
		margin: -30px 2%;
		border-radius: 5px;
		box-shadow: 0 5px 20px -7px #000;
		.name {
			color: #d0ad5f;
			font-size: 14px;
			text-align: center;
			margin-top: -10px;
		}
		.time {
			color: #b9b3b3;
			font-size: 12px;
			text-align: center;
			margin-top: 10px;
		}
	}
	img {
		width: 60px;
		height: 60px;
		border-radius: 30px;
		position: relative;
		left: 50%;
		margin-left: -25px;
		top: -15px;
	}
}
.center-content {
	border-radius: 10px;
	background-color: #fff;
	.weui-grids {
		&:before {
			border: 0 none;
		}
		&:after {
			border: 0 none;
		}
	}
	.weui-grid {
		width: 50%;
		&:nth-child(even) {
			&:before {
				border: 0 none;
			}
		}
		&:nth-child(7),
		&:nth-child(8) {
			&:after {
				border: 0 none;
			}
		}
	}
	.weui-grid__icon {
		img {
			background-color: #d0ad5f;
			border-radius: 50%;
		}
	}
}
.bottom {
	margin: 20px 0;
}
</style>
