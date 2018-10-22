
// 去掉中英文空格加制表符换行符
function trim (str) {
  return str.replace(/[\s\n\t]+$/g, "").replace(/[ ]/g, "")
}
