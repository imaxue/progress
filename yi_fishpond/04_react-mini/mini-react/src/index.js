import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


//1.字符串或是数字形式
// ReactDOM.render('红眼军军有荒古扫把', document.getElementById('root'));


function hello (){
    console.log("军军又炸团了")
}
ReactDOM.render(React.createElement('div',{name:'jj',onClick:hello},'click me'), document.getElementById('root'));
//此处上下两句等价
// ReactDOM.render((<div name='jj' onClick={hello}>click me</div>), document.getElementById('root'));


registerServiceWorker();
