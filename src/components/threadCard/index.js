import Taro, { Component } from '@tarojs/taro'
// eslint-disable-next-line
import { View, Text, Image } from '@tarojs/components'

import './index.less'

import entryIcon from '../../res/setting.png'

const THREAD_CARD_ANIMATION_TIME = 400

export default class ThreadCardCmpt extends Component {

  static defaultProps = {
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
    const { } = this.store

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

          <View className={'container ' + (innerActive ? 'active' : '')}>

            {/* logo */}
            <Image
              className='head-logo'
              src={entryIcon}
              mode='aspectFill'
            />

            {/* body */}
            <View className='content'>
              <View className='header'>
                <View className='header-content'>
                  <Text className='header-text'>你发现了新的线索</Text>
                </View>
              </View>
              <View className='body'>
              </View>
            </View>

          </View>

        </View>

      </View>
    )
  }
}
