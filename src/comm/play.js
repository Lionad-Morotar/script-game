/* eslint-disable import/prefer-default-export */

const getModel = () => {
  return {
    _id: +new Date() + (+new Date() * Math.random()).toFixed(0),
    name: '剧本名称',
    tags: [
      '简单本',
      '4人本',
      '找出凶手'
    ]
  }
}

export function getRandomPlayData () {
  return getModel()
}
