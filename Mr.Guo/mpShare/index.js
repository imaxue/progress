'use strict';
var services = require('../../../utils/services');
Page({
	data: {
		toolsList: [],
		toolId: '',
		toolName: '',
		shareInfo: {},
	},
	onShow() {
		// onShow
		services.getIdolToolsList().then(res => {
			const toolsList = res.data.tool_list.rec.map(i => {
				return {
					...i,
					star: Number(i.star),
				};
			});
			this.setData({
				toolsList,
			});
		});
		services.getShareUrl().then(res => {
			this.setData({
				shareInfo: res.data,
			});
		});

	},
	chooseTool(e) {
		const toolId = e.currentTarget.dataset.toolid;
		const toolName = e.currentTarget.dataset.toolname;
		this.setData({
			toolId,
			toolName,
		});
    },
    // 重点就在这里了，我们的.wxml文件中必须有button按钮，并且他有一个属性叫做open-type,这个值必须是share，那么我们在js文件里写了onShareAppMessage方法就不用管了，他就会自己调用我们的分享方法
	onShareAppMessage: function(options) {
		let { from } = options;
		let { shareInfo } = this.data;
		var shareObj = {
			title: shareInfo.title || '标题内容', // 默认是小程序的名称(可以写slogan等)
			path: `${shareInfo.url}?uid=${shareInfo.uid}`, // 默认是当前页面，必须是以‘/’开头的完整路径，可以拼接各种参数，包含指定链接打开后进入到哪个页面以及其他参数，可展示其他内容
			imageUrl: shareInfo.img_url, // 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
			success: function(res) {
				// I'm success;
			},
			fail: function(res) {
				// 分享失败
			}
		};
		return shareObj;
	}
});
