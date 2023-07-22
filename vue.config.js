const { defineConfig } = require('@vue/cli-service')

//const ASSET_PATH = process.env.ASSET_PATH || '/';
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  configureWebpack: { devtool: 'source-map' }
})