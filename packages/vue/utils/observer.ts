export class Observer {
  private updateFunction: (observable: any) => void

  constructor(updateFunction: (observable: any) => void) {
    this.updateFunction = updateFunction
  }

  update(observable: any) {
    this.updateFunction(observable)
  }
}
