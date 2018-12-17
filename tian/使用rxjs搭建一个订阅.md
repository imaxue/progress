```js
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class GlobalState {

  private _data = new Subject<Object>();
  private _dataStream$ = this._data.asObservable();

  private _subscriptions: Map<string, Array<any>> = new Map<string, Array<any>>();

  constructor() {
    this._dataStream$.subscribe((data) => this._onEvent(data));
  }
   //发数据改变的通知
  notifyDataChanged(event, value) {
    let current = this._data[event];
    if (current !== value) {
      this._data[event] = value;

      this._data.next({
        event: event,
        data: this._data[event]
      });
    }
  }
  //取消订阅
  unsubscribe(event: string, pageName: string){
    let _subscriptions = this._subscriptions,
      subscribers = _subscriptions.get(event) || [],
      index = -1;
    subscribers.forEach((item, _index) => {
      if(item.name == pageName){
        index = _index;
      }
    });
    subscribers.splice(index, 1);
    _subscriptions.set(event, subscribers);
  }
  //订阅
  subscribe(event: string, pageName: string, callback: Function) {
    let subscribers = this._subscriptions.get(event) || [];
    if(!pageName || typeof pageName != 'string') throw 'subscriber\'s name must be a string';
    subscribers.push({
      callback: callback,
      name: pageName
    });

    this._subscriptions.set(event, subscribers);
  }

  _onEvent(data: any) {
    let subscribers = this._subscriptions.get(data['event']) || [];

    // for(let index = subscribers.length - 1; index>=0; index--){
    //   console.log(subscribers[index]);
    //   let item = subscribers[index];
    //    item.callback.call(null, data['data'], item.name);
    // }
    subscribers.forEach((item) => {
      console.log('item:', item)
      item.callback.call(null, data['data'], item.name);
    });
  }
}

```
