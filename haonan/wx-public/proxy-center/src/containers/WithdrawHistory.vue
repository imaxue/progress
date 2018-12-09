<template>
	<div>
		<ul class="history-items">
			<li class="history-item">
				<span>日期</span>
				<span>金额</span>
				<span>状态</span>
			</li>
			<li
			 v-for="(item, index) of historys"
			 :key="`key${index}`"
			 class="history-item"
			>
				<span>{{item.createTime}}</span>
				<span>{{item.amount}}</span>
				<span
			      :class="{
					done: item.status === 3,
					fail: item.status === 2
				  }"
				>{{item.status === 1 ? '审核中' : item.status === 2 ? '审核未通过' : '已到账（请至银行卡查收）'}}</span>
			</li>
		</ul>
		<loading :is-show-loading="isShowLoading" />
	</div>
</template>

<script>
export default {
	name: "WithdrawHistory",

	data() {
		return {
			historys: [],
			isShowLoading: false
		};
	},

	created() {
		this.$http
			.post("/api/agentCenter/getCashOutLog")
			// 解构response
			.then(({ data }) => {
				// 200表示请求成功并正确返回数据
				if (data.code === 200) {
					this.historys = data.result;
				} else {
					// 请求成功但数据错误抛出报错信息
					this.$toast(data.message);
				}
			})
			// 接口未通使用catch捕获，统一抛出错误
			.catch(e => {
				this.$toast("服务器开小差了!");
			});
	}
};
</script>

<style lang="scss" scoped>
.history-items {
	background-color: #fff;
}
.history-item {
	display: flex;
	padding: 5px 0;
	border-bottom: 1px solid #e5e5e5;
	&:not(:first-child) {
		font-size: 12px;
		color: #949494;
	}
	span {
		flex: 1;
		text-align: center;
		&:first-child {
			flex: 3;
		}
		&:last-child {
			flex: 3;
		}
		&.done {
			color: #56b589;
		}
		&.fail {
			color: red;
		}
	}
}
</style>
