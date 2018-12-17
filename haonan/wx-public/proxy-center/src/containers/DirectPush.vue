<<<<<<< HEAD
<template>
	<div class="weui-cells">
        <div class="weui-cell">
            <div class="weui-cell__hd "><img class="icon" src="/static/images/icon.jpeg"></div>
            <div class="weui-cell__bd">
                <p class="iconName">微信号码1</p>
                <p class="iconTime">注册时间：2018-03-02</p>
            </div>
            <div class="weui-cell__ft">               
                <p class="iconName">团队总人数</p>
                <p class="iconTime">10</p>
            </div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__hd"><img class="icon" src="/static/images/icon.jpeg"></div>
            <div class="weui-cell__bd">
               <p class="iconName">微信号码2</p>
               <p class="iconTime">注册时间：2018-03-02</p>
            </div>
            <div class="weui-cell__ft">               
                <p class="iconName">团队总人数</p>
                <p class="iconTime">10</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: "List"
};
</script>
<style scoped lang="scss">
.icon {
    width: 50px;
    height: 50px;
    margin-right: 20px;
}
.iconName {
    color :#484747;
    font-size: 14px;
}
.iconTime {
    color : #adaaaa;
    font-size: 12px;
}
=======
<template>
	<div class="weui-cells">
		<div class="weui-cell" v-for=" (item,index) of items" :key="`key${index}`"  @click ="copy(item)">
			<div class="weui-cell__hd ">
				<img class="icon" src="/static/images/icon.jpeg">
			</div>
			<div class="weui-cell__bd">
				<p class="iconName">{{item.name}}</p>
				<p class="iconTime">注册时间：{{item.flowTime}}</p>
			</div>
			<div class="weui-cell__ft">
				<p class="iconName">团队总人数</p>
				<p class="iconTime">{{item.teamNum}}</p>
			</div>
		</div>
		<loading :is-show-loading="isShowLoading" />
	</div>
</template>

<script>
export default {
	name: "List",
	data() {
		return {
			items:[],
			isShowLoading: false
		}
	},
	created() {
		this.isShowLoading = true;
		this.$http
			.get("/api/agentCenter/firstAgent")
			// 解构response
			.then(({ data }) => {
				this.isShowLoading = false;
				// 200表示请求成功并正确返回数据
				if (data.code === 200) {
					this.items = data.result;
				} else {
					// 请求成功但数据错误抛出报错信息
					this.$toast(data.message);
				}
			})
			// 接口未通使用catch捕获，统一抛出错误
			.catch(e => {
				this.isShowLoading = false;
				this.$toast("服务器开小差了!");
			});
	},
	methods: {
		copySuccess(e) {
			alert("微信号码复制成功");
		},
		copyFail(e) {
			alert("微信号码复制失败");
		},
		copy(item) {
			this.$copyText(item.name).then(this.copySuccess, this.copyFail);
		}
	}
};
</script>

<style scoped lang="scss">
.icon {
	width: 50px;
	height: 50px;
	margin-right: 20px;
}
.iconName {
	color: #484747;
	font-size: 14px;
}
.iconTime {
	color: #adaaaa;
	font-size: 12px;
}
>>>>>>> bf82cf837b3d74b050eda89122eee04de634d7fe
</style>