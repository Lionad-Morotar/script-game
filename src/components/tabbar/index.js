import Taro, { Component } from '@tarojs/taro'
// eslint-disable-next-line no-unused-vars
import { View, Text, Image } from '@tarojs/components'

import './index.less'

import settingIcon from '../../res/setting.png'

export default class TabbarCmpt extends Component {

  static options = {
    addGlobalClass: true
  }
  state = {
    activePath: ''
  }
  store = {

    list: [
      {
        name: '首页',
        icon: '',
        activedIcon: '',
        path: '../home/index'
      },
      {
        name: '发现',
        icon: '',
        activedIcon: '',
        path: ''
      },
      {
        name: '消息',
        icon: '',
        activedIcon: '',
        path: ''
      },
      {
        name: '我的',
        icon: '',
        activedIcon: '',
        path: ''
      }
    ]

  }

  /** 页面生命周期 & 生命周期相关函数 */

  componentWillMount () {
    this.checkPageActive()
  }
  componentDidShow () {}

  /** 页面跳转函数 */

  /** 渲染相关函数 */

  render () {
    const { activePath } = this.state
    const { list } = this.store

    return (
      <View className='tabbar-cmpt fsac'>
        {
          list.map(item => {
            return (
              <View
                className='tabbar-list-item f1 fsc-c'
                onClick={this.goTabbarPage.bind(this, item)}
                key={item.id}
              >
                {/* src={
                  item.path === active ? item.activedIcon : item.icon
                } */}
                <Image
                  className='tabbar-list-item-icon'
                  src={settingIcon}
                  mode='aspectFit'
                />
                <Text
                  className={
                    'tabbar-list-item-name fs20 ' + (
                      item.path === activePath ? 'bold' : 'gray'
                    )
                  }
                >{item.name}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }

  /** 业务函数 */

  checkPageActive () {
    const pageStack = Taro.getCurrentPages()
    const currentPath = pageStack[pageStack.length - 1].route
    const comparePath = currentPath.replace('pages', '..')
    this.setState({
      activePath: comparePath
    })
  }

  goTabbarPage (item) {
    if (item.path !== this.state.activePath) {
      Taro.redirectTo({
        url: item.path
      })
    }
  }

}
