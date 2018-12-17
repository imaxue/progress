<<<<<<< HEAD
/**
 * 将对象参数转化为URL参数
 * @param  {object} params 参数对象
 * @return {string}        URL参数字符串
 */
export function genUrlParams(params = {}) {
  return Object.keys(params).map((key) => {
    const val = params[key];
    if (Object.prototype.toString.call(val).indexOf('String') !== -1) {
      return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
    }
    return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(val))}`;
  }).join('&');
}


/**
 * 将日期字符串分格为年/月/日
 * @param  {object} str 日期字符串
 * @param  {object} l
 * @return {object} sp 格式化后的数据分隔符
 */
export function formatDateStr(str = '', l = 8, sp = '/') {
  const ln = str.length;
  if (ln < 8) return '';
  let ret = [str.substr(0, 4), str.substr(4, 2), str.substr(6, 2)].join(sp);
  if (l == 12 && ln >= 12) { ret += ` ${str.substr(8, 2)}:${str.substr(10, 2)}`; } else if (l == 14) {
    if (ln >= 12) { ret += ` ${str.substr(8, 2)}:${str.substr(10, 2)}`; }
    if (ln >= 14) { ret += `:${str.substr(12, 2)}`; }
  }
  return ret;
}


/**
 * 获取字符串字节数
 * @param  {string} str 字符串
 */
export function getByteLength(string) {
  let b = 0,
    str = _.isString(string) ? string : String(string),
    l = str.length;
  if (l) {
    for (const s of str) {
      if (s.codePointAt(0) > 255) {
        b += 2;
      } else {
        b++;
      }
    }
    return b;
  }
  return 0;
}


/**
 * 通过文件链接下载文件
 * @param {string} url 文件链接地址
 * @param {string} filename 文件名
 */
export function downloadFile(url = '', filename = '') {
    const a = document.createElement('a');
    a.href = url;
    a.style = 'display:none';
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

/**
 * 解析字符串
 * @param {string} text 待解析的字符串
 */
export function decodeText(text) {
    if (!text || typeof text !== 'string') return '';
    return text.replace(/<br\/>/g, '\n');
}

/**
 * 格式化字符串
 * @param {string} text 待格式化的字符串
 */
export function encodeText(text) {
    if (!text || typeof text !== 'string') return '';
    return text.trim().replace(/[\n]/g, '<br/>');
}
=======
/**
 * 将对象参数转化为URL参数
 * @param  {object} params 参数对象
 * @return {string}        URL参数字符串
 */
export function genUrlParams(params = {}) {
  return Object.keys(params).map((key) => {
    const val = params[key];
    if (Object.prototype.toString.call(val).indexOf('String') !== -1) {
      return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
    }
    return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(val))}`;
  }).join('&');
}


/**
 * 将日期字符串分格为年/月/日
 * @param  {object} str 日期字符串
 * @param  {object} l
 * @return {object} sp 格式化后的数据分隔符
 */
export function formatDateStr(str = '', l = 8, sp = '/') {
  const ln = str.length;
  if (ln < 8) return '';
  let ret = [str.substr(0, 4), str.substr(4, 2), str.substr(6, 2)].join(sp);
  if (l == 12 && ln >= 12) { ret += ` ${str.substr(8, 2)}:${str.substr(10, 2)}`; } else if (l == 14) {
    if (ln >= 12) { ret += ` ${str.substr(8, 2)}:${str.substr(10, 2)}`; }
    if (ln >= 14) { ret += `:${str.substr(12, 2)}`; }
  }
  return ret;
}


/**
 * 获取字符串字节数
 * @param  {string} str 字符串
 */
export function getByteLength(string) {
  let b = 0,
    str = _.isString(string) ? string : String(string),
    l = str.length;
  if (l) {
    for (const s of str) {
      if (s.codePointAt(0) > 255) {
        b += 2;
      } else {
        b++;
      }
    }
    return b;
  }
  return 0;
}


/**
 * 通过文件链接下载文件
 * @param {string} url 文件链接地址
 * @param {string} filename 文件名
 */
export function downloadFile(url = '', filename = '') {
    const a = document.createElement('a');
    a.href = url;
    a.style = 'display:none';
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

/**
 * 解析字符串
 * @param {string} text 待解析的字符串
 */
export function decodeText(text) {
    if (!text || typeof text !== 'string') return '';
    return text.replace(/<br\/>/g, '\n');
}

/**
 * 格式化字符串
 * @param {string} text 待格式化的字符串
 */
export function encodeText(text) {
    if (!text || typeof text !== 'string') return '';
    return text.trim().replace(/[\n]/g, '<br/>');
}


/**
 * 判断当前对象是否为空
 * 
 * @method isEmpty
 * @param {Object}
 *            obj
 * @return {Boolean} empty 当为 null,undefined,"" 将返回true
 */
window.isEmpty = function(obj) {
 return (obj == null || typeof obj == "undefined" || obj.length == 0)
}

/**
 * 判断当前对象是否非空
 * 
 * @method isNotEmpty
 * @param {Object}
 *            obj
 * @return {Boolean}
 */
window.isNotEmpty = function(obj) {
 return !isEmpty(obj);
}

/**
 * 判断是否为函数
 * 
 * @method isFunc
 * @param {Object}
 *            fun
 * @return {Boolean}
 */
window.isFunc = function(fun) {
 return (fun != null && typeof fun == "function");
}

/**
 * 判断不是函数
 * 
 * @method isNotFunc
 * @param {Object}
 *            fun
 * @return {Boolean}
 */
window.isNotFunc = function(fun) {
 return !isFunc(fun);
}

/**
 * 判断 cur 是否为 type 类型
 * 
 * @method typeOf
 * @param {Object}
 *            cur
 * @param {String}
 *            type
 * @example typeOf("Hello","string");//将返回true
 * @return {Boolean}
 */
window.typeOf = function(cur, type) {
 if (typeof type != "string")
  return false;
 return typeof cur == type;
}

/**
 * 判断是否为数组
 * 
 * @method isArray
 * @param {Object}
 *            array
 * @return {Boolean}
 */
window.isArray = function(array) {
 return isNotEmpty(array) && className(array) == "Array"
}

/**
 * 判断不是数组
 * 
 * @method isNotArray
 * @param {Object}
 *            arr
 * @return {Boolean}
 */
window.isNotArray = function(arr) {
 return !isArray(arr);
}

/**
 * 判断两个对象是否为相同的类
 * 
 * @method isSameClass
 * @param {Object}
 *            cur
 * @param {Object}
 *            cur2
 * @return {Boolean}
 */
window.isSameClass = function(cur, cur2) {
 if (isNotEmpty(cur) && isNotEmpty(cur2)) {
  return className(cur) == className(cur2);
 }
 return false;
}

/**
 * 判断两个对象为不同类
 * 
 * @method isDifClass
 * @param {Object}
 *            cur
 * @param {Object}
 *            cur2
 * @return {Boolean}
 */
window.isDifClass = function(cur, cur2) {
 return !isSameClass(cur, cur2);
}

/**
 * 判断当前是否处在iframe中
 * 
 * @method isIframe
 * @return {Boolean}
 */
window.isIframe = function() {
 return top.location != self.location;
}

/**
 * 判断当前不处在iframe中
 * 
 * @method isIframe
 * @return {Boolean}
 */
window.isNotIframe = function() {
 return !isIframe();
};
>>>>>>> bf82cf837b3d74b050eda89122eee04de634d7fe
