```
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
const open$ = new Subject();
const ws = webSocket({
  url: 'wss://echo.websocket.org',
  openObserver: open$
})
ws.subscribe(res => {
  console.log('message', res);
});

ws.next(`content`);
// 订阅打开事件
open$.subscribe(() => {});

// 多路订阅
const user$ = this.ws.multiplex(
    () => ({ type: 'subscribe', tag: 'user' }),
    () => ({ type: 'unsubscribe', tag: 'user' }),
    message => message.type === 'user'
);
user$.subscribe(message => console.log(message));

const todo$ = this.ws.multiplex(
    () => ({ type: 'subscribe', tag: 'todo' }),
    () => ({ type: 'unsubscribe', tag: 'todo' }),
    message => message.type === 'todo'
);
todo$.subscribe(message => console.log(message));
```

