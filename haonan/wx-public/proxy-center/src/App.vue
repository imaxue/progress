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
