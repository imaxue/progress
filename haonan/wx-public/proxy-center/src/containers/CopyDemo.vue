<template>
	<div class="weui-cell">
		<div class="weui-cell__bd">
			<p>{{tittle}}</p>
		</div>
		<div class="weui-cell__ft" @click="copy">复制文字</div>
	</div>
</template>

<script>
export default {
	name: "CopyDemo",

	data() {
		return {
			tittle: "标题文字"
		};
	},

	methods: {
		copySuccess(e) {
			console.log(e);
			alert("复制成功");
		},
		copyFail() {
			console.log(e);
			alert("复制失败");
		},
		copy() {
			this.$copyText(this.tittle).then(this.copySuccess, this.copyFail);
		}
	}
};
</script>
