module.exports = {
  presets: [
    // '@vue/app',
    '@vue/cli-plugin-babel/preset',
    ['@vue/babel-preset-jsx',
      {
        'injectH': false
      }]
  ],
  plugins: [
    [
      "import",
      {libraryName: "ant-design-vue", libraryDirectory: "es", style: true}
    ],
    // ["transform-vue-jsx"]
  ]
}
