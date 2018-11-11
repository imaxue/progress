```typescript
import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor() { }
  public close: any;
  public create(url: string, nodeid: string): Subject<MessageEvent> {
    const ws = new WebSocket(url);
    ws.onopen = function () {
      ws.send(nodeid);
    };
    // 如果想要断开websocket连接，调用websocket.service.ts的close函数即可。
    this.close = function () {
      ws.close();

    };
    const observable = Observable.create(
      (obs: Observer<MessageEvent>) => {

        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      });
    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}

```

#### 使用

```typescript
// 创建socket
this.wsSocket = this.wsService.create(url, '2');

// 发送 数据
this.wsSocket.next(2);

// 订阅数据
this.wsSocket.subscribe((res)=>{
    // 处理数据
},
(err)=>{
	// 发送错误处理    
},
()=>{
    // socket 关闭时 处理
})
```



