/* eslint-disable import/prefer-default-export */

import { getRandomItem, getRandomFormatedTime, getRandomID, percent } from '../utils/utils.js'

/** Model */

// 获取评论数据
const getCommentModel = () => {
  const username = ['十指流玉', '福克斯', '欢天喜地', 'GTA吹爆']
  const comments = [
    '爱你哟, 吹爆~',
    '先给个红包吧, 挺有意思的',
    '就是流程太短了 要不然 我就给个大红包!',
    '其实我们也是有长评论的~\n\n就是流程太短了 要不然 我就给个大红包!就是流程太短了 要不然 我就给个大红包!就是流程太短了 要不然 我就给个大红包!就是流程太短了 要不然 我就给个大红包!就是流程太短了 要不然 我就给个大红包!就是流程太短了 要不然 我就给个大红包!',
  ]

  return {
    _id: getRandomID(),
    user: {
      name: getRandomItem(username)
    },
    data: getRandomItem(comments),
    time: getRandomFormatedTime()
  }
}

// 获取常用的剧本字段
const getBasicModel = () => {
  const tags = ['简单本', '4人本', '找出凶手']
  percent() && tags.push('编辑推荐')

  return {
    _id: getRandomID(),
    name: '剧本名称',
    stars: +((Math.random() * 5).toFixed(0)) || 1,
    // 剧本本身的标签
    tags,
    // 姥爷们对剧本印象的标签
    impressions: [
      '赛博朋克', '非常好玩', '太棒了', '阿丽塔我女神', '男主角帅',
      '反叛故事', '求续集', '有趣', '非常欢喜', '阿丽塔!',
    ],
    brief: '剧本的内容的简单介绍剧本的内容的简单介绍介绍介绍',
    intro: '剧本杀线下助手欢迎每一名新侦探的到来, 为了更好的体验游戏, 希望所有玩家都可以先体验一遍新手教程, 通关完成之后会给你颁发奖章, 以证明你是一个合格的侦探~ 剧本杀线下助手欢迎每一名新侦探的到来, 为了更好的体验游戏, 希望所有玩家都可以先体验一遍新手教程, 通关完成之后会给你颁发奖章, 以证明你是一个合格的侦探~',
    roles: [
      {
        name: '杀人凶手',
        nick: ['凶手', '色狼'],
        brief: '我名字叫杀人凶手, 可是我不是杀人凶手啊, 但是由于简介只能这么长, 我没办法给你透露更多内容了',
        info: {
          '血型': 'B',
          '口头禅': '阿丽塔我女神',
        },
      },
      {
        name: '要扮演的角色',
        nick: ['小A'],
        brief: '不立志当一个侦探, 就有鬼了, 卧槽, 刚才那是什么, 吓死我了',
        info: {
          '喜好': '阿丽塔',
        },
      },
      {
        name: '鬼',
        brief: '你好, 我是鬼, 偷偷告诉你, 我才是杀人的那位, 只是简介只能这么长, 我没办法给你透露更多内容了',
        info: {
          '血型': 'B',
          '喜好': '漫画',
        },
      },
    ]
  }
}
// 剧本 Model
const getModel = () => {
  return Object.assign(getBasicModel(), {
    room: {
      name: '洪城客栈',
      // 房间图片
      images: [
        'http://img2.imgtn.bdimg.com/it/u=1177420711,740641249&fm=15&gp=0.jpg'
      ]
    }
  })
}

/** export */

export function getRandomPlayData () {
  return getModel()
}
export function getRandomBasicPlayData () {
  return getBasicModel()
}
export function getRandomPlayCommentData () {
  return getCommentModel()
}
