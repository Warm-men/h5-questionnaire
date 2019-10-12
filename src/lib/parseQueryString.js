//获取 url 参数
export const parseQueryString = url => {
  if (!url) {
    return {}
  }
  let obj = {}
  const paraString = url.substring(url.indexOf('?') + 1, url.length).split('&')
  for (let i in paraString) {
    if (paraString[i].indexOf('url=') !== -1) {
      const urlValue = paraString[i].split('url=')[1]
      const urlKey = paraString[i].split('=')[0]
      obj[urlKey] = urlValue
    } else {
      const keyValue = paraString[i].split('=')
      obj[keyValue[0]] = keyValue[1]
    }
  }
  return obj
}
