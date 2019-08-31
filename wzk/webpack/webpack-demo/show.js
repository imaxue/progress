var show = (content) => {
    document.getElementById("app").innerText = "Hello，" + content
}
//通过CommonJS规范导出函数
module.exports = show;