// 某些页面状态应该放到 appStore 中来管理, 比如页面中的加载状态, 网络错误状态等

import { observable } from 'mobx'

const appStore = observable({

  // headbar 高度
  headHeight: 0,
  setHeadHeight (val) {
    this.headHeight = val
  },

})

export default appStore
