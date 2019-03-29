// TODO 一个用于收集错误的容器, 在小程序结束时上传数据到服务器

import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'

import appStore from './store/appStore'

import api from './api/api'
import navigate from './utils/navigator'
import { $AddSub, $ClearSub, $AddSubAndTrigger, $Set, globalData } from './utils/store'
import utils from './utils/utils'

import './app.less'

const store = {
  appStore
}

class App extends Component {

  config = {
    pages: [
      'pages/home/index'
    ],
    permission: {
      // "scope.userLocation": {
      //   "desc": "你的位置信息将用于小程序位置接口的效果展示"
      // }
    },
    window: {
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'twt-taro',
      navigationBarTextStyle: 'black',
      backgroundTextStyle: "dark"
    },
    networkTimeout: {
      "request": 10000,
      "connectSocket": 10000,
      "uploadFile": 10000,
      "downloadFile": 10000
    },
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

Taro.$api = api
Taro.$globalData = globalData
Taro.$navigate = navigate
Taro.$ClearSub = $ClearSub
Taro.$AddSub = $AddSub
Taro.$AddSubAndTrigger = $AddSubAndTrigger
Taro.$utils = utils

// 配合 decorators/pageReload 使用
Taro.$setPageTrigger = (key, val, params) => {
  Taro.$globalData.pageReloadStore[key] = {
    trigger: val,
    params: params
  }
}

$Set('SystemInfo', Taro.getSystemInfoSync())

;((window) => {
  const EXCEEDING_LENGTH = 9

  navigateDecorator()
  newErrorDecorator()

  // 抛出异常时, 停止加载中loading效果
  function newErrorDecorator () {
    const errFn = Error
    const hideLoading = window.hideLoading

    Error = (...params) => {
      hideLoading && hideLoading()
      errFn(...params)
    }
  }

  // navigateTo 跳转层数限制最小兼容
  function navigateDecorator () {
    const go = window.navigateTo
    const redirect = window.redirectTo

    go && redirect && (
      window.navigateTo = (...params) => {
        const currentPages = window.getCurrentPages
          ? window.getCurrentPages()
          : []

        currentPages.length > EXCEEDING_LENGTH
          ? redirect(...params)
          : go(...params)
      }
    )
  }
})(Taro)
