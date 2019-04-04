import Taro, { Component } from '@tarojs/taro'
// eslint-disable-next-line no-unused-vars
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'

import CBlock from '../../components/cblock/index'
import Comment from '../../components/comment/index'

import { getRandomPlayData, getRandomPlayCommentData } from '../../comm/play.js'

import './index.less'

import entryIcon from '../../res/homepage/entrys/1.png'

console.log(entryIcon)

export default class RoomPage extends Component {

  config = {
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '创建房间'
  }
  state = {
    play: {
      roles: []
    },
    activeRole: {},
    longDetails: false
  }
  store = {
    comments: [
      getRandomPlayCommentData(),
      getRandomPlayCommentData(),
      getRandomPlayCommentData(),
      getRandomPlayCommentData(),
      getRandomPlayCommentData(),
      getRandomPlayCommentData(),
      getRandomPlayCommentData(),
      getRandomPlayCommentData(),
      getRandomPlayCommentData(),
      getRandomPlayCommentData(),
      getRandomPlayCommentData(),
      getRandomPlayCommentData(),
      getRandomPlayCommentData(),
    ]
  }

  /** 页面生命周期 & 生命周期相关函数 */

  componentWillMount () {
    this.initData()
  }
  componentDidShow () {}

  /** 页面交互逻辑函数 */

  swiperToActiveRole (e) {
    const val = e && e.detail && e.detail.current
    this.activeRole(val)
  }
  activeRole (idx) {
    this.setState({
      activeRole: this.state.play.roles[idx]
    })
  }
  toggleLongDetails () {
    this.setState({
      longDetails: !this.state.longDetails
    })
  }

  previewImage (url) {
    Taro.$previewOndImage(url)
  }

  /** 页面跳转函数 */

  /** 渲染相关函数 */

  render () {
    const { play, activeRole } = this.state
    const { comments } = this.store
    const activeRoleIdx = play.roles && play.roles.findIndex(x => activeRole === x)

    return (
      <View className='page'>

        {/* 顶部轮播图 */}
        <CBlock delay={100}>
          <Swiper className='header-swiper' autoplay>
            {
              play.room.images.map(s => {
                return (
                  <SwiperItem key={s}>
                    <Image
                      className='header-image'
                      src={s}
                      mode='aspectFill'
                      onClick={this.previewImage.bind(this, s)}
                    />
                  </SwiperItem>
                )
              })
            }
          </Swiper>
        </CBlock>

        {/* 剧本信息 */}
        <View className='segment segment-info'>

          {/* name */}
          <View className='name-con fsbs'>
            <View className='room-name'>
              <Text className='fs28 bold'>{play.room.name}</Text>
            </View>
            <Text className='stars-con'>
              {
                Array.apply(null, { length: play.stars || 0 }).map((x, idx) => {
                  return <Text className={`iconfont fs24 star star-${play.stars.length}`} key={x + idx}>&#xe6ac;</Text>
                })
              }
            </Text>
          </View>

          {/* tags */}
          <View className='tags-con fss fw'>
            {
              play.tags.map(t => {
                return (
                  <Text className='tag meta-tag fs20 c666' key={t}>{t}</Text>
                )
              })
            }
          </View>

          {/* imppression tags */}
          <View className='tags-con fss fw'>
            {
              play.impressions.map(t => {
                return (
                  <Text className='tag tag-impression fs20 c666' key={t}>{t}</Text>
                )
              })
            }
          </View>

          {/* intro */}
          <View className='block-header'>
            <Text>剧本简介</Text>
          </View>
          <View className='block block-intro'>
            <View className='intro'>
              <Text className='fs22 ls1 c444'>{play.intro}</Text>
            </View>
          </View>

          {/* 角色 */}
          <View className='block-header'>
            <Text>角色介绍</Text>
          </View>
          <View className='block roles-con'>
            <View className='roles-avatar-con fsc'>
              {
                play.roles.map((r, idx) => {
                  return (
                    <CBlock key={r.name}>
                      <View
                        className={'role fcc-c ' + (activeRole.name === r.name ? 'acitve' : '')}
                        onClick={this.activeRole.bind(this, idx)}
                      >
                        <Image className='role-icon' src={entryIcon} mode='aspectFill' />
                        <View className='role-name'>{r.name}</View>
                      </View>
                    </CBlock>
                  )
                })
              }
            </View>
            <Swiper
              className='role-intro'
              circular
              current={activeRoleIdx}
              onChange={this.swiperToActiveRole}
              style={{
                height: this.state.longDetails ? '' : Taro.pxTransform(172)
              }}
            >
              {
                play.roles.map(r => {
                  return (
                    <SwiperItem key={r.name}>
                      <View className='info-item intro'>
                        <Text className='info-title'>简介: </Text>
                        <Text className='info-content'>{r.brief}</Text>
                      </View>
                      {
                        Object.keys(r.info).map(k => {
                          return (
                            <View className='info-item' key={k}>
                              <Text className='info-title'>{k}: </Text>
                              <Text className='info-content'>{r.info[k]}</Text>
                            </View>
                          )
                        })

                      }
                    </SwiperItem>
                  )
                })
              }
            </Swiper>
            <View className='mask'></View>
            <Text
              className={'click-area iconfont arrow-icon ' + (this.state.longDetails ? 'reverse' : '')}
              onClick={this.toggleLongDetails}
            >&#xe652;</Text>
          </View>

        </View>

        {/* 评论信息 */}
        <View className='segment segment-comments mt20 pt20'>
          <View className='block-header m0'>
            <Text>精彩评论</Text>
          </View>
          <View className='comments-con fsc-c'>
            {
              comments.map(c => {
                return (
                  <View className='mt20 w100' key={c._id}>
                    <Comment comment={c} />
                  </View>
                )
              })
            }
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
      activeRole: play.roles[0]
    })
  }

}
