<template>
	<div class="home">
		<div class="top">
			<div class="titleBlue"></div>
			<div class="titleWhite">
				<img src="/static/images/icon.jpeg">
				<div class="name">姓名</div>
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
					<div class="weui-grid" @click="$router.push('/directPush')">
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
						<p class="weui-grid__label"> &nbsp;</p>
					</div>
					<div class="weui-grid">
						<div class="weui-grid__icon">
							<img src="/static/images/secondTeam.png">
						</div>
						<p class="weui-grid__label">二级团队</p>
						<p class="weui-grid__label">Grid</p>
					</div>
					<div class="weui-grid">
						<div class="weui-grid__icon">
							<img src="/static/images/totalMoney.png">
						</div>
						<p class="weui-grid__label">我的总业绩</p>
						<p class="weui-grid__label red" >{{info.totalRecord}} 元</p>
					</div>
					<div class="weui-grid">
						<div class="weui-grid__icon">
							<img src="/static/images/teamSum.png">
						</div>
						<p class="weui-grid__label">团队总数</p>
						<p class="weui-grid__label">{{info.teamNum}} 人</p>
					</div>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="weui-footer">
				<p class="weui-footer__text">Copyright &copy; 由觅码科技独家提供技术支持 - 2018</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Home",
	data() {
		return {
			info:{}
		}
	},
	created() {
		this.$http
			.get("/api/agentCenter/survery")
			// 解构response
			.then(({ data }) => {
				// 200表示请求成功并正确返回数据
				if (data.code === 200) {
					this.info = data.result;
				} else {
					// 请求成功但数据错误抛出报错信息
					this.$toast(data.message);
				}
			})
			// 接口未通使用catch捕获，统一抛出错误
			.catch(e => {
				console.log(3);
				this.$toast("服务器开小差了!");
			});
	}
};
</script>

<style scoped lang="scss">
.weui-grid__label{
	color: #585252;
}
.home {
	width: 100%;
	height: 100%;
	min-height: 100%;
	overflow-y: scroll;
}
.red {
	color:red
}
.center {
	padding: 10px;
}

.top {
	margin-bottom: 40px;
	.titleBlue {
		height: 80px;
		background-color: #468cfe;
	}
	.titleWhite {
		background-color: white;
		height: 120px;
		margin: -30px 2%;
		border-radius: 5px;
		box-shadow: 0 5px 20px -7px #7babf7;
		.name {
			color: #10aeff;
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
		&:nth-child(5),
		&:nth-child(6) {
			&:after {
				border: 0 none;
			}
		}
	}
	.weui-grid__icon {
		img {
			background-color: #468cfe;
		}
	}
}
</style>
