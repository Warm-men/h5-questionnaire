import { useEffect, useState } from 'react'
import ajaxJsonp from 'src/lib/ajaxJsonp.js'
import wxLogin from 'src/lib/wx_login.js'
import * as storage from 'src/lib/storage.js'
import { createBrowserHistory } from 'history'
import { parseQueryString } from 'src/lib/parseQueryString.js'

export default function useLogin() {
  console.log(2)
  const [isLogin, setIsLogin] = useState(
    storage.get('refresh_token', localStorage)
  )

  useEffect(() => {
    console.log(1)
    const search = parseQueryString(window.location.search)
    // 新用户还没有登录过
    if (!isLogin) {
      if (_.isEmpty(search.code)) {
        wxLogin()
      } else {
        ajaxJsonp({
          url: '/api/account/wchatH5Login',
          isNotParams: true,
          data: { code: search.code },
          success: res => {
            if (res.code === global.apiSuccess) {
              const { openid, nickname, headimgurl } = res.data
              const data = {
                open_id: openid,
                user_name: nickname,
                head_img: headimgurl,
                login_type: 1,
                app_type: global.app_type
              }
              ajaxJsonp({
                url: '/api/Account/login',
                data,
                success: loginRes => {
                  const { refresh_token, token } = loginRes.data
                  storage.set('refresh_token', refresh_token, localStorage)
                  storage.set('token', token, localStorage)
                  const history = createBrowserHistory()
                  history.replace(window.location.pathname)
                  setIsLogin(true)
                }
              })
            }
          }
        })
      }
    } else {
      console.log('登录过！')
    }
  }, [])

  return [isLogin, setIsLogin]
}
