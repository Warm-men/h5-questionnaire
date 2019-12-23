const urlTimestamp = url => {
  const getTimestamp = new Date().getTime()
  const randomNum = Math.floor(Math.random() * 1000)
  return url.indexOf('?') > -1
    ? `${url}&timestamp=${getTimestamp}${randomNum}`
    : `${url}?timestamp=${getTimestamp}${randomNum}`
}

export const shareConfig = {
  title: '互联网金融消费知识小调研',
  link: urlTimestamp('http://front.zhihui92.cn/'),
  imgUrl:
    'http://backend.zhihui92.cn/uploads/20191023/fa3d63c4f71b76e59eb34ad8a4107389.jpg',
  desc: '中国互联网金融协会诚邀您参与互联网金融消费知识调研，期待您的参与！'
}
