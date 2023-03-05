const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'/',
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      '/Student':{
        target:'http://zzzhong.cn:8081',
        changeOrigin:true
      },
      '/Teacher':{
        target:'http://zzzhong.cn:8081',
        changeOrigin:true
      },
      '/Admin':{
        target:'http://zzzhong.cn:8081',
        changeOrigin:true
      },
    }
  }
})
