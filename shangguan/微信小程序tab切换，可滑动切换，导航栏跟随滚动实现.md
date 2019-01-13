###### 实现思路：tab导航栏使用<scroll-view>标签，内容使用<swiper>

代码如下：
###### wxml

```
<view class="cashRecord {{isSubmitSucc?'cashRecord_fixed':''}}">
    <view class="title_posi {{isSubmitSucc?'title_fixed':''}}">
      <scroll-view scroll-x="{{true}}" scroll-with-animation="{{true}}" scroll-left="{{navScrollLeft}}" class='title_box'>
        <block wx:for="{{tabList}}" wx:for-index="index" wx:for-item="item" wx:key="index">
          <view class="title_item" data-index="{{index}}" bindtap="checkTab">
            <text class="title_item_con {{checkedIndex==index?'title_item_ac':''}}">{{item}}</text>
          </view>
        </block>
      </scroll-view>
    </view>
    <view class='record-wrap'>
      <swiper class="swiper-box" style="height:{{swiperHeight+'px'}}" current="{{checkedIndex}}" duration="300" bindchange="switchSwiper">
        <!-- 收入明细 -->
        <swiper-item class="tab-content" wx:for="{{swiperList}}">
            <view class='item flex-between flex-row-center' wx:for="{{cashRecord}}" wx:for-index="index" wx:key="index"
              wx:for-item="item">
              <image class='Img' src='https://imagepagead.admore.com.cn/admin/skj/shike2/cashicon.png'></image>
            </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
```
###### js

```
// 切换tab
  checkTab(e) {
    let datasetIndex = e.currentTarget.dataset.index;
    if(datasetIndex != this.data.checkedIndex){
      this.setData({
        cashRecord: [],
        checkedIndex: datasetIndex,
        pageNum: 1
      })
    }
  },
  // 切换swiper
  switchSwiper(e) {
    var cur = e.detail.current;
    var singleNavWidth = this.data.windowWidth / 2;
    this.setData({
      checkedIndex: cur,
      navScrollLeft: (cur - 2) * singleNavWidth,
      cashRecord: [],
      checkedIndex: cur,
      pageNum: 1
    });
    if(cur == 0){ //收入明细
      this.getIncomeRecord() 
    }else{ //提现明细
      this.getCashRecord() 
    }
  },
```

