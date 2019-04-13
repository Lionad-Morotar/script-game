import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { Block,  Image, View, Text } from '@tarojs/components'

// import { retValidData } from '../../comm/valid.js'

import './index.less'

@inject('playStore')
@observer
export default class InfoPadCmpt extends Component {

  state = {
    localInfo: []
  }
  store = {
  }

  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    info: [],
    onInfoAction: () => {},
    onInfoItemAction: () => {}
  }

  componentWillMount () {
    this.resetLocalInfo(this.props)
  }
  componentWillReceiveProps (nextProps) {
    this.resetLocalInfo(nextProps)
  }
  resetLocalInfo (props) {
    const { info } = props
    const cloneInfo = Taro.$utils.deepClone(info)
    // console.log('info cloneInfo : ', info, cloneInfo)
    this.setState({
      localInfo: cloneInfo.map(x => (x.data = this.retValidData(x), x))
    }, () => {
      // console.log(this.state.localInfo)
    })
  }

  /** 交互 */

  handleInfoClick (info) {
    this.props.onInfoAction(info)
  }
  handleInfoItemClick (info, item) {
    this.props.onInfoItemAction(info, item)
  }

  /** undefined */

  retValidData (item) {
    const { playStore } = this.props
    const valid = {
      role: _ => {
        const curRole = playStore.curPlayerRole
        // console.log(_ , curRole, _ instanceof Array ? _.includes(curRole) : _ === curRole)
        return _ instanceof Array ? _.includes(curRole) : _ === curRole
      }
    }
    let rawRetData = [], returnedData = null
    const data = item.data
    const unValidData = item.unValidData

    // 将 unValidData 的每一项取出
    rawRetData = unValidData && unValidData.filter(v => {
      let vValidRes = true
      Object.keys(valid).map(validKey => {
        if (vValidRes && v[validKey]) {
          if (!valid[validKey](v[validKey])) {
            vValidRes = false
          }
        }
      })
      // console.log(v, vValidRes)
      return vValidRes
    }).map(x => x.data) || []

    switch (item.type) {
      case 'options':
        returnedData = (data ? [data] : []).concat(...rawRetData)
      break
      default:
        returnedData = (data ? [data] : []).concat([...rawRetData]).join('\n')
      break
    }

    // console.log(returnedData)
    return returnedData
  }

  render () {
    const { localInfo } = this.state

    // TODO 递归组件
    return (
      <View className='info-pad-cmpt'>
        {
          localInfo.length > 0
          ?
          localInfo.map((x, idx) => {
            const { type, data } = x

            {/* if (type === 'options') {
              console.table(data)
            } */}

            return (
              <View
                onClick={this.handleInfoClick.bind(this, x)}
                key={type + data + idx}
              >
                {
                  type === 'line' && (
                    <Block>
                      {
                        data && (
                          <View className='details-line-name mt10 fsc'>
                            <Text className='fs24 bold'>{data}</Text>
                          </View>
                        )
                      }
                      <View className='details-line'></View>
                    </Block>
                  )
                }
                {
                  type === 'text' && (
                    <View className='details-text-con'>
                      <Text className='fs24 ls1' key={data}>{data}</Text>
                    </View>
                  )
                }
                {
                  type === 'letter' && (
                    <View className='details-letter-con'>
                      <Text className='fs24 ls1' key={data}>{data}</Text>
                    </View>
                  )
                }
                {
                  type === 'image' && (
                    <View className='details-image-con'>
                      <Image
                        className='details-image'
                        src={data}
                        mode='widthFix'
                        key={data}
                      />
                    </View>
                  )
                }
                {
                  type === 'options' && (
                    <View className='details-options-con fss fw'>
                      {
                        data.map(option => {
                          return (
                            <View
                              className='details-option'
                              hover-class='details-option-hover'
                              hover-start-time='0'
                              hover-stay-time='100'
                              onClick={this.handleInfoItemClick.bind(this, x, option)}
                              key={option.name}
                            >
                              <Text className='fs24 bold c444'>{option.name}</Text>
                            </View>
                          )
                        })
                      }
                    </View>
                  )
                }
              </View>
            )
          })
          :
          <Text className='fs28 c79 fcc'>暂无详情</Text>
        }
      </View>
    )
  }
}
