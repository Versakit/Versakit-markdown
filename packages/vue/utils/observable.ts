interface Observer {
  update(observable: Observable): void
}

export class Observable {
  private observers: Array<Observer> = []
  private state: object = {}

  attach(observer: Observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer)
    }
  }

  detach(observer: Observer) {
    const index = this.observers.indexOf(observer)
    if (index > -1) {
      this.observers.splice(index, 1)
    }
  }

  notify() {
    this.observers.forEach((observer) => observer.update(this))
  }

  actions(newState: object) {
    Object.assign(this.state, newState)
    this.notify()
  }
}
