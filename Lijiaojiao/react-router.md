## 1.withrouter

withRouter可以包装任何自定义组件，将react-router 的 history,location,match 三个对象传入。 
无需一级级传递react-router 的属性，当需要用的router 属性的时候，将组件包一层withRouter，就可以拿到需要的路由信息

```
import {withRouter} from 'react-router-dom' ;
var  Test   = withRouter(({history,location,match})=>{ 
    return <div>{location.pathname}</div>
})
```
## 2.reduce

数组的reduce方法，接收一个函数（必须）和指定的初始值（非必须）作为参数，
函数有三个参数，分别为初始值，当前项，当前数组，进行累加或者累积操作，初始值为每次累加或者累计后的结果

```
 var result = [
        {
            subject: 'math',
            score: 88
        },
        {
            subject: 'chinese',
            score: 95
        },
        {
            subject: 'english',
            score: 80
        }
    ];
    var totalScore=result.reduce(function (pre,cur) {
        return pre+cur.score;
    },0);
    console.log(totalScore);

```
```
function add(){
        var sum=0;
        function inner(pre,cur){
            return pre+cur;
        }
        sum=Array.prototype.slice.call(arguments).reduce(inner,sum);
        return function(){
            if(arguments.length==0){
                return sum;
            }else{
                sum=Array.prototype.slice.call(arguments).reduce(inner,sum);
                return arguments.callee;
            }
        }

    }
    console.log(add()(1)(2,3)());//6

```
## 3.eval
eval() 的参数是一个字符串。如果字符串表示的是表达式，eval() 会对表达式进行求值。
如果参数表示一个或多个 JavaScript 语句， 那么 eval() 就会执行这些语句。
注意不要用 eval() 来执行一个算术表达式；因为 JavaScript 可以自动为算术表达式求值。

eval() 是一个危险的函数， 他执行的代码拥有着执行者的权利。
如果你用 eval() 运行的字符串代码被恶意方（不怀好意的人）操控修改，
您最终可能会在您的网页/扩展程序的权限下，在用户计算机上运行恶意代码。
