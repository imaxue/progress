 ```
    // 去掉所有空格
    static TrimAll(str, is_global) {
        if (!str || str === "")
            return "";
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
    static $trim(value) {
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
    static $trimRight(value) {
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
    static $trimLeft(value) {
        if (typeof value !== "undefined") {
            return value.replace(/(^\s*)/g, "");
        }
        return "";
    }
```
