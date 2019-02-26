
## 参考ins实现时间的转化

```

/**
 * dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
 * @param {*} dateTimeStamp: 时间戳
 * @memberof Utility
 * @result 参照ins的时间：当年只显示年月，非当年显示年月日；
 */
const shareTimeGo = (dateTimeStamp) => {
  const minute = 1000 * 60;      // 把分，时，天，周，半个月，一个月用毫秒表示
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const halfamonth = day * 15;
  const month = day * 30;
  const now = new Date().getTime();   // 获取当前时间毫秒
  let result = "";
  const diffValue = now - dateTimeStamp; // 时
  if (diffValue < 0) {
    return;
  }
  const minC = diffValue / minute;  // 计算时间差的分，时，天，周，月
  const hourC = diffValue / hour;
  const dayC = diffValue / day;
  const weekC = diffValue / week;
  const monthC = diffValue / month;
  if (monthC >= 1 && monthC <= 3) {
    result = " " + parseInt((monthC + ""), 10) + "月前";
  } else if (weekC >= 1 && weekC <= 3) {
    result = " " + parseInt((weekC + ""), 10) + "周前";
  } else if (dayC >= 1 && dayC <= 10) {
    result = " " + parseInt((dayC + ""), 10) + "天前";
  } else if (hourC >= 1 && hourC <= 23) {
    result = " " + parseInt((hourC + ""), 10) + "小时前";
  } else if (minC >= 1 && minC <= 59) {
    result = " " + parseInt((minC + ""), 10) + "分钟前";
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = "刚刚";
  } else {
    const datetime = new Date();
    const currentFullYear = datetime.getFullYear();
    datetime.setTime(dateTimeStamp);
    const Nyear = datetime.getFullYear();
    const Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    const Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    const Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    const Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    const Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    // result = Nyear + "-" + Nmonth + "-" + Ndate;
    result = (currentFullYear >= Nyear ? "" : Nyear + "-") + Nmonth + "-" + Ndate;
  }
  return result;
}

```

### example： 

```
console.log(shareTimeGo(1547563422000))
console.log(shareTimeGo(1551088019903))
console.log(shareTimeGo(1551089167870))
    
```
