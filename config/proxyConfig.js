module.exports = {
  proxy: {
    '/api': {
      target: 'https://activity.yypiano.cn',
      secure: false,
      changeOrigin: true,
      preserveHeaderKeyCase: true,
      hostRewrite: true,
      autoRewrite: true
    }
  }
}
