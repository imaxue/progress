import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';

//导出加载函数
export function HttpLoaderFactory(http:HttpClient){
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const translationOptions = {
  loader: {
    provide: TranslateLoader,
    useFactory: (HttpLoaderFactory),
    deps: [HttpClient]
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot(translationOptions)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
