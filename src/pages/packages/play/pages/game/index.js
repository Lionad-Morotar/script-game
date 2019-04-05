import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
// eslint-disable-next-line no-unused-vars
import { Block, View, Text, Image } from '@tarojs/components'

// import CBlock from '../../../../../components/cblock/index'
import HeadBar from '../../../../../components/headBar/index'

import { getRandomPlayData } from '../../../../../comm/play.js'

import './index.less'

import entryIcon from '../../../../../res/homepage/entrys/1.png'
// import roleImage from '../../../../../res/role.png'

@inject('appStore')
@observer
export default class PreparePage extends Component {

  config = {
    navigationStyle: 'custom'
  }
  state = {
    // userinfo: {
    //   name: 'Lionad',
    //   sex: 1,
    //   lever: 7,
    // },
    play: {
      roles: []
    },
    players: [
      {
        name: 'Lionad',
        sex: 1,
        lever: 7,
      }
    ],
    activeSegment: {},
    isLongDetails: false,
  }
  store = {
    actions: [
      'segments',
      'threads',
      'open-chat',
      'note'
    ],
    actionNameReflex: {
      'segments': '阶段',
      'threads': '线索',
      'open-chat': '聊天',
      'note': '笔记'
    }
  }

  /** 页面生命周期 & 生命周期相关函数 */

  componentWillMount () {
    this.initData()
  }
  componentDidShow () {}

  /** 页面交互逻辑函数 */

  toggleisLongDetails () {
    this.setState({
      isLongDetails: !this.state.isLongDetails
    })
  }

  goNextSegment () {
    const { play, activeSegment } = this.state
    const index = play.segments.findIndex(s => s === activeSegment)

    this.setState({
      activeSegment: play.segments[
        index < play.segments.length - 1 ? index + 1 : index
      ]
    })
  }

  /** 页面跳转函数 */

  /** 渲染相关函数 */

  render () {
    const { players, activeSegment } = this.state
    const { actionNameReflex } = this.store
    const { appStore } = this.props

    const handleSegmentContent = activeSegment.content || []

    return (
      <View className='page with-main-button'>

        <HeadBar title='游戏中' />

        {/* players-con */}
        <View className='players-con fsc' style={{ top: Taro.pxTransform(appStore.headHeight) }}>
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

        {/* segment info */}
        <View
          className='play-info-con br8 p-r'
        >
          <View className='play-title fsc'>
            <Text>{activeSegment.name}</Text>
          </View>
          <View className='intro-con'>
            <View className='intro'>
              <Text className='fs22 ls1 c444'>{activeSegment.intro}</Text>
            </View>
          </View>
        </View>

        {/* segment content */}
        <View className='contents-con mt20'>
          <View className='content-con'>
            {
              handleSegmentContent.length > 0
              ?
              handleSegmentContent.map((x, idx) => {
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
        </View>

        {/* actions segment */}
        <View className='action-segment fsbc'>
          <View className='actions-con f1 fsac'>
            {
              (activeSegment.actions || this.store.actions).map(action => {
                return (
                  <View
                    className='action-con fcc-c'
                    hover-class='action-con-hover'
                    hover-start-time='0'
                    hover-stay-time='260'
                    hover-stop-propagation
                    key={action}
                  >
                    {
                      action === 'segments' && <Text className='iconfont'>&#xe620;</Text>
                    }
                    {
                      action === 'threads' && <Text className='iconfont'>&#xe618;</Text>
                    }
                    {
                      action === 'open-chat' && <Text className='iconfont'>&#xe627;</Text>
                    }
                    {
                      action === 'note' && <Text className='iconfont'>&#xe603;</Text>
                    }
                    <Text className='fs22 action-name'>{actionNameReflex[action]}</Text>
                  </View>
                )
              })
            }
          </View>
          <View className='next-button fcc' onClick={this.goNextSegment}>
            <Text className='ls3'>下一阶段</Text>
          </View>
        </View>

      </View>
    )
  }

  /** 业务函数 */

  initData () {
    const play = getRandomPlayData()
    this.setState({
      play,
      activeSegment: play.segments[0]
    })
  }

}