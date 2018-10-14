import WebVideoCtrl from "./webVideoCtrl.js"

// console.log('this===video.js', this)
// console.log('WebVideoCtrl', WebVideoCtrl)
// console.log('WebVideoCtrl.I_InitPlugin', WebVideoCtrl.I_InitPlugin)

(function (win) {
	function videofun() {
		this.clickStartRealPlay = function (szIP) {
				var iRet = WebVideoCtrl.WebVideoCtrl.I_StartRealPlay(szIP, {
					iStreamType: 1, // 主码流
					iChannelID: 1,
					bZeroChannel: false
				});

				if(0 == iRet) {
					szInfo = "开始预览成功！";
				} else {
					szInfo = "开始预览失败！";
				}

				// console.log(szIP + " " + szInfo);
		},
		this.showVideo = function (szIP, szUsername, szPassword) {
				//var szIP = "10.192.19.124";
				var szPort = "80";
				//var szUsername = "admin";
				//var szPassword = "sany3188"; width="600" height="380"

				WebVideoCtrl.WebVideoCtrl.I_InitPlugin(900, 500, {
					iWndowType: 2,
					cbSelWnd: function(xmlDoc) {
						g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
						var szInfo = "当前选择的窗口编号：" + g_iWndIndex;
						console.log(szInfo);
					}
				});

				WebVideoCtrl.WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");

				WebVideoCtrl.WebVideoCtrl.I_ChangeWndNum(1);

				var iRet = WebVideoCtrl.WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
					success: function(xmlDoc) {
						console.log(szIP + " 登录成功！");

						clickStartRealPlay(szIP);
					},
					error: function() {
						console.log(szIP + " 登录失败！");
					}
				});		
		}
	}

	window.videofun = videofun;

}())