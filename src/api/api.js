import Taro from '@tarojs/taro'
import { $Set } from '../utils/store'

/** 防止重复请求 */
const APILOCK = {}

/** 轮询池 */
const pollingPool = {}
export function setNewPolling (url, params, count = 30, time = 1000) {
  const key = url
  const handle = pollingPool[key]
  let curCount = 0
  if (handle) return

  pollingPool[key] = {
    handler: () => {
      const interval = setInterval(() => {
        if ((curCount ++) > curCount) {
          $Set(key, false)
          delete pollingPool[key]
          clearInterval(interval)
        }
      }, time)
    },
    count,
  }
  $Set(key, '')
  pollingPool[key].handler()
}

const directRequest = (params, method = 'GET') => {

  const handleKey = JSON.stringify(params)
  if (APILOCK[handleKey]) {
    console.log('$: repeated api')
    return null
  } else {
    APILOCK[handleKey] = true
  }

  const commonExec = () => {
    Taro.stopPullDownRefresh()
    delete APILOCK[handleKey]
  }

  const contentType = params.contentType ||
    'application/x-www-form-urlencoded'
  const option = {
    url: params.api_host + params.url,
    data: Object.assign({
      'token': Taro.$globalData.token,
      '_t': new Date().getTime(),
      ...(params.coverData || {})
    }, params.data),
    method: method,
    header: {
      'content-type': contentType
    },
    success (res) {
      commonExec()
      if (+res.data.code < 0) {
        switch (res.data.code) {
          default:
            Taro.showModal({
              title: '提示',
              content: res.data.msg
            })
          throw new Error(res.data)
        }
      }
    }
  }

  return Taro.request(option).catch(() => {
    commonExec()
    Taro.showModal({
      title: '提示',
      content: '请求发起失败, 请检查网络并重试'
    })
  })
}

export default {

  get (url, data = {}) {
    return directRequest({ url, data })
  },
  post (url, data, contentType) {
    return directRequest({ url, data, contentType }, 'POST')
  },

}
