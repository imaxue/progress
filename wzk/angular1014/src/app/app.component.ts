import { Component } from '@angular/core';

import './widget/script/base64.js';
declare var Base64: any;

import './widget/script/string';
import { session } from './widget/script/sessionStorage';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

 public str:string = "abc"
  ngOnInit() {
  	let base64 = new Base64();
	let password = base64.encode("123456"); //对密码加密,注意传值不能是数字
	console.log(password, 'password');

	let newstr = this.str.padLeft("w", 9);
	console.log(newstr);

	session.set('key', 'wulala')
  }
}
