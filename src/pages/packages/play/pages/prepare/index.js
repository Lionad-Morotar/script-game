import Taro, { Component } from '@tarojs/taro'
// eslint-disable-next-line no-unused-vars
import { Block, View, Text, Image } from '@tarojs/components'

// import CBlock from '../../../../../components/cblock/index'

import { getRandomPlayData } from '../../../../../comm/play.js'

import './index.less'

import entryIcon from '../../../../../res/homepage/entrys/1.png'

export default class PreparePage extends Component {

  config = {
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '准备界面'
  }
  state = {
    play: {},
    players: [
      {
        name: 'Lionad',
        sex: 1,
        lever: 7,
      }
    ],
    longDetails: true
  }
  store = {
  }

  /** 页面生命周期 & 生命周期相关函数 */

  componentWillMount () {
    this.initData()
  }
  componentDidShow () {}

  /** 页面交互逻辑函数 */

  toggleLongDetails () {
    this.setState({
      longDetails: !this.state.longDetails
    })
  }

  /** 页面跳转函数 */

  /** 渲染相关函数 */

  render () {
    const { play, players } = this.state

    return (
      <View className='page'>

        {/* players-con */}
        <View className='players-con fsac'>
          {
            players.map(player => {
              return (
                <View className='player-con fcc-c' key={player.name}>
                  <Image className='role-icon' src={entryIcon} mode='aspectFill' />
                  <View className='role-name'>{player.name}</View>
                </View>
              )
            })
          }
        </View>

        {/* play content */}
        <View
          className='play-info-con br8 p-r'
          style={{
            height: this.state.longDetails ? Taro.pxTransform(600) : Taro.pxTransform(130)
          }}
        >
          <View
            className={'click-area arrow-icon fcc ' + (this.state.longDetails ? 'reverse' : '')}
            onClick={this.toggleLongDetails}
          >
            <Text className='iconfont'>&#xe652;</Text>
          </View>

          <Image
            className='header-image'
            src={play.room.images[0]}
            mode='aspectFill'
            onClick={this.previewImage.bind(this, play.room.images[0])}
          />
          <View className='intro-con'>
            <View className='block block-intro'>
              <View className='intro'>
                <Text className='fs22 ls1 c444'>{play.intro}</Text>
              </View>
            </View>
          </View>
        </View>

      </View>
    )
  }

  /** 业务函数 */

  initData () {
    this.setState({
      play: getRandomPlayData()
    })
  }

}
