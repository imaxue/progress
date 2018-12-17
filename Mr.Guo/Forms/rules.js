const RULES_CONFIG = {
  required: {
    required: true,
    message: '[label]不能为空',
  },
// 非特殊字符
  plainText: {
    pattern: /^[^\\\/"'“”’‘\[\]{}]*$/,
    message: '请不要输入斜杠、引号、括号等特殊字符',
  },
// 名称：统一50字，如：菜品名称、分类名称、店铺名称、集团名称、组织名称等
  stringLength: {
    min: 0,
    max: 50,
    message: '[label]长度必须在[min]到[max]个字符之间',
  },
// 编码：编码统一20个字符，数字、英文输入
  code: {
    pattern: /^[0-9a-zA-Z]{0,20}$/,
    message: '[label]必须为英文或数字，20个字符以内',
  },
// 备注：备注、说明200个字
  description: {
    max: 200,
    message: '[label]必须在200个字符以内',
  },
// 价格：价格相关8位整数2位小数，数字输入
  price: {
    pattern: /^(([1-9]\d{0,7})|0)(\.\d{0,2})?$/,
    message: '[label]最大支持8位整数，2位小数',
  },
// 手机号码
  phone: {
    pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|19[9]|14[57])[0-9]{8}$/,
    message: '请输入正确的手机号码',
  },
// 邮箱地址
  email: {
    pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    message: '请输入正确的邮箱地址',
  },
// 身份证号码
  idcard: {
    // eslint-disable-next-line max-len
    pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
    message: '请输入正确的身份证号码',
  },
  numbers: {
    pattern: /^\d+$/,
    message: '请输入数字',
  },
  numLetters: {
    pattern: /^[0-9a-zA-Z]+$/,
    message: '只能输入数字和字母',
  },
};

function parseQueryString(query) {
  const match = query.match(/^([^?]*)(\?(.*))?$/);
  if (!match) return {};
  if (!match[3]) return { name: match[1], params: {} };
  const params = {};
  match[3].replace(
    new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
    ($0, $1, $2, $3) => {
      const num = Number($3);
      params[$1] = isNaN(num) ? $3 : num;
    },
  );
  return {
    name: match[1],
    params,
  };
}

function parseMessage(tpl, ctx) {
  return tpl.replace(
    /(\[([^\[\]]+)\])/g,
    ($0, $1, $2) => ctx[$2],
  );
}

export function parseRule(rule, itemCfg) {
  const { name, params } = parseQueryString(rule);
  const ruleCfg = RULES_CONFIG[name];
  if (!ruleCfg) return null;
  return {
    ...ruleCfg,
    ...params,
    message: parseMessage(ruleCfg.message, { ...itemCfg, ...ruleCfg, ...params }),
  };
}
