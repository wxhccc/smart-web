import { getTplOptions } from '@/router/adminRoutes'

export default function () {
  return {
    tplPages: getTplOptions(),
    dataType: [
      { value: 0, label: 'String' },
      { value: 1, label: 'Number' }
    ],
    dictItemState: [
      { value: 0, label: '禁用' },
      { value: 1, label: '正常' }
    ]
  }
}
