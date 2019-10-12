import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './router'
// import * as serviceWorker from './serviceWorker';

global.appid = 'wx58313e65238ddffa'
global.apiUrl = 'https://activity.yypiano.cn'
global.app_type = 1

const first_url = window.location.href.split('return_uri=')

/**
 * iOS 策略:
 * 1. 记住第一次进来的url，进行config认证
 * 2. 从wechat-dev.letote.cn || wechat-dev.letote.cn/ 进入时可能会config认证失败
 */
global.FIRST_URL = first_url[1] ? first_url[1] : first_url[0]

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
