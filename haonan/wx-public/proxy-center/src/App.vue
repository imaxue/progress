<<<<<<< HEAD
<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App"
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
=======
<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App",

	mounted() {
		// 公众号重定向到该项目，获取路由的code值
		const code = this.$route.query.code;
		if (code !== undefined || code !== null) {
			this.$http
				.get(`/api/auth/access_token?code=${code}`)
				.then(({ data }) => {})
				.catch(e => {
					this.$toast("服务器开小差了!");
				});
		}
		this.$root.globalData.userName = '大铁棍子医院丶捅主任'
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
>>>>>>> 6f564fecf6241d7c590d23602ca5df2354d7a6bf
