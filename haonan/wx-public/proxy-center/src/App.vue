<template>
	<div id="app">
		<router-view />
		<loading :is-show-loading="isShowLoading" />
	</div>
</template>

<script>
export default {
	name: "App",

	data() {
		return {
			isShowLoading: false
		};
	},

	mounted() {
		// 公众号重定向到该项目，获取路由的code值
		const code = this.$route.query.code;
		if (code !== undefined || code !== null) {
			this.isShowLoading = true;
			this.$http
				.get(`/api/auth/access_token?code=${code}`)
				.then(({ data }) => {
					this.isShowLoading = false;
					return data;
				})
				.then(data => {
					if (data.code === 200) {
						this.$root.bus.$emit("GET_OPENID_DONE", data.result);
					} else {
						this.$toast(data.message);
						this.$root.bus.$emit("GET_OPENID_DONE", '');
					}
				})
				.catch(() => {
					this.isShowLoading = false;
					this.$toast("服务器开小差了!");
					this.$root.bus.$emit("GET_OPENID_DONE", '');
				});
		}
	}
};
</script>

<style lang="scss">
#app {
	overflow-y: auto;
	width: 100%;
	height: 100%;
	font-size: 14px;
	background-color: #f8f8f8;
}
</style>
