/* eslint-disable import/prefer-default-export */

const getModel = () => {
  return {
    _id: +new Date() + (+new Date() * Math.random()).toFixed(0),
    name: '剧本名称',
    stars: (Math.random() * 5).toFixed(0),
    tags: [
      '简单本',
      '4人本',
      '找出凶手'
    ],
    brief: '剧本的内容的简单介绍剧本的内容的简单介绍介绍介绍'
  }
}

export function getRandomPlayData () {
  return getModel()
}
