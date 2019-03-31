import Taro, { Component } from '@tarojs/taro'
// eslint-disable-next-line no-unused-vars
import { Block, View, Text, Image } from '@tarojs/components'

import CBlock from '../../components/cblock/index'
import Tabbar from '../../components/tabbar/index'

import './index.less'

export default class standardPage extends Component {

  config = {
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '剧本杀线下助手'
  }
  state = {
  }
  store = {
  }

  /** 页面生命周期 & 生命周期相关函数 */

  componentWillMount () {}
  componentDidShow () {}

  /** 页面交互逻辑函数 */

  /** 页面跳转函数 */

  /** 渲染相关函数 */

  render () {
    return (
      <View className='page with-tabbar'>

        <Tabbar />

      </View>
    )
  }

  /** 业务函数 */

}
