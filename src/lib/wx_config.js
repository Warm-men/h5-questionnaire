import { ajax } from 'jquery'
import deviceType from 'src/lib/device_type.js'

const DEBUG = false

const WX_API_LIST = [
  'updateAppMessageShareData',
  'updateTimelineShareData',
  'onMenuShareTimeline',
  'onMenuShareAppMessage'
]

var VERIFY_NUMBER = 0

const wxInit = (isFirstConfigUrl = true) => {
  if (isFirstConfigUrl) {
    VERIFY_NUMBER = 0
  }
  const url = whichUrl(isFirstConfigUrl)
  ajax({
    url: global.apiUrl + '/api/account/getWechatConfig',
    type: 'GET',
    data: {
      url
    },
    dataType: 'jsonp', //指定服务器返回的数据类型
    success: res => {
      const { appId, timestamp, nonceStr, signature } = res.data
      const WX_CONFIG = {
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature // 必填，签名，
      }
      wx.config({
        debug: DEBUG,
        ...WX_CONFIG,
        jsApiList: WX_API_LIST
      })
      // 失效重新获取签名
      wx.error(res => {
        VERIFY_NUMBER++
        console.log(res)
        if (VERIFY_NUMBER <= 2) {
          wxInit(false)
        }
      })
    },
    error: res => {
      console.log(res)
    }
  })
}

const whichUrl = isFirstConfigUrl => {
  const config_url = window.location.href.split('#')[0]
  return deviceType().isiOS
    ? isFirstConfigUrl
      ? global.FIRST_URL
      : config_url
    : isFirstConfigUrl
    ? config_url
    : global.FIRST_URL
}

export default wxInit
