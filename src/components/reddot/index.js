import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.less'

// TODO 红点可以替换为数字
export default class RedDotCmpt extends Component {

  static defaultProps = {
    visible: false,
  }

  render () {
    const { visible } = this.props

    return (
      <View className='reddot-cmpt'>
        <View className={'reddot ' + (visible ? 'active' : 'dead')} />
        {this.props.children}
      </View>
    )
  }

  /** 业务函数 */

}
