import Taro, { Component } from '@tarojs/taro'
// eslint-disable-next-line no-unused-vars
import { View, Text, Block, Image, Swiper, SwiperItem } from '@tarojs/components'

import Tabbar from '../../components/tabbar/index'
import Play from '../../components/play/index'
import CBlock from '../../components/cblock/index'
import { getRandomBasicPlayData } from '../../comm/play.js'

import './index.less'

import entryIcon1 from '../../res/homepage/entrys/1.png'
import entryIcon2 from '../../res/homepage/entrys/2.png'
import entryIcon3 from '../../res/homepage/entrys/3.png'
import entryIcon4 from '../../res/homepage/entrys/4.png'
import entryIcon5 from '../../res/homepage/entrys/5.png'

export default class standardPage extends Component {

  config = {
  }
  state = {
    activedSwiper: 0,
  }
  store = {
    swipers: [
      {
        name: '官方公告'
      },
      {
        name: '重大剧本上新'
      },
      {
        name: '特殊活动说明'
      },
      {
        name: '签到玩法说明'
      },
    ],
    plays: [
      getRandomBasicPlayData(),
      getRandomBasicPlayData(),
      getRandomBasicPlayData(),
      getRandomBasicPlayData(),
      getRandomBasicPlayData(),
      getRandomBasicPlayData(),
      getRandomBasicPlayData(),
      getRandomBasicPlayData(),
      getRandomBasicPlayData(),
      getRandomBasicPlayData(),
      getRandomBasicPlayData(),
      getRandomBasicPlayData(),
      getRandomBasicPlayData(),
    ]
  }

  /** 页面生命周期 & 生命周期相关函数 */

  componentWillMount () {}
  componentDidShow () {}

  /** 页面交互逻辑函数 */

  setIndicators (e) {
    const val = e && e.detail && e.detail.current
    this.setState({
      activedSwiper: val ||  0
    })
  }

  /** 页面跳转函数 */

  goRoom (id) {
    Taro.navigateTo({
      url: `../room/index?playid=${id}`
    })
  }

  /** 渲染相关函数 */

  render () {
    const { activedSwiper } = this.state
    const { swipers, plays } = this.store

    return (
      <View className='page with-tabbar'>

        {/* 顶部轮播图 */}
        <CBlock delay={100}>
          <Swiper className='header-swiper'
            autoplay
            onChange={this.setIndicators}
          >
            {
              swipers.map(s => {
                return (
                  <SwiperItem key={s.name}>
                    <View className='max fcc'>
                      <Text className='tool-tip'>{s.name}</Text>
                    </View>
                  </SwiperItem>
                )
              })
            }
          </Swiper>
        </CBlock>

        {/* 轮播图指示器 */}
        <View className='segment indicators fcc'>
          {
            swipers.map((s, idx) => {
              return (
                <View
                  className={'indicator ' + (activedSwiper === idx ? 'actived' : '')}
                  key={s.name}
                >
                </View>
              )
            })
          }
        </View>

        {/* 功能入口 */}
        <View className='segment entrys-con fsbc'>
          <CBlock>
            <Image className='entry-icon' src={entryIcon1} mode='aspectFill' />
            <View className='entry-name'>快速匹配</View>
          </CBlock>
          <CBlock>
            <Image className='entry-icon' src={entryIcon2} mode='aspectFill' />
            <View className='entry-name'>上新榜单</View>
          </CBlock>
          <CBlock>
            <Image className='entry-icon' src={entryIcon3} mode='aspectFill' />
            <View className='entry-name'>创建房间</View>
          </CBlock>
          <CBlock>
            <Image className='entry-icon' src={entryIcon4} mode='aspectFill' />
            <View className='entry-name'>查找房间</View>
          </CBlock>
          <CBlock>
            <Image className='entry-icon' src={entryIcon5} mode='aspectFill' />
            <View className='entry-name'>每日签到</View>
          </CBlock>
        </View>

        {/* 房间区域 */}
        <View className='segment rooms-con fsbc p030'>
          <CBlock>
            <View className='room room-big'>
              <View className='max fcc'>
                <Text className='tool-tip'>游戏大厅</Text>
              </View>
            </View>
          </CBlock>
          <View className='con fsbc-c h100'>
            <CBlock>
              <View className='room room-small'>
                <View className='max fcc'>
                  <Text className='tool-tip'>新手快速匹配</Text>
                </View>
              </View>
            </CBlock>
            <CBlock>
              <View className='room room-small'>
                <View className='max fcc'>
                  <Text className='tool-tip'>高手快速匹配</Text>
                </View>
              </View>
            </CBlock>
          </View>
        </View>

        {/* 剧本列表 */}

        <View className='segment-header'>
          <Text>推荐剧本</Text>
        </View>
        <View className='segment plays-con p030'>
          {
            plays.map((p) => {
              return (
                <View
                  className='mt20'
                  onClick={this.goRoom.bind(this, p.id)}
                  key={p._id}
                >
                  <Play play={p}  />
                </View>
              )
            })
          }
        </View>

        <Tabbar />

      </View>
    )
  }

  /** 业务函数 */

}
