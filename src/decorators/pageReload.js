import Taro from '@tarojs/taro'

/** pageReload
 *  用于检测页面需不需要根据全局变量的变动而刷新页面
 *
 * @param {String} triggerKey 在globalData中检测是否有此字段, 有则触发对应方法
 * @param {String} triggerMethod 被触发的方法名, 如果为空, 则方法名默认为globalData中对应triggerKey字段的值
 *
 * TODO 在componentWillMount时去掉标志
 */
export default function pageReload (triggerKey, triggerMethod) {
  return WrappedComponent => {
    return class CheckDataUpdateFlag extends WrappedComponent {
      componentDidShow () {
        const store = Taro.$globalData.pageReloadStore[triggerKey]
        if (triggerKey && store) {
          const handledMethod = super[
            triggerMethod || store.trigger
          ]
          handledMethod && (
            store.params
              ? handledMethod.bind(this)(store.params)
              : handledMethod.bind(this)()
          )

          delete Taro.$globalData.pageReloadStore[triggerKey]
        }
        super.componentDidShow && super.componentDidShow()
      }
    }
  }
}
