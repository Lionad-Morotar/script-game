import Taro, { Component } from '@tarojs/taro'
// eslint-disable-next-line no-unused-vars
import { Block, View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'

import CBlock from '../../components/cblock/index'
import Comment from '../../components/comment/index'
import MainButton from '../../components/mainButton/index'

import { getRandomPlayData, getRandomPlayCommentData } from '../../comm/play.js'


import './index.less'

import entryIcon from '../../res/homepage/entrys/1.png'

const DISPLAY_ROLES_INLINE_INROOM = 5

export default class RoomPage extends Component {

  config = {
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '创建房间'
  }
  state = {
    // 剧本
    play: {
      roles: []
    },
    // 剧本介绍所绑定的角色
    activeRole: {},
    // 角色信息是否展开
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
    this.activeRole(this.state.play.roles[val].name)
  }
  activeRole (name) {
    const activeRole = this.state.play.roles.find(x => x.name === name)
    this.setState({
      activeRole
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
      <View className='page with-main-button'>

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
            {
              play.roles &&
              play.roles.length &&
              play.roles.reduce((h, c) => {
                if (h.length) {
                  h[h.length-1].length === DISPLAY_ROLES_INLINE_INROOM
                    ? h.push([c])
                    : h[h.length-1].push(c)
                } else {
                  h.push([c])
                }
                return h
              }, []).map((xc, idx) => {
                const resetArray = Array.apply(null, {length: DISPLAY_ROLES_INLINE_INROOM - xc.length})

                return (
                  <Block key={xc[0].name + idx}>
                    {
                      xc.length === DISPLAY_ROLES_INLINE_INROOM ? (
                        <View className='roles-avatar-con fsbc'>
                          {
                            xc.map(r => {
                              return (
                                <CBlock key={r.name}>
                                  <View
                                    className={'role fcc-c ' + (activeRole.name === r.name ? 'acitve' : '')}
                                    onClick={this.activeRole.bind(this, r.name)}
                                  >
                                    <Image className='role-icon' src={entryIcon} mode='aspectFill' />
                                    <View className='role-name'>{r.name}</View>
                                  </View>
                                </CBlock>
                              )
                            })
                          }
                        </View>
                      ) : (
                        <View className='roles-avatar-con fsbc'>
                          {
                            xc.map((r) => {
                              return (
                                <CBlock key={r.name}>
                                  <View
                                    className={'role fcc-c ' + (activeRole.name === r.name ? 'acitve' : '')}
                                    onClick={this.activeRole.bind(this, r.name)}
                                  >
                                    <Image className='role-icon' src={entryIcon} mode='aspectFill' />
                                    <View className='role-name'>{r.name}</View>
                                  </View>
                                </CBlock>
                              )
                            })
                          }
                          {/* padding role */}
                          {
                            resetArray.map((r, paddingIDX) => {
                              return (
                                <View className='role fcc-c' key={r + paddingIDX}>
                                  <View className='role-padding-con'></View>
                                </View>
                              )
                            })
                          }
                        </View>
                      )
                    }
                  </Block>
                )
              })
            }
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
                        Object.keys(r.info || []).map(k => {
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
            <View className='mask' onClick={this.toggleLongDetails}></View>
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

        {/* 创建房间按钮 */}
        <MainButton label='创建房间' onClick={this.tryCreateAnRoom} />

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

  tryCreateAnRoom () {
    Promise.resolve().then(() => {
      Taro.navigateTo({
        url: '../packages/play/pages/prepare/index'
      })
    })
  }

}
