import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
	constructor(private translate: TranslateService) {
        //添加语言支持
        translate.addLangs(['zh-CN', 'en']);
        //设置默认语言，一般在无法匹配的时候使用
        translate.setDefaultLang('zh-CN');
        
        //获取当前浏览器环境的语言比如en、 zh
        let broswerLang = translate.getBrowserLang();
        translate.use(broswerLang.match(/en|zh-CN/) ? broswerLang : 'zh-CN');
    }
        
    changeLang(lang) {
        console.log(lang);
        this.translate.use(lang);
    }
    toggleLang() {
        console.log(this.translate.getBrowserLang());
        //获取语言风格，相当于更详细的语言类型，比如zh-CN、zh-TW、en-US
        console.log(this.translate.getBrowserCultureLang());
    }
}
