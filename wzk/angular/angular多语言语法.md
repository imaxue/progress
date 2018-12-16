#### 1、冒号：的多语言的实现方案

```
//cn-ZH.json
  "common": {
    "colon": "：",
    
//html
{{'positionMgmt.fencelist.pleaseChooseFence'|translate}}{{'common.colon'|translate}}
```
#### 2、html中三元表达式中的多语言

```
  <nz-modal translate [nzTitle]="modalType==0?'positionMgmt.fencelist.subscribers':'positionMgmt.fencelist.contextDevice'">
```
#### 3、antdesign库中组件多语言的实现
- 也是在asset/i18/*.json中写对应中英文；
- 注意antdesign组件中中文结构即可；

#### 4、多语言语法

```
  // ts文件
  getFenceType(event) {
    // 0多边形围栏1路线围栏2画地为牢3地区围栏
    return event == 0 ? "positionMgmt.efence.polygonFence" : event == 1 ? "positionMgmt.efence.routeFence" : event == 2 ? "positionMgmt.efence.circleFence" : "positionMgmt.efence.areFence";
  }
  //html文件
  <td translate>{{getFenceType(data.elecType)}}</td>
```
#### 5、后端接口中多语言如何实现?

#### 6、原生html中标签中多语言的语法

```
<input type="text" placeholder="{{'login.codeplaceholdler'|translate}}">
```
#### 7、translate不同放置位置的不同效果

```
//translate作为属性 只在编译标签的时候翻译一次
<span translate>{{sendBtnTxt}}</span>
//translate作为管道符，变量sendBtnTxt每次更新都会翻译
<span>{{sendBtnTxt|translate}}</span>
```
#### 8、antdesign标签属性中有逻辑时的多语言语法

```
<nz-option  *ngFor="let mobileArea of mobileAreaList;" [nzLabel]="(mobileArea.name|translate) +' +'+mobileArea.val" [nzValue]="mobileArea">
```

#### 9、ts文件中this.translate.instant()问题
- 问题描述
  - 这种语法点击多语言切换时不能切换过来，只有刷新页面才可以；
  - 点击切换语言按钮，实质上走的是订阅；
- 解决方案
  - 在ts中订阅中执行ngOnInit函数
    ```
            this.state.subscribe(keys.languageChanged, this.pageName, (lang, page) => {
                Language.luangage = lang;
                this.translate.setDefaultLang(lang);
                this.initHcs();
            });  
    ```
#### 10、图片中文字的多语言的实现
- 场景一：浏览器默认语言即使英文的情况，图片中文字需显示英文；
```
public logoImgSrc = "../../../../../assets/images/common/login-logo.png";

<img src={{logoImgSrc}} alt="">
```

- 场景二：点击多语言按钮时，订阅切换语言；

#### 11、|translate报错
- 管道符|translate前边的变量必须是字符串，数值是会报错；

```
//正确写法
let num = 60;
this.captchaTxt = '(' + num + 's)';
//错误写法
this.captchaTxt = 60；
//html文件
<span>{{captchaTxt|translate}}</span>
```
