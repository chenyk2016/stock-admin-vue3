module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // '@': resolve('./src'), // 默认
        components: '@/components',
        assets: '@/assets',
        store: '@/store'
      }
    }
  }
}
