import { ajax } from 'jquery'
import * as storage from './storage.js'
import wxLogin from './wx_login'

const handleError = (error, res) => {
  error && error(res)
}

const handleSuccess = (success, res) => {
  success && success(res)
}

const handleData = (data, isNotParams) => {
  if (isNotParams) {
    return data
  }
  if (storage.get('token', localStorage)) {
    return {
      params: JSON.stringify(data),
      token: storage.get('token', localStorage)
    }
  }
  return {
    params: JSON.stringify(data)
  }
}

const fetchJsonp = formData => {
  let { url, data, success, error, isNotParams } = formData
  ajax({
    url: global.apiUrl + url,
    data: handleData(data, isNotParams),
    type: 'GET',
    dataType: 'jsonp', //指定服务器返回的数据类型
    success: data => {
      if (data.code === 1005) {
        storage.remove('refresh_token', localStorage)
        wxLogin(() => {
          fetchJsonp(formData)
        })
        handleError(error, data)
        return null
      }
      data.code !== 1 ? handleError(error, data) : handleSuccess(success, data)
    },
    error: data => {
      handleError(error, data)
    }
  })
}

export default fetchJsonp
