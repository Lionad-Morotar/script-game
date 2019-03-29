import Taro, { Component } from '@tarojs/taro'
// eslint-disable-next-line no-unused-vars
import { View, Text, Block, Image, Swiper, SwiperItem } from '@tarojs/components'

import Tabbar from '../../components/tabbar/index'
import Play from '../../components/play/index'
import { getRandomPlayData } from '../../comm/play.js'

import './index.less'

import entryIcon1 from '../../res/homepage/entrys/1.png'
import entryIcon2 from '../../res/homepage/entrys/2.png'
import entryIcon3 from '../../res/homepage/entrys/3.png'
import entryIcon4 from '../../res/homepage/entrys/4.png'
import entryIcon5 from '../../res/homepage/entrys/5.png'

export default class standardPage extends Component {

  config = {
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '剧本杀线下助手'
  }
  state = {
    activedSwiper: 0,
  }
  store = {
    swipers: [
      {
        name: '1'
      },
      {
        name: '2'
      },
      {
        name: '3'
      },
      {
        name: '4'
      },
      {
        name: '5'
      },
    ],
    plays: [
      getRandomPlayData(),
      getRandomPlayData(),
      getRandomPlayData(),
      getRandomPlayData(),
      getRandomPlayData(),
      getRandomPlayData(),
      getRandomPlayData(),
      getRandomPlayData(),
      getRandomPlayData(),
      getRandomPlayData(),
      getRandomPlayData(),
      getRandomPlayData(),
      getRandomPlayData(),
    ]
  }

  /** 页面生命周期 & 生命周期相关函数 */

  componentWillMount () {}
  componentDidShow () {}

  /** 页面跳转函数 */

  setIndicators (e) {
    const val = e && e.detail && e.detail.current
    this.setState({
      activedSwiper: val ||  0
    })
  }

  /** 渲染相关函数 */

  render () {
    const { activedSwiper } = this.state
    const { swipers, plays } = this.store

    return (
      <View className='page with-tabbar'>

        {/* 顶部轮播图 */}
        <Swiper className='header-swiper'
          autoplay
          onChange={this.setIndicators}
        >
          {
            swipers.map(s => {
              return (
                <SwiperItem key={s.name}>
                  {/* <View>{s.name}</View> */}
                </SwiperItem>
              )
            })
          }
        </Swiper>

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
          <Image className='entry-icon' src={entryIcon1} mode='aspectFill' />
          <Image className='entry-icon' src={entryIcon2} mode='aspectFill' />
          <Image className='entry-icon' src={entryIcon3} mode='aspectFill' />
          <Image className='entry-icon' src={entryIcon4} mode='aspectFill' />
          <Image className='entry-icon' src={entryIcon5} mode='aspectFill' />
        </View>

        {/* 房间区域 */}
        <View className='segment rooms-con fsbc p030'>
          <View className='room room-big'></View>
          <View className='con fsbc-c h100'>
            <View className='room room-small'></View>
            <View className='room room-small'></View>
          </View>
        </View>

        {/* 剧本列表 */}

        <View className='segment plays-con p030'>
          {
            plays.map((p) => {
              return (
                <View className='mt20' key={p._id}>
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
