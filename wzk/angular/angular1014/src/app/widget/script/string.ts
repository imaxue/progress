interface String{
    padLeft(ch: String, len: number): string;
}
/// <summary>
/// 左侧字符填充
/// </summary>
/// <param name="ch">填充字符</param>
/// <param name="length">填充后字符串长度</param>
/// <returns>填充后字符串</returns>
String.prototype.padLeft = function(ch, length: number) {
    let str = this;
    for(let i=0;i< length - this.length; i++)
        str = ch + str;
    return str;
}

