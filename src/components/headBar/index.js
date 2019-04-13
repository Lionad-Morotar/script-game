import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'

import './index.less'

const HEADBAR_HEIGHT = 90

@inject('appStore')
@observer
export default class HeadBarComponent extends Component {

  state = {
    headBarHeight: 0,
    headBarHeightStore: 0,
  }
  store = {
  }

  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    layout: []
  }

  componentWillMount () {
    this.calcHeadHeight()
  }

  /** component height */
  calcHeadHeight () {
    const { appStore } = this.props
    const sysInfo = Taro.$globalData.SystemInfo || Taro.getSystemInfoSync()
    const setHeight = sysInfo.statusBarHeight * 2

    this.setState({
      headBarHeight: Taro.pxTransform(setHeight),
      headBarHeightStore: setHeight,
    })
    appStore.setHeadHeight(setHeight + HEADBAR_HEIGHT)
  }

  refIcon = (node) => this.refIcon = node

  // DOM初始化的时候检测当前页面路径是否被匹配
  checkPageActive () {}

  render () {
    const {
      headBarHeight,
      headBarHeightStore,
    } = this.state

    const { layout } = this.props

    return (
      <View className='component headbar'>
        <View
          className={
            'headbar-padding ' + (
              layout.includes('gray')
                ? 'bgc-gray c333'
                : layout.includes('orange')
                    ? 'bgc-m-o cfff'
                    : 'bgc-w c333'
            ) + ' ' +
            (layout.includes('border') ? 'headbar-border' : '') + ' ' +
            (layout.includes('absolute') ? 'absolute' : '')
          }
          style={{
            height: headBarHeight
          }}
        ></View>
        <View
          className={
            'headbar-real ' + (
              layout.includes('gray')
                ? 'bgc-gray c333'
                : layout.includes('orange')
                    ? 'bgc-m-o cfff'
                    : 'bgc-w c333'
            ) + ' ' +
            (layout.includes('border') ? 'headbar-border' : '') + ' ' +
            (layout.includes('absolute') ? 'absolute' : '')
          }
          style={{
            top: headBarHeight
          }}
        >
          <View className='headbar-wrapper'>
            {/* 返回图标 */}
            <Text className='fcc' ref={this.refIcon} onClick={this.toggleHeadBarMenu}>
              <Text className='iconfont headbar-icon fs32 goback'>&#xe6df;</Text>
            </Text>
            {/* 页面标题 */}
            <Text className='title'>
              <Text>{this.props.title || ''}</Text>
            </Text>
          </View>
        </View>

        {/* real padding */}
        <View style={{ top: headBarHeight, height: Taro.pxTransform(headBarHeightStore + HEADBAR_HEIGHT) }}></View>

      </View>
    )
  }

  toggleHeadBarMenu () {
    Taro.navigateBack()
  }
}
