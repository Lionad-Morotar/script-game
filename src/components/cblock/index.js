import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.less'

export default class CBlockCmpt extends Component {

  static defaultProps = {
    delay: 0,
    disabled: false,
    layout: ''
  }

  render () {
    const { delay, layout, disabled } = this.props

    return (
      <View
        className={'cblock-cmpt ' + layout}
        hover-class={disabled ? '' : 'main-hover-effect'}
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
