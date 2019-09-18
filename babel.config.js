module.exports = {
  'presets': [
    '@vue/app'
  ],
  'plugins': [
    ['import',
      {
        'libraryName': 'lodash',
        'libraryDirectory': '',
        'camel2DashComponentName': false
      },
      'lodash'
    ],
    ['import', { 'libraryName': '@wxhccc/ui-extend' }, '@wxhccc/ui-extend']
  ]
}
