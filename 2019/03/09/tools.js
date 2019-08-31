
// 去掉中英文空格加制表符换行符
function trim (str) {
  return str.replace(/[\s\n\t]+$/g, "").replace(/[ ]/g, "")
}

 /**
  * 小数加、减、乘、除 保留精度计算
  * @param {Number} value
  * @param {Number} decimals
  * for example
  * precisionRound(0.1 + 0.2, 2) 返回结果0.3
  */
  function precisionRound(value, decimals) {
    return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
  }

// 用字符串方法求和
function sumStrings(a,b){
  if(a == 0 && b == 0){
    return 0
  }
    var res='', c=0;
    a = a.split('');
    b = b.split('');
    while (a.length || b.length || c){
        c += ~~a.pop() + ~~b.pop();
        res = c % 10 + res;
        c = c>9;
    }
    return res.replace(/^0+/,'');
}

// 求和
var num = [1,2,3,4,5];
var res = num.reduce(function(total,num){
    return total+num;
    //return total + Math.round(num);//对数组元素四舍五入并计算总和
},0);
console.log(res)；//15
// 合并二维数组
var red = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
 return a.concat(b);
}, []);
console.log(red)
VM291:4 (6) [0, 1, 2, 3, 4, 5]
    

// 判断是否有key
function hasKey(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function isFunction(what) {
  return typeof what === "function";
}

function isUndefined(what) {
  return what === void 0;
}
