import Taro, { Component } from '@tarojs/taro'
// eslint-disable-next-line no-unused-vars
import { View, Text, Image } from '@tarojs/components'

import './index.less'

export default class PlayCmpt extends Component {

  static options = {
    addGlobalClass: true
  }
  static defaultProps = {
    play: {}
  }
  state = {
  }
  store = {
  }

  /** 页面生命周期 & 生命周期相关函数 */

  componentWillMount () {}
  componentDidShow () {}

  /** 页面跳转函数 */

  /** 渲染相关函数 */

  render () {
    const { play } = this.props

    return (
      <View className='play-cmpt fsc'>

        <Image className='play-image br8' src='' mode='aspectFill' />

        <View className='content-con f1 fss-c'>
          <View className='play-name'>
            <Text className='fs28 bold'>{play.name}</Text>
          </View>
          <View className='tags-con'>
            {
              play.tags.map(t => {
                return (
                  <Text className='tag fs20 c666' key={t}>{t}</Text>
                )
              })
            }
          </View>
        </View>

      </View>
    )
  }

  /** 业务函数 */

}
