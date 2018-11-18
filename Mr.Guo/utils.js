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
