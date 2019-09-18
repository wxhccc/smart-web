/**
 * 本系统中用于表单验证所需要的方法
 */
import { ChinaIdCardValid, checkoutBy } from '@wxhccc/es-util'
/** 表单通用验证规则 **/
export const regexMap = {
  /* 手机号正则 */
  telphone: /^1\d{10}$/,
  /* 身份证正则 */
  idCard: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,
  /* 字母加数字 */
  alphanumeric: /^[A-Za-z0-9]+$/,
  /* 字母 */
  alpha: /^[A-Za-z]+$/,
  /* 整数正则函数，根据参数决定正负整数 */
  integerFn: (positive) => new RegExp(`${!positive && '-'}^[1-9]\\d*$`),
  /* 整数 */
  integer: /^-?[1-9]\d*$/,
  /* 浮点数 */
  float: /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/,
  /* 字符串数组验证 */
  alphaArrStr: /^([a-zA-Z]+)+(,[a-zA-Z]+)*$/,
  /* 密码规则验证 */
  password: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{8,20}$/
}
/** 正则规则创建 **/
export function regexRuleCreator (key, message = '内容格式有误', trigger = 'blur', regexFnArgs = []) {
  return { pattern: typeof regexMap[key] === 'function' ? regexMap[key](...regexFnArgs) : regexMap[key], message, trigger }
}
/** 通用验证规则 **/
export function checkoutCommonRules (keys) {
  const rules = {
    require: { required: true, message: '请输入有效内容', trigger: 'blur' },
    integer: { type: 'integer', message: '请输入正整数', trigger: 'blur' },
    number: { type: 'number', message: '请输入有效数字', trigger: 'blur' },
    notLessZero: { type: 'number', min: 0, message: '输入数值必须大于0', trigger: 'blur' }
  }
  return checkoutBy(rules, keys)
}

/* 身份证合法性验证 */
export function idCardValidate (rule, value, callback) {
  return ChinaIdCardValid(value) ? callback() : callback(new Error('身份证号码不合法'))
}
