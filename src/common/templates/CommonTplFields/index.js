import { createFormFieldItem } from '@/common'
import UserGroupField from './UserGroupField'
export { default as ImageField } from './ImageField'
export { default as ProvCityFormItem } from './ProvCityFormItem'

export function createUserGroupFormItem (...args) {
  return createFormFieldItem(UserGroupField, ...args)
}
