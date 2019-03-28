/**
 * @see https://github.com/ariesjia/taro-ts-mobx-boilerplate/blob/master/src/utils/route.ts
 */

import Taro from "@tarojs/taro"

const HOME_PAGE = "pages/home/index"

export const CONSTANT = {
  HOME_PAGE,
}

export const getCtx = selector => {
  const pages = Taro.getCurrentPages()
  const ctx = pages[pages.length - 1]

  return ctx.selectComponent(selector) || null
}

/** backTo
 * 尝试将页面回退至某一路径
 * @param {String} route 目标路径
 * 判断机制是判断页面路径是否匹配页面栈中的某一条,
 * 匹配则使用`navigateBack`返回目标路径
 * 不匹配则跳转至目标路径
 */
export const backTo = route => {
  const lastRouteNameReg = /[^/]+\/index/g

  route = route instanceof Object ? route.url : route
  const washedRoute = route.match(lastRouteNameReg) && route.match(lastRouteNameReg)[0]
  const currentPages = Taro.getCurrentPages()
  const washPageRoute = rawPath => rawPath.match(lastRouteNameReg) && rawPath.match(lastRouteNameReg)[0] || ''
  const index = currentPages.findIndex(
    page => {
      // console.log(washPageRoute(page.route), washedRoute, washedRoute === washPageRoute(page.route))
      return washedRoute === washPageRoute(page.route)
    }
  )
  // console.log(washedRoute, index)

  if (index >= 0) {
    // console.log('back')
    Taro.navigateBack({ delta: currentPages.length - index - 1 || 1 })
  } else {
    // console.log('navi')
    Taro.navigateTo({ url: route })
  }
}

// 返回首页
export const backHome = () => backTo(HOME_PAGE)

export default {
  getCtx,
  backTo,
  backHome,
}
