
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

用字符串方法求和
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
    
    
