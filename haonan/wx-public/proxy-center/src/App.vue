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
