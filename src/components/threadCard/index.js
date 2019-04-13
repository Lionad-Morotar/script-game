import Taro, { Component } from '@tarojs/taro'
// eslint-disable-next-line
import { View, Text, Button, Image } from '@tarojs/components'

import CBlock from '../cblock/index'
import InfoPad from '../infoPad/index'

import './index.less'

import entryIcon from '../../res/setting.png'

const THREAD_CARD_ANIMATION_TIME = 400

export default class ThreadCardCmpt extends Component {

  static defaultProps = {
    visible: false,
    canShare: false,
    thread: [],
    onClose: () => {}
  }

  state = {
    innerActive: false,
    zIndex: -1,
  }

  store = {
  }

  componentDidMount () {
    const { visible } = this.props
    if (visible !== this.state.innerActive) {
      this.setVisible(visible)
    }
  }
  componentWillReceiveProps (nextProps) {
    const { visible } = nextProps
    if (visible !== this.state.innerActive) {
      this.setVisible(visible)
    }
  }
  setVisible (visible) {
    if (visible) {
      this.setState({
        innerActive: visible,
        zIndex: 1001
      })
    } else {
      this.setState({
        innerActive: false
      }, () => {
        setTimeout(() => {
          this.setState({
            zIndex: -1
          })
          this.props.onClose()
        }, THREAD_CARD_ANIMATION_TIME)
      })
    }
  }

  render () {
    const { innerActive, zIndex } = this.state
    const { thread, canShare } = this.props

    return (
      <View className='helper-components'>

        {/* mask */}
        <View
          className={'mask ' + (innerActive ? 'active' : '')}
          style={{
            zIndex
          }}
          onClick={this.setVisible.bind(this, false)}
        >

          {/* container */}
          <View className={'container ' + (innerActive ? 'active' : '')}>

            {/* logo */}
            {
              !canShare && (
                <Image
                  className='head-logo'
                  src={entryIcon}
                  mode='aspectFill'
                />
              )
            }

            {/* body */}
            <View className='content'>
              {
                !canShare && (
                  <View className='header'>
                    <View className='header-content'>
                      <Text className='header-text'>你发现了新的线索</Text>
                    </View>
                  </View>
                )
              }
              <View
                className='body'
                style={{
                  height: canShare ? '100%' : `calc( 100% - ${Taro.pxTransform(130)} )`
                }}
              >
                <InfoPad info={thread.data} />
              </View>
            </View>

          </View>

          {/* share button */}
          <CBlock>
            <Button
              className={'share-button ' + (canShare ? 'active' : '')}
              onClick={this.shareThread}
            >
              <Text>分享线索</Text>
            </Button>
          </CBlock>

        </View>

      </View>
    )
  }

  shareThread (e) {
    e.stopPropagation()
  }
}
