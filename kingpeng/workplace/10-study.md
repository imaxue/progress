## Typescript运用于react项目中的一些注意点：

### 一、typings.d.ts文件

#### 1、场景a：当项目中引入一些js文件，需要调用某个方法是，tslint会报错，这时你需要声明一下

#### 2、场景b：一些传入的pros或者state强类型，可以在这个文件中声明

Example：

```
// 接口
interface option {
  type?: number
}
// 声明变量
declare const _hmt: string[][]
// 声明方法
declare const getAds: (tagId: string, option, callBack: (result: any) => void) => void
// 接口window对象
interface Window {
  data: any
  firstUrl: string
}
// 声明命名空间
declare namespace h5 {
  interface IAdProps {
    ads: any[]                           // 本页面所有广告
    position: any                        // 广告位置
    isImgPlus?: boolean                  // 是否是百度联盟
    isFromList?: boolean                 // 是否来自列表
    eid?: string                         // eid
    isNj?: boolean                       // 是否是新页面
  }
}

用法：AdBox.tsx文件

export default class AdBox extends Component<h5.IAdProps> {}


```

### 二、react.d.ts文件（react的ts文件声明）

#### 场景a：react会转义一些标签的属性为“data-XXXX”，但是我们并不需要它这么转，有些js不识别

```
import { ScriptHTMLAttributes } from 'react'
import { Component } from "react";

declare module 'react' {
    interface ScriptHTMLAttributes<T> {
        name?: boolean | string
    }

    export interface Component {
        render(): any
    }

    export function createRef(): any
}

用法：比如script的name属性，react本来不支持，但是有了这个文件，在其中声明之后，便可以生效了，这个文件中的声明尤其对一些dom的操作，声明属性方便！

<script type="text/javascript" id="fd78b1ed2c1a437fabb11882f3aa79f6" name="vivo-ad" ></script>


```



