import { commaNum } from '@wxhccc/ui-extend/lib/utils'
/***
** 金额转换为数字加中文
* {number} num 需要格式转化的金额数字
* {string} format 转化格式的字符串
** 返回值: {string} 返回转化后的字符串，例如：wordMoney(12000, '0.00') = '1.20万'
***/
export function wordMoney (num, format = '0.000') {
  const number = Number(num)
  let result = number
  let unitIndex = 0
  let unitArr = []
  while (result >= 10000) {
    unitIndex++
    result = result / 10000
    if (unitIndex === 2) {
      unitIndex = 0
      unitArr.unshift('亿')
    }
  }
  unitIndex === 1 && unitArr.unshift('万')
  unitArr.length && (result = commaNum(result, format))
  return result + unitArr.join('') + '元'
}
