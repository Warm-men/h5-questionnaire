import React from 'react'
import ReactDOM from 'react-dom'
import App from './router'
import './index.css'

global.appid = 'wx58313e65238ddffa'
global.apiUrl = 'http://backend.zhihui92.cn'
global.app_type = 1
global.apiSuccess = 200 // NOTE:判断是否接口成功

/**
 * iOS 策略:
 * 1. 记住第一次进来的url，进行config认证
 * 2. 从wechat-dev.letote.cn || wechat-dev.letote.cn/ 进入时可能会config认证失败
 */
const first_url = window.location.href.split('return_uri=')
global.FIRST_URL = first_url[1] ? first_url[1] : first_url[0]

ReactDOM.render(<App />, document.getElementById('root'))
