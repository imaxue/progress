#### http和httpclient的基本使用
- 1、在根模块或核心模块引入HttpModule
    ```
    import { HttpModule } from '@angular/http';
    @NgModule({
      import: [ HttpModule ]
      // ...
    })
    AppModule {}
    ```
- 2、在使用的地方注入Http服务
    ```
    import { Http } from '@angular/http';
    
    constructor(
      private http: Http
    ) {}
    
    ngOnInit() {
      this.http.get(`url`).subscribe((res) => {
        // 成功回调
      }, (err) => {
        // 失败回调
      });
    }
    ```
- 3、使用可选参数
    - 若想在请求中添加特定的头部或者身体，就需要配置请求的可选参数：
    ```
    import { Http, Header } from '@angular/http';
    // ...
    this.http.delete(`url`, {headers: new Header(), body: { } }).subscribe(...);
    ```
#### 带参数的get请求

```
import {HttpParams} from "@angular/common/http";

const params = new HttpParams()
    .set('orderBy', '"$key"')
    .set('limitToFirst', "1");

    this.httpClient.get(`url`, {params}).subscribe((res) => {
      // 成功回调
    }, (err) => {
      // 失败回调
    });  
```
#### 带参数+带请求头的get请求

```
  	const params = new HttpParams()
    .set('orderBy', 'aaa')
    .set('limitToFirst', "1");

    const headers = new HttpHeaders().set("X-CustomHeader", "wulalalal");

    this.httpClient.get(`url`, {headers: headers, params: params}).subscribe((res) => {
      // 成功回调
    }, (err) => {
      // 失败回调
    }); 
```
#### post请求

```
this.httpClient.post("url", { "key1": "aaa", "key1": "aaa" }).subscribe((res) => {
  // 成功回调
}, (err) => {
  // 失败回调
});
```
#### 带请求头的post请求

```
	const headers = new HttpHeaders().set("X-CustomHeader", "qwqwqwqwqqww");
    //this.httpClient.post("url", { "key1": "aaa", "key1": "aaa" }, {headers: headers})
    this.httpClient.post("url", { "key1": "aaa", "key1": "aaa" }, {headers})
    .subscribe((res) => {
      // 成功回调
    }, (err) => {
      // 失败回调
    });
```

