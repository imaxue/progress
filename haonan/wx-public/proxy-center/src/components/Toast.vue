<template>
	<transition
	 name="fade"
	 @after-leave="afterLeave"
	>
		<div v-show="isShowToast">
			<div class="weui-mask_transparent" />
			<div class="toast">{{msg}}</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: "Toast",

	data() {
		return {
			msg: "",
			closed: false,
			duration: 1500,
			isShowToast: false
		};
	},

	watch: {
		closed(newVal) {
			if (newVal) {
				this.isShowToast = false;
			}
		}
	},

	methods: {
		afterLeave() {
			this.destoryInstance();
		},
		destoryInstance() {
			this.$destroy(true);
			document.body.removeChild(this.$el);
		}
	},

	mounted() {
		setTimeout(() => {
			this.closed = true;
		}, this.duration);
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
.toast {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate3d(-50%, -50%, 0);
	max-width: 90%;
	padding: 5px 10px;
	border-radius: 5px;
	font-size: 14px;
	z-index: 5000;
	color: #fff;
	background-color: hsla(0, 0%, 7%, .7);
}
</style>
