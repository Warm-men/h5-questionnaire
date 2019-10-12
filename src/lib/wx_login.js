import ajaxJsonp from 'src/lib/ajaxJsonp.js'
import * as storage from './storage.js'

const handlePathname = () => {
  const { pathname, host } = window.location
  if (pathname === '/index' || pathname === '/') {
    return `http://${host}/index`
  } else {
    return `http://${window.location.host}${pathname}`
  }
}

const defaultRedirectUrl = handlePathname()

const wxLogin = (reConnect, redirect_uri = defaultRedirectUrl) => {
  const refreshToken = storage.get('refresh_token', localStorage)
  // NOTE: 未登录过
  if (refreshToken) {
    const data = {
      params: {
        login_type: 2,
        refresh_token: refreshToken,
        app_type: global.app_type
      }
    }
    ajaxJsonp({
      url: '/api/Account/login',
      data,
      success: res => {
        // NOTE：code为1008时refresh_token登录过期，需要走微信登录
        if (res.code === 1008) {
          storage.remove('refresh_token', localStorage)
          wxLogin(reConnect)
          return null
        }
        reConnect && reConnect()
      }
    })
    return null
  }
  if (_.isEmpty(redirect_uri)) {
    alert('wxAuthLink:redirect_uri is Empty!')
    return null
  }
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
    global.appid
  }&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  window.location.href = url
}

export default wxLogin
