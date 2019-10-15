import { Router } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Routers from './routers'
import ajaxJsonp from 'src/lib/ajaxJsonp.js'
import wxLogin from 'src/lib/wx_login.js'
import * as storage from 'src/lib/storage.js'
import { parseQueryString } from 'src/lib/parseQueryString.js'

const browserHistory = createBrowserHistory()

class App extends React.PureComponent {
  componentDidMount() {
    const search = parseQueryString(window.location.search)
    // 新用户还没有登录过
    if (!storage.get('refresh_token', localStorage)) {
      if (_.isEmpty(search.code)) {
        wxLogin()
      } else {
        ajaxJsonp({
          url: '/api/account/wchatH5Login',
          isNotParams: true,
          data: {
            code: search.code
          },
          success: res => {
            if (res.code === 1) {
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
                  this.forceUpdate()
                }
              })
            }
          }
        })
      }
    } else {
      console.log('登录过！')
    }
  }

  render() {
    if (storage.get('refresh_token', localStorage)) {
      return (
        <Router history={browserHistory}>
          <Routers />
        </Router>
      )
    } else {
      return null
    }
  }
}

export default App
