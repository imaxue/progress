<template>
	<transition name="fade">
		<div v-show="isShowLoading">
			<div class="weui-mask_transparent" />
			<div class="weui-toast">
				<i class="weui-loading weui-icon_toast" />
				<p class="weui-toast__content">数据加载中</p>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: "Loading",

	props: {
		isShowLoading: {
			required: true,
			type: Boolean
		}
	}
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>

