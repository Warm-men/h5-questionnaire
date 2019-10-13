module.exports = {
  proxy: {
    '/api': {
      target: 'http://backend.zhihui92.cn',
      secure: false,
      changeOrigin: true,
      preserveHeaderKeyCase: true,
      hostRewrite: true,
      autoRewrite: true
    }
  }
}
