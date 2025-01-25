// 定义 Observer 接口
interface IObserver {
  update(observable: Observable): void
}

// 定义 Observable 类，管理状态和观察者
export class Observable {
  private observers: Array<IObserver> = []
  private state: object = {}

  // 附加观察者到可观察对象
  attach(observer: IObserver) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer)
    }
  }

  // 从可观察对象中分离观察者
  detach(observer: IObserver) {
    const index = this.observers.indexOf(observer)
    if (index > -1) {
      this.observers.splice(index, 1)
    }
  }

  // 通知所有观察者状态已更新
  notify() {
    this.observers.forEach((observer) => observer.update(this))
  }

  // 更新状态并通知所有观察者
  actions(newState: object) {
    Object.assign(this.state, newState)
    this.notify()
  }

  // 获取当前状态
  getState() {
    return this.state
  }
}

// 定义 Observer 类，实现 IObserver 接口
export class Observer implements IObserver {
  private updateFunction: (observable: Observable) => void

  constructor(updateFunction: (observable: Observable) => void) {
    this.updateFunction = updateFunction
  }

  // 执行更新操作
  update(observable: Observable) {
    this.updateFunction(observable)
  }
}
