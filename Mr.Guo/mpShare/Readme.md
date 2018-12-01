## onShareAppMessage(Object)

监听用户点击页面内转发按钮（<button> 组件 open-type="share"）或右上角菜单“转发”按钮的行为，并自定义转发内容

**注意：只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮**

**Object 参数说明**

参数|类型|说明
:-|:--:|:-:
from|String|转发事件来源:button：页面内转发按钮；menu：右上角转发菜单
target|Object|如果 from 值是 button，则 target 是触发这次转发事件的 button，否则为 undefined
webViewUrl|String|页面中包含<web-view>组件时，返回当前<web-view>的url


此事件需要 return 一个 Object，用于自定义转发内容，返回内容如下：

**自定义转发内容**

字段|说明|默认值
:-|:--:|:-:
title|转发标题|当前小程序名称
path|转发路径|当前页面 path ，必须是以 / 开头的完整路径
imageUrl|使用默认截图


******

**顺便说下今天遇到的坑**

一个<scroll-view>横向滚动的问题，自我感觉良好但是就是不滚动，气死宝宝了，后来查了才发现有问题。

1.scroll-view 中的需要滑动的元素不可以用 float 浮动；

2.scroll-view 中的包裹需要滑动的元素的大盒子用 display:flex; 是没有作用的；

3.scroll-view 中的需要滑动的元素要用 dislay:inline-block; 进行元素的横向编排；

4.包裹 scroll-view 的大盒子有明确的宽和加上样式-->  overflow:hidden;white-space:nowrap;

### 示例

```html
    <scroll-view scroll-x="{{true}}" class="five-scroll">
		<view class="prop-item-detail" wx:for="{{item.list}}" wx:key="index" wx:for-item="recommend" data-toolName="{{recommend.name}}" data-toolId="{{recommend.tool_id}}" bindtap="chooseTool">
			<view class="is-choosed {{recommend.tool_id === toolId ? 'tool-choosed' : 'tool-no-choosed'}}"></view>
			<view class="prop-item-img-container">
				<image src="{{recommend.image}}" class="prop-item-img" />
			</view>
			<view class="prop-item-name">工具名称：{{recommend.name}}</view>
		</view>
    </scroll-view>
```


```css
    .five-items {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        margin-top: 30rpx;
    }
    .prop-item-detail {
        height: 258rpx;
        width: 208rpx;
        background: url(../../../images/prop-item.png) no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        margin-left: 25rpx;
        position: relative;
    }

```

这样他就乖乖的横向滑动了