module.exports = {
  publicPath: '/',
  outputDir: process.env.VUE_APP_FLAG,
  assetsDir: "assets",
  productionSourceMap: false,
  filenameHashing: false,
  lintOnSave: true,
  configureWebpack: {
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/css/variables.scss";`
      },
      scss: {
        additionalData: `@import "@/assets/css/variables.scss";`
      },
      less: {
        globalVars: {
          primary: '#fff'
        }
      }
    },
  },

  devServer: {
    historyApiFallback: {
      rewrite: {
        from: /.\*/g,
        to: '/index.html',
      }
    },

    open: false,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
      },
    },
  }
}
