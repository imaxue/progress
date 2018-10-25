
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
  },
