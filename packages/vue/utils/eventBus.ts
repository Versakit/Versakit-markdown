export class EventBus {
  private events: { [key: string]: Array<(...args: any[]) => void> } = {}

  $on(event: string, callback: (...args: any[]) => void): void {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  $emit(event: string, ...args: any[]): void {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(...args))
    }
  }

  $off(event: string, callback: (...args: any[]) => void): void {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback)
    }
  }
}
