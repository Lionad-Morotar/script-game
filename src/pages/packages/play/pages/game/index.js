import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
// eslint-disable-next-line no-unused-vars
import { Block, View, Text, Image } from '@tarojs/components'

import RedDot from '../../../../../components/reddot/index'
import HeadBar from '../../../../../components/headBar/index'
import InfoPad from '../../../../../components/infoPad/index'
import ThreadCard from '../../../../../components/threadCard/index'

import { getRandomPlayData } from '../../../../../comm/play.js'

import './index.less'

import entryIcon from '../../../../../res/homepage/entrys/1.png'
// import roleImage from '../../../../../res/role.png'

@inject('playStore')
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
    players: [{
      name: 'Lionad',
      sex: 1,
      lever: 7,
    }],
    playerThreads: {

    },
    activeSegment: {},
    isLongDetails: false,
    curThread: [],    // 当前线索(如果找到了线索, 则展示该线索)
    open: {
      threadCard: false,
      threadCon: false,
      shareThread: false,
    },
    active: {
      collection: '',
    }
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
  setTestData () {
    const { players } = this.state
    const { playStore } = this.props
    const curRoleKey = this.$router.params.role || 'prince'

    playStore.curPlayerRole = curRoleKey
    this.setState({
      players: (
        players[0].role = curRoleKey,
        players
      )
    })
  }

  /** 页面交互逻辑函数 */

  toggleisLongDetails () {
    this.setState({
      isLongDetails: !this.state.isLongDetails
    })
  }

  /** !For Test Only
   *  返回上一个页面
   */
  goLastSegment () {
    const { play, activeSegment } = this.state
    const index = play.segments.findIndex(s => s === activeSegment)

    this.setState({
      activeSegment: play.segments[index - 1 < 0 ? 0 : index - 1]
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

  handleActionClick (action) {
    switch (action) {
      case 'segments':
      break
      case 'threads':
        this.setOpen('threadCon', !this.state.open.threadCon)
      break
      case 'open-chat':
      break
      case 'note':
      break
    }
  }
  handleActionPress (action) {
    switch (action) {
      case 'threads':
        this.setOpen('shareThread', true)
        this.setOpen('threadCard', true)
      break
    }
  }
  setOpen (name, val) {
    const { open } = this.state

    this.setState({
      open: (
        open[name] = val,
        open
      )
    })

    this.setOpenSideEffects(name, val)
  }
  setOpenSideEffects (name, val) {
    const effect = {
      'threadCard-false' () {
        this.setOpen('shareThread', false)
        // this.setState({
        //   curThread: []
        // })
      }
    }
    const event = effect[`${name}-${val}`]
    event && event.bind(this)()
  }
  setActive (name, val) {
    const { active } = this.state

    this.setState({
      active: (
        active[name] = val,
        active
      )
    })

    this.setActiveSideEffects(name, val)
  }
  setActiveSideEffects (name, val) {
    const effect = {
    }
    const event = effect[`${name}-${val}`]
    event && event.bind(this)()
  }

  // InfoPad 事件响应
  handleInfoItemAction (info, item) {
    const itemKey = item.key

    switch (info.key) {
      case 'thread':
        const hdlThread = this.postFindThread(itemKey, info)
        hdlThread && this.showAThread(hdlThread)
      break
    }
  }
  showAThread (hdlThread) {
    const { play, playerThreads } = this.state
    const thread = Taro.$utils.deepClone(play.threads[hdlThread.key])
    playerThreads[hdlThread.key] = thread
    this.setState({
      curThread: thread
    }, () => {
      this.setOpen('threadCard', true)
    })
  }
  showAThreadWithShare (hdlThread) {
    this.setOpen('shareThread', true)
    this.showAThread(hdlThread)
  }

  /** 页面跳转函数 */

  /** 渲染相关函数 */

  render () {
    const { play, players, activeSegment, curThread, open, active, playerThreads } = this.state
    const playerThreadsArray = Object.values(playerThreads)
    const { actionNameReflex } = this.store
    const { appStore } = this.props

    // 当前阶段内容
    const handleSegmentContent = activeSegment.content || []
    // 小红点 当前玩家是否掌握了线索
    const hasPlayerThreads = playerThreadsArray.length
    // 当前玩家掌握的线索的集合
    const threadCollections = playerThreadsArray.reduce((h, c) => {
      const collection = play.threadsCollections || {}
      return (
        collection && h.push({
          ...collection[c.collectionKey],
          key: c.collectionKey
        }),
        h
      )
    }, []) || []
    // 当前激活的玩家掌握的线索的集合
    const activeCollection = active.collection || (threadCollections.length && threadCollections[0].key) || ''
    // 当前激活的玩家掌握的线索的集合中的线索 (...绕死我了)
    const threadInCollections = Object.values(playerThreads).reduce((h, c) => {
      const collectionKey = c.collectionKey
      const key = Object.keys(playerThreads).find(k => playerThreads[k] === c)
      return (
        activeCollection == collectionKey && h.push({...c, key}),
        h
      )
    }, []) || []

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
          {
            activeSegment.intro && (
              <View className='intro-con'>
                <View className='intro'>
                  <Text className='fs22 ls1 c444'>{activeSegment.intro}</Text>
                </View>
              </View>
            )
          }
        </View>

        {/* segment content */}
        <View className='contents-con mt20'>
          <InfoPad
            info={handleSegmentContent}
            onInfoItemAction={this.handleInfoItemAction}
          />
        </View>

        {/* padding bottom block */}
        <View
          style={{
            width: '100vw',
            height: open.threadCon ? Taro.pxTransform(270) : '0',
            transition: '.3s ease'
          }}
        />

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
                    onClick={this.handleActionClick.bind(this, action)}
                    onLongPress={this.handleActionPress.bind(this, action)}
                    key={action}
                  >
                    {
                      action === 'segments' && <Text className='iconfont'>&#xe620;</Text>
                    }
                    {
                      action === 'threads' && (
                        <Block>
                          {
                            null && <RedDot visible={hasPlayerThreads}>
                              <Text className='iconfont'>&#xe618;</Text>
                            </RedDot>
                          }
                          <Text className='iconfont'>&#xe618;</Text>
                        </Block>
                      )
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
          <View
            className='next-button fcc'
            onClick={this.goNextSegment}
            onLongPress={this.goLastSegment}
          >
            <Text className='ls3'>下一阶段</Text>
          </View>
        </View>

        {/* 底部线索集合框 */}
        <View className={'threads-segment ' + (open.threadCon ? 'active' : '')}>

          {/* 线索分类 */}
          <View className='block-header'>
            <Text>线索分类</Text>
          </View>
          <View className='thread-collections-con'>
            {
              threadCollections.map((c, idx) => {
                return (
                  <Text
                    className={'thread-collection ' + (activeCollection === c.key ? 'bold' : '')}
                    onClick={this.setActive.bind(this, 'collection', c.key)}
                    key={c.name + idx}
                  >{c.name}</Text>
                )
              })
            }
            {
              threadCollections.length === 0 && (
                <View className='fs24 c999 lh60'>暂无线索分类</View>
              )
            }
          </View>

          {/* 线索陈列 */}
          <View className='block-header'>
            <Text>线索陈列</Text>
          </View>
          <View className='thread-con'>
            {
              threadInCollections.map((thread, idx) => {
                const hdlThread = {key: thread.key}
                return (
                  <Text
                    className='thread-collection'
                    onClick={this.showAThreadWithShare.bind(this, hdlThread)}
                    key={thread.name + idx}
                  >{thread.name}</Text>
                )
              })
            }
            {
              threadInCollections.length === 0 && (
                <View className='fs24 c999 lh60'>暂无线索陈列</View>
              )
            }
          </View>

        </View>

        {/* 单个线索的卡片 */}
        <ThreadCard
          visible={open.threadCard}
          thread={curThread}
          canShare={open.shareThread}
          onClose={this.setOpen.bind(this, 'threadCard', false)}
        />

      </View>
    )
  }

  /** 业务函数 */

  initData () {
    const play = getRandomPlayData()
    this.setState({
      play,
      activeSegment: play.segments[3]
    }, () => {
      this.setTestData()
    })
  }

  postFindThread (key, info) {
    const { playerThreads } = this.state
    const place = info.data.find(x => x.key === key)
    const unFindThreads = place.data.filter(x => !playerThreads[x.key])

    const hdlThread = Taro.$utils.getRandomItem(unFindThreads)

    return hdlThread ? Taro.$utils.deepClone(hdlThread) : null
  }

}
