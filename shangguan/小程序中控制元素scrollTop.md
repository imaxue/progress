#### 想要实现点击tab栏（京选好物列表）让页面列表部分置顶的效果，在实际开发过程中发现问题好多~
先贴出wxml部分代码：

```
<!--index.wxml-->
<view class="index" id="page">
  <!--顶部导航-->
  <view class="top">
    <view class="all" bindtap="showAllTabs">
      <image src="../../images/open.png"></image>
    </view>
    <view class="{{checkedIndex==index?'tab_item tab_item_active':'tab_item'}}" wx:for="{{tabList}}" wx:key="index"
     data-id="{{item.id}}" data-index="{{index}}" bindtap="checkTab">
      {{item.name}}
    </view>
  </view>
  <!-- banner轮播 -->
  <swiper class="swiper mb" indicator-dots="true"></swiper>
  <!-- 分类入口 -->
  <view class="classify mb"></view>
  <!-- 京选好物列表 -->
  <scroll-view class="list" id="list_posi"></scroll-view>
</view>
```
js代码：

```
  scrollFn() {
    let query = wx.createSelectorQuery()
    query.select('#list_posi').boundingClientRect((res) => {
        wx.pageScrollTo({
          scrollTop: res.top
        })
      }
    }).exec()
  },
```
上面代码中的res内容如下：
![image](https://github.com/pangxiaoxin/markdownPic/blob/master/wx.png?raw=true)

上述代码的问题是列表高度来回跳，因为res.top的值是动态的

为解决动态值的问题，换个思路：列表scrollTop = 用页面高度 - 列表高度，因为高度值是固定的

调整后的代码如下：

```
  scrollFn() {
    let query = wx.createSelectorQuery()
    let pageHeight = 0;
    let tabHeight = 0;
    query.select('#page').boundingClientRect((res) => {
      pageHeight = res.height;
    })
    query.select('#tab').boundingClientRect((res) => {
      tabHeight = res.height;
    })
    query.select('#list_posi').boundingClientRect((res) => {
        if(res.top != tabHeight){
            wx.pageScrollTo({
              scrollTop: pageHeight - res.height - tabHeight 
            })
          }
      }
    }).exec()
  },
```


