import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(
  	private http: Http
  	) { }

  public url:string = "xxx/xxx/xxx"
  ngOnInit() {
  	this.http.get(this.url).subscribe((res)=>{
  		//成功回调
  		console.log(11111);
  	}, (err)=>{
  		//失败回调
  		console.log(22222);
  	})
  }

}
