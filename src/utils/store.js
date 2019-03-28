/** File Description - store.js
 * @var {Object} globalData
 * globalData(下称状态)用于存储小程序下全局的状态的订阅,
 * @var {Function} $Set (key, val, formater)
 * @param {Function} formater 当尝试去获取值时, formater 作为类似'格式化'的前置钩子, 默认返回原本的值
 * 给状态的某个属性添加一个依赖
 * @var {Function} $AddSubAndTrigger
 * 给状态的某个属性添加一个依赖, 同时立即执行这个依赖一次
 * @var {Function} $ClearSub
 * 清除状态某个属性的某个依赖
 */


export const globalData = {
  $watcher: {},
  $value: {},
}

export function $ClearSub (key, sub) {
  globalData.$watcher[key].splice(
    globalData.$watcher[key].findIndex(x => x === sub), 1
  )
}
export function $ClearAllSub (key) {
  globalData.$watcher[key] = []
}

export function $AddSub (key, val) {
  if (!globalData.$watcher[key]) {
    globalData.$watcher[key] = [val]
  } else {
    globalData.$watcher[key].push(val)
  }
}
export function $AddSubAndTrigger (key, val, ...params) {
  return new Promise(resolve => {
    $AddSub(key, val)
    const handle = val(...params)
    if (handle instanceof Promise) {
      handle.then(resolve())
    } else {
      resolve()
    }
  })
}

export function $Set (key, val, formater) {
  // console.log('@Store : ', key, val, formater)
  const callWatcher = (cVal) => {
    if (!globalData.$watcher[key]) {
      globalData.$watcher[key] = []
    } else {
      globalData.$watcher[key].forEach(func => func(cVal))
    }
  }
  const callFormater = formater

  if (!globalData[key]) {
    Object.defineProperty(globalData, key, {
      enumerable: true,
      configurable: true,
      set (newVal) {
        // console.log('GLOBAL SET :', key, newVal)
        callWatcher(newVal)
        globalData.$value[key] = newVal
      },
      get () {
        // console.log('GLOBAL GET :', key)
        return callFormater
          ? callFormater(globalData.$value[key])
          : globalData.$value[key]
      }
    })
  }
  globalData[key] = val
}

export function $Del (key) {
  delete globalData[key]
}

export function $Get (key) {
  return globalData[key]
}
