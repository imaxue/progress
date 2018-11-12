### 写项目中会用到很多的工具函数去处理一些逻辑，所以我们尽量要封装在公共的文件中，以此总结：

** Utility.ts

```
// tslint:disable: variable-name

export default class Utility {
    public static __Instance;
    /**
     * 实例
     * @returns {*}
     */
    public static instance() {
        if (this.__Instance === null || typeof this.__Instance === "undefined") {
            this.__Instance = new this();
        }
        return this.__Instance;
    }

    /**
     * 是否是数组
     */
    public static isArray(obj) {
        if (!obj || !obj.length || obj.length === 0) {
            return false;
        }
        return Array.isArray(obj);
    }

    /**
     * 判断是否为空
     * true-为空;false-不为空
     * @returns {boolean}
     */
    public static isNull(obj) {
        return obj === null;
    }

    /**
     * 判断是否是微信打开的
     * @returns {boolean}
     */
    public static isWeiXin() {
        try {
            const ua = window.navigator.userAgent.toLowerCase();
            const isWeiXin = ua.match(/micromessenger/i)!.indexOf("micromessenger");
            // console.log(isWeiXin);
            return isWeiXin >= 0;
        } catch (ex) {
            return false;
        }
    }

    /**
     * 浏览器信息
     * @returns {Browser}
     */
    public static browserInfo() {
        const _Browser = {
            versions: () => {
                const uu = navigator.userAgent;
                const matchQQ = uu.match(/\sQQ/i);
                return {
                    trident: uu.indexOf("Trident") > -1,                                     // IE内核
                    presto: uu.indexOf("Presto") > -1,                                       // opera内核
                    webKit: uu.indexOf("AppleWebKit") > -1,                                 // 苹果、谷歌内核
                    gecko: uu.indexOf("Gecko") > -1 && uu.indexOf("KHTML") === -1,           // 火狐内核
                    mobile: !!uu.match(/AppleWebKit.*Mobile.*/),                            // 是否为移动终端
                    ios: !!uu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),                        // ios终端
                    android: uu.indexOf("Android") > -1 || uu.indexOf("Adr") > -1,           // android终端
                    iPhone: uu.indexOf("iPhone") > -1,                                       // 是否为iPhone或者QQHD浏览器
                    iPad: uu.indexOf("iPad") > -1,                                            // 是否iPad
                    webApp: uu.indexOf("Safari") === -1,                                    // 是否web应该程序，没有头部与底部
                    weixin: uu.indexOf("MicroMessenger") > -1,                             // 是否微信 （2015-01-22新增）
                    qq: matchQQ && matchQQ[0] === " qq",                                         // 是否QQ
                };
            },
            language: ((navigator as any).browserLanguage || navigator.language).toLowerCase(),
        };
        return _Browser;
    }

    public static $judgeIsMobile() {
        const browser = {
            versions: () => {
                const u = navigator.userAgent;
                const matchWeixin = u.match(/MicroMessenger/i);
                // const app = navigator.appversion;
                // 移动终端浏览器版本信息
                return {
                    trident: u.indexOf("Trident") > -1, // IE内核
                    presto: u.indexOf("presto") > -1, // opera内核
                    webKit: u.indexOf("AppleWebkit") > -1, // 苹果、谷歌内核
                    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") === -1, // 火狐内核
                    mobile: !!u.match(/AppleWebkit.*Mobile.*/) || !!u.match(/Applewebkit/), // 是否为移动终端
                    android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, // android终端或者UC浏览器
                    iPhone: u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1, // 是否为iPhone或者QqHD浏览器
                    iEad: u.indexOf("iEad") > -1, // 是否iPad
                    webApp: u.indexOf("safari") === -1, // 是否web应该程序，没有头部与底部
                    google: u.indexOf("Chrome") > -1,
                    weixin: matchWeixin && matchWeixin[0] === "MicroMessenger",
                };
            },
            language: ((navigator as any).browserlanguage || navigator.language).toLocaleLowerCase(),
        };
        // console.log('language' + browser.language);
        // console.log('是否为移动端' + browser.versions().mobile);
        return browser.versions().mobile;
    }

    /**
     * 是否IOS系统
     */
    public static $isIOS() {
        try {
            const u = navigator.userAgent;
            const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            return isIOS;
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }

    /**
     * 设置内容,这里主要是用来存放临时数据的。
     * @method _SetContent
     * @param key  键值，用于下次的时候获取内容用的。其实就是 _TempSaveContent的属性名称。
     * @param content 要存储的内容
     * @param isSaveLocalStorage 是否保存到本地存储里面
     * @private
     */
    public static setContent(key, content, isSaveLocalStorage) {
        try {
            const self = this.instance();
            if (isSaveLocalStorage) {
                let __Content = content;
                __Content = JSON.stringify(__Content);
                // __content = CryptoJS.AES.encrypt(__Content, __key);

                if (typeof window !== "undefined") {
                    window.localStorage.setItem(key, __Content);
                }
            }
            self._TempSaveContent[key] = content;
        } catch (ex) {
            console.log(ex);
        }
    }

    /**
     * 删除指定字段值。
     * @method __RemoveContent
     * @param key
     * @return {null}
     * @private
     */
    public static removeContent(key, IsRemoveLocalStorage) {
        try {
            const __self = this.instance();
            if (key === null || typeof key === "undefined") {
                return;
            }
            if (__self._TempSaveContent[key]) {
                delete __self._TempSaveContent[key];
            }

            if (IsRemoveLocalStorage && typeof window !== "undefined") {
                window.localStorage.removeItem(key);
            }
        } catch (ex) {
            console.log(ex);
        }
    }

    /**
     * 获取内容，
     * @method _GetContent
     * @param key 健名称。其实就是 _TempSaveContent的属性名称。
     * @return {*} 返回内容
     * @private
     */
    public static getContent(key, IsUser) {
        try {
            let __Content = null;
            const __self = this.instance();
            if (__self._TempSaveContent[key]) {
                __Content = __self._TempSaveContent[key];
                return __Content;
            }
            if (typeof window === "undefined") {
                return null;
            }
            if (__Content === null || typeof __Content === "undefined") {
                const _value = window.localStorage.getItem(key);
                if (_value !== null && _value !== "" && typeof _value !== "undefined") {
                    const __JSONValue = JSON.parse(_value);
                    __self._TempSaveContent[key] = __JSONValue;
                    if (IsUser) {
                        //
                    }
                    __Content = __self._TempSaveContent[key];
                }
            }

            return __Content;
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }

    /**
     * 判断是否是函数
     * @param func 判断函数对象
     * @returns {boolean} true:成功，false:失败。
     */
    public static $isFunction(func) {
        if (func !== null && typeof func !== "undefined" && func.constructor.name === "Function") {
            return true;
        }
        return false;
    }

    /**
     * 判断是否未定义
     * @param obj 判断对象
     * @returns {boolean} true:成功，false:失败。
     */
    public static isUndefined(obj) {
        if (typeof obj === "undefined") {
            return true;
        }
        return false;
    }

    /**
     * 判断是否定义。
     * @param obj 判断对象
     * @return {boolean} true:成功，false:失败。
     */
    public static isDefined(obj) {
        if (typeof obj !== "undefined") {
            return true;
        }
        return false;
    }

    // 去掉所有空格
    public static TrimAll(str, is_global) {
        if (!str || str === "") return "";
        let result = "";
        if (str !== "") {
            result = str.replace(/(^\s+)|(\s+$)/g, "");
        }
        if (is_global.toLowerCase() === "g") {
            result = result.replace(/\s/g, "");
        }
        return result;
    }

    /**
     * 去空格
     * @param value
     * @returns {*}
     */
    public static $trim(value) {
        if (typeof value !== "undefined") {
            return value.replace(/(^\s*)|(\s*$)/g, "");
        }
        return "";
    }

    /**
     * 去右边空格
     * @param value
     * @returns {*}
     */
    public static $trimRight(value) {
        if (typeof value !== "undefined") {
            return value.replace(/(\s*$)/g, "");
        }
        return "";
    }

    /**
     * 去左边空格
     * @param s
     * @returns {*}
     */
    public static $trimLeft(value) {
        if (typeof value !== "undefined") {
            return value.replace(/(^\s*)/g, "");
        }
        return "";
    }

    /**
     * @param value
     * @returns {*}
     */
    public static $isNumber(value) {
        if (typeof value === "undefined" || value === null || value === "") {
            return false;
        }
        return /^\+?[0-9]\d*$/.test(value);
    }

    /**
     * 判断当前时间是否是今天
     * @param {any} date isToday(new Date(1510047326271));
     */
    public static isToday(date) {
        const today = new Date();
        // 获取从今天0点开始到现在的时间
        const todayTime = today.getTime() % (1000 * 60 * 60 * 24);
        // 获取要判断的日期和现在时间的偏差
        const offset = date.getTime() - today.getTime();
        // 获取要判断日期距离今天0点有多久
        const dateTime = offset + todayTime;
        if (dateTime < 0 || dateTime > 1000 * 60 * 60 * 24) {
            return false;
        }
        return true;
    }

    /**
     * 打开浏览器
     * @param {any} url
     */
    public static $openWebbrowse(url) {
        document.title = "OpenWebbrowse:" + new Date().getMilliseconds() + ":{" + url + "}";
    }
    public _TempSaveContent = {};
    public __ConstPrefix = "PC_LHJL";

    /**
     * dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
     * @param {*} dateTimeStamp
     * @memberof Utility
     */
    public static timeago(dateTimeStamp) {
        const minute = 1000 * 60;      // 把分，时，天，周，半个月，一个月用毫秒表示
        const hour = minute * 60;
        const day = hour * 24;
        const week = day * 7;
        const halfamonth = day * 15;
        const month = day * 30;
        const now = new Date().getTime();   // 获取当前时间毫秒
        // console.log(now);
        let result = "";
        const diffValue = now - dateTimeStamp; // 时间差

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
        } else if (dayC >= 1 && dayC <= 6) {
            result = " " + parseInt((dayC + ""), 10) + "天前";
        } else if (hourC >= 1 && hourC <= 23) {
            result = " " + parseInt((hourC + ""), 10) + "小时前";
        } else if (minC >= 1 && minC <= 59) {
            result = " " + parseInt((minC + ""), 10) + "分钟前";
        } else if (diffValue >= 0 && diffValue <= minute) {
            result = "刚刚";
        } else {
            const datetime = new Date();
            datetime.setTime(dateTimeStamp);
            const Nyear = datetime.getFullYear();
            const Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
            const Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            const Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
            const Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
            const Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
            result = Nyear + "-" + Nmonth + "-" + Ndate;
        }
        return result;
    }
}


```
