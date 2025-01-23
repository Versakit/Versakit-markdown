import { Observable, Observer } from './observable'

// 创建单例的 Observable 实例
const sharedObservable = new Observable()

// 封装 store 功能
const store = {
  // 附加观察者到 store
  attach: (observer: (observable: Observable) => void) => {
    const newObserver = new Observer(observer)
    sharedObservable.attach(newObserver)
    return () => sharedObservable.detach(newObserver)
  },
  // 更新 store 中的状态
  actions: (newState: object) => {
    sharedObservable.actions(newState)
  },
  // 获取 store 中的当前状态
  getState: () => {
    return sharedObservable.getState()
  },
}

export default store
