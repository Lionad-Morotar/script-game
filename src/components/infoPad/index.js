import Taro, { Component } from '@tarojs/taro'
import { Block,  Image, View, Text } from '@tarojs/components'

import './index.less'

export default class InfoPadCmpt extends Component {

  state = {
  }
  store = {
  }

  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    info: []
  }

  render () {
    const { info } = this.props

    return (
      <View className='info-pad-cmpt'>
        {
          info.length > 0
          ?
          info.map((x, idx) => {
            return (
              <Block key={x.type + x.data + idx}>
                {
                  x.type === 'line' && (
                    <Block>
                      {
                        x.data && (
                          <View className='details-line-name mt10 fsc'>
                            <Text className='fs24 bold'>{x.data}</Text>
                          </View>
                        )
                      }
                      <View className='details-line'></View>
                    </Block>
                  )
                }
                {
                  x.type === 'text' && (
                    <View className='details-text-con'>
                      <Text className='fs24 ls1' key={x.data}>{x.data}</Text>
                    </View>
                  )
                }
                {
                  x.type === 'letter' && (
                    <View className='details-letter-con'>
                      <Text className='fs24 ls1' key={x.data}>{x.data}</Text>
                    </View>
                  )
                }
                {
                  x.type === 'image' && (
                    <View className='details-image-con'>
                      <Image
                        className='details-image'
                        src={x.data}
                        mode='widthFix'
                        key={x.data}
                      />
                    </View>
                  )
                }
              </Block>
            )
          })
          :
          <Text className='fs28 c79 fcc'>暂未详情</Text>
        }
      </View>
    )
  }
}
