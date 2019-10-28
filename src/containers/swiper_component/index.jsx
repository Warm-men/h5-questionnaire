import { useState, useEffect } from 'react'
import Helmet from 'src/lib/pagehelmet.js'
import wxInit from 'src/lib/wx_config.js'
import Swiper from 'react-id-swiper'
import './index.scss'
import 'react-id-swiper/lib/styles/css/swiper.css'
import { FirstPage, SecondPage, ThirdPage } from './component'

const urlTimestamp = url => {
  const getTimestamp = new Date().getTime()
  const randomNum = Math.floor(Math.random() * 1000)
  return url.indexOf('?') > -1
    ? `${url}&timestamp=${getTimestamp}${randomNum}`
    : `${url}?timestamp=${getTimestamp}${randomNum}`
}

const share = {
  title: '互联网金融消费者权益保护小调研',
  link: urlTimestamp('http://front.zhihui92.cn/'),
  imgUrl:
    'http://backend.zhihui92.cn/uploads/20191023/fa3d63c4f71b76e59eb34ad8a4107389.jpg',
  desc: '中国互联网金融协会邀您参与金融消费者权益保护现状调研，期待您的参与！'
}

export default function IndexContainer(props) {
  const [currentPageIndex, setIndex] = useState(-1)
  const options = {
    direction: 'vertical',
    on: {
      slideNextTransitionEnd: () => setIndex(index => index + 1),
      slidePrevTransitionEnd: () => setIndex(index => index - 1)
    }
  }

  const onMenuShareTimeline = () => {
    // NOTE:分享朋友圈
    wx.onMenuShareTimeline({
      title: share.title, // 分享标题
      link: share.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: share.imgUrl, // 分享图标
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
      title: share.title, // 分享标题
      desc: share.desc, // 分享描述
      link: share.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: share.imgUrl, // 分享图标
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

  useEffect(() => {
    setIndex(0)
  }, [])

  return (
    <div className="home-container">
      <Helmet title="互联网金融消费知识小调研" link="/index" />
      <Swiper
        slideClass="custom-swiper-slide"
        wrapperClass="custom-swiper-wrapper"
        {...options}
      >
        <div className="swiper-image">
          <FirstPage currentPageIndex={currentPageIndex} />
        </div>
        <div className="swiper-image">
          <SecondPage currentPageIndex={currentPageIndex} />
        </div>
        <div className="swiper-image">
          <ThirdPage
            currentPageIndex={currentPageIndex}
            history={props.history}
          />
        </div>
      </Swiper>
    </div>
  )
}
