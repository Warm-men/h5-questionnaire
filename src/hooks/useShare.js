import { useEffect } from 'react'
import wxInit from 'src/lib/wx_config.js'

export default function useShare() {
  const urlTimestamp = url => {
    const getTimestamp = new Date().getTime()
    const randomNum = Math.floor(Math.random() * 1000)
    return url.indexOf('?') > -1
      ? `${url}&timestamp=${getTimestamp}${randomNum}`
      : `${url}?timestamp=${getTimestamp}${randomNum}`
  }

  const shareConfig = {
    title: '互联网金融消费知识小调研',
    link: urlTimestamp('http://front.zhihui92.cn/'),
    imgUrl:
      'http://backend.zhihui92.cn/uploads/20191023/fa3d63c4f71b76e59eb34ad8a4107389.jpg',
    desc: '中国互联网金融协会诚邀您参与互联网金融消费知识调研，期待您的参与！'
  }

  const onMenuShareTimeline = () => {
    // NOTE:分享朋友圈
    wx.onMenuShareTimeline({
      title: shareConfig.title, // 分享标题
      link: shareConfig.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareConfig.imgUrl, // 分享图标
      success: () => {
        // 用户点击了分享后执行的回调函数
      },
      fail: res => {
        wxInit(true, onMenuShareTimeline)
      },
      trigger: () => {}
    })
  }

  const onMenuShareAppMessage = () => {
    // NOTE：分享用户
    wx.onMenuShareAppMessage({
      title: shareConfig.title, // 分享标题
      desc: shareConfig.desc, // 分享描述
      link: shareConfig.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareConfig.imgUrl, // 分享图标
      success: () => {
        // 用户点击了分享后执行的回调函数
      },
      fail: res => {
        wxInit(true, onMenuShareAppMessage)
      }
    })
  }

  useEffect(() => {
    wxInit()
    wx.ready(() => {
      onMenuShareTimeline()
      onMenuShareAppMessage()
    })
  }, [])
}
