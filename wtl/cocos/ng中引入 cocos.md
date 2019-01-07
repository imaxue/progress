1.下载 cocos2d-x(js) 安装包

2.在angular.json中引入，

> "scripts": [
>
> ​              "src/app/config/cocos.js"
>
> ​            ]

3.在需要的组件中进行编写

```typescript
 window.onload = function () {
    //   cc.game.onStart = function () {
    //     cc.view.adjustViewPort(true);
    //     cc.view.setDesignResolutionSize(1440, 936, cc.ResolutionPolicy.SHOW_ALL);
    //     cc.view.resizeWithBrowserSize(true);
    //     cc.LoaderScene.preload(g_resources, function () {
    //       // 第一个游戏资源
    //       const MyScene = cc.Scene.extend({
    //         onEnter: function () {
    //           this._super();
    //           const size = cc.winSize;
    //           console.log(size);
    //           // add BG
    //           this.bgSprite = new cc.Sprite(_this.res.table_png);
    //           this.bgSprite.attr({
    //             x: size.width / 2,
    //             y: size.height / 2,
    //           });
    //           this.addChild(this.bgSprite, 0);


    //           // add start menu
    //           const startItem = new cc.MenuItemImage(
    //             _this.res.b_bg_png,
    //             _this.res.b_bg_png,
    //             function () {
    //               cc.log("Menu is clicked!");
    //             }, this);
    //           startItem.attr({
    //             x: size.width,
    //             y: 20,
    //             anchorX: 1,
    //             anchorY: 0,
    //             // scale: 0.4
    //           });

    //           const menu = new cc.Menu(startItem);
    //           menu.x = 0;
    //           menu.y = 0;
    //           this.addChild(menu, 1);
    //         }
    //       });
    //       cc.director.runScene(new MyScene());
    //     }, this);
    //   };
    //   cc.game.run('gameCanvas');
    };
```

