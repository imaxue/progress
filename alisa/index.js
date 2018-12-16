//index.js
// 引入SDK核心类
var QQMapWX = require('../../qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');

// 实例化API核心类
var demo = new QQMapWX({
  key: 'FQLBZ-474AU-DGTVG-2DOZU-STEE3-JQFL4' // 必填
});

Page({
  data: {
    city: "获取中",
    //轮播图
    swiperArr: [],
    //首页导航的数据
    navArr: [],
    // 拼团
    bookArr: [],
    // 广告数组
    adsArr: [],
    //猜你喜欢
    guessArr: [],

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //获取地理位置
  getLocation() {
    console.log(this)
    let page = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(res)
        // 2 把经纬度转成广州 北京。。 要通过腾讯地图来实现
        // 调用接口
        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (ret) {
            console.log(ret);
            if (ret.status == 0) {
              let city = ret.result.address_component.city;
              page.setData({
                city: city
              })
            }




          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        });
        page.getGuessArr(latitude, longitude)
      }

    })
  },
  //获取轮播图
  getSwiperArr() {
    let page = this;
    // 发送请求获取数据 
    wx.request({
      url: "http://api.meituan.com/index/swiper",
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          page.setData({
            swiperArr: res.data
          })
        }


      }
    })
  },
  //获取首页导航
  getNavArr() {
    let page = this;
    // 发送请求获取数据 
    wx.request({
      url: "http://api.meituan.com/index/entry",
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          page.setData({
            navArr: res.data
          })
        }
      }
    })
  },

  //获取拼团
  getBookArr() {
    let page = this;
    // 发送请求获取数据 
    wx.request({
      url: "http://api.meituan.com/index/pingtuan",
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          page.setData({
            bookArr: res.data
          })
        }


      }
    })
  },
  //获取广告数组
  getAdsArr() {
    let page = this;
    // 发送请求获取数据 
    wx.request({
      url: "http://api.meituan.com/index/ad",
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          page.setData({
            adsArr: res.data
          })
        }


      }
    })
  },
  //获取猜你喜欢
  getGuessArr(latitude, longitude) {
    let page = this;
    // 发送请求获取数据 
    wx.request({
      url: "http://api.meituan.com/index/like",
      success(res) {
        console.log(res)
        let disArr = res.data.map((v) => {
          return {
            latitude: v.distance.lat,
            longitude: v.distance.lng,
          }
        })
        demo.calculateDistance({
          "from": {
            latitude: latitude,
            longitude: longitude,
            },
          "to": disArr,
          
          success: function (ret) {
            console.log(res);
            if(ret.status==0){
              //将距离放到guessArr的数组里面
              let guessArr=res.data.map((v,i)=>{
                //console.log(v);
                 console.log(ret);
                v.dis=ret.result.elements[i].distance;
                return v;

              })
              page.setData({
                guessArr:guessArr
                
              })
              console.log(guessArr)
            }
          
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        })
        if (res.statusCode == 200) {
          page.setData({
            guessArr: res.data
          })
        }


      }
    })
  },


  onLoad: function () {
    this.getLocation();
    this.getSwiperArr();
    this.getNavArr();
    this.getBookArr();
    this.getAdsArr();

  },

})
