
import Taro from '@tarojs/taro'

/** pullDownRefresh
 * 下拉刷新 单独拎出来方便跨平台是统一处理刷新逻辑
 * @param {String} func 判断页面是否有func方法，如果存在，执行func，否则执行initData > getStatics > resetList
 * @param {String} para 给func方法传参
 * */
export default function pullDownRefresh (func = '', para = '') {
  return WrappedComponent => {
    return class PullDownRefreshComponent extends WrappedComponent {
      onPullDownRefresh () {
        const handle = super.initData || super.getStatics || super.resetList
        const res = super[func] ? para ? super[func].bind(this, para)() : super[func].bind(this)() : handle.bind(this)()
        if (res instanceof Promise) {
          res.then(() => {
            Taro.stopPullDownRefresh()
          })
        } else {
          setTimeout(() => {
            Taro.stopPullDownRefresh()
          }, 800)
        }
      }
    }
  }
}
