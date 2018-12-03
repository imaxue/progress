<<<<<<< HEAD
<template>
	<div>
		<ul class="history-items">
			<li class="history-item">
				<span>日期</span>
				<span>金额</span>
				<span>状态</span>
			</li>
			<li class="history-item">
				<span>2018-09-15</span>
				<span>100</span>
				<span>审核中(预计9月16号到账)</span>
			</li>
			<li class="history-item">
				<span>2018-09-15</span>
				<span>100</span>
				<span class="done">已到账(请至银行卡查收)</span>
			</li>
		</ul>
		<transition name="fade">
			<div v-show="isShowLoading">
				<div class="weui-mask_transparent"></div>
				<div class="weui-toast">
					<i class="weui-loading weui-icon_toast"></i>
					<p class="weui-toast__content">数据加载中</p>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: "WithdrawHistory",

	data() {
		return {
			isShowLoading: false
		};
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
			flex: 2;
		}
		&:last-child {
			flex: 3;
		}
		&.done {
			color: #56b589;
		}
	}
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
=======
<template>
	<div>
		<ul class="history-items">
			<li class="history-item">
				<span>日期</span>
				<span>金额</span>
				<span>状态</span>
			</li>
			<li class="history-item">
				<span>2018-09-15</span>
				<span>100</span>
				<span>审核中(预计9月16号到账)</span>
			</li>
			<li class="history-item">
				<span>2018-09-15</span>
				<span>100</span>
				<span class="done">已到账(请至银行卡查收)</span>
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
			isShowLoading: true
		};
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
			flex: 2;
		}
		&:last-child {
			flex: 3;
		}
		&.done {
			color: #56b589;
		}
	}
}
</style>
>>>>>>> bf82cf837b3d74b050eda89122eee04de634d7fe
