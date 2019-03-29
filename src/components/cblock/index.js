import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.less'

export default class CBlockCmpt extends Component {

  static defaultProps = {
    delay: 0
  }

  render () {
    const { delay } = this.props

    return (
      <View
        className='cblock-cmpt'
        hover-class='main-hover-effect'
        hover-start-time={delay}
        hover-stay-time='60'
        hover-stop-propagation
      >
        {this.props.children}
      </View>
    )
  }

  /** 业务函数 */

}
