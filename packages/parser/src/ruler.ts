interface Rule {
  name: string
  enabled: boolean
  fn: Function
  alt: string[]
}

class Ruler {
  private __rules__: Rule[] = []
  private __cache__: { [key: string]: Function[] } | null = null

  // Find rule index by name
  private __find__(name: string): number {
    for (let i = 0; i < this.__rules__.length; i++) {
      if (this.__rules__[i].name === name) {
        return i
      }
    }
    return -1
  }

  // Build rules lookup cache
  private __compile__(): void {
    const self = this
    const chains: string[] = ['']

    // collect unique names
    self.__rules__.forEach(function (rule) {
      if (!rule.enabled) {
        return
      }

      rule.alt.forEach(function (altName) {
        if (chains.indexOf(altName) < 0) {
          chains.push(altName)
        }
      })
    })

    self.__cache__ = {}

    chains.forEach(function (chain) {
      ;(self.__cache__ as { [key: string]: Function[] })[chain] = []
      self.__rules__.forEach(function (rule) {
        if (!rule.enabled) {
          return
        }

        if (chain && rule.alt.indexOf(chain) < 0) {
          return
        }

        ;(self.__cache__ as { [key: string]: Function[] })[chain].push(rule.fn)
      })
    })
  }

  at(name: string, fn: Function, options: { alt?: string[] } = {}): void {
    const index = this.__find__(name)
    const opt = options

    if (index === -1) {
      throw new Error('Parser rule not found: ' + name)
    }

    this.__rules__[index].fn = fn
    this.__rules__[index].alt = opt.alt || []
    this.__cache__ = null
  }

  before(
    beforeName: string,
    ruleName: string,
    fn: Function,
    options: { alt?: string[] } = {},
  ): void {
    const index = this.__find__(beforeName)
    const opt = options

    if (index === -1) {
      throw new Error('Parser rule not found: ' + beforeName)
    }

    this.__rules__.splice(index, 0, {
      name: ruleName,
      enabled: true,
      fn,
      alt: opt.alt || [],
    })

    this.__cache__ = null
  }

  after(
    afterName: string,
    ruleName: string,
    fn: Function,
    options: { alt?: string[] } = {},
  ): void {
    const index = this.__find__(afterName)
    const opt = options

    if (index === -1) {
      throw new Error('Parser rule not found: ' + afterName)
    }

    this.__rules__.splice(index + 1, 0, {
      name: ruleName,
      enabled: true,
      fn,
      alt: opt.alt || [],
    })

    this.__cache__ = null
  }

  push(ruleName: string, fn: Function, options: { alt?: string[] } = {}): void {
    const opt = options

    this.__rules__.push({
      name: ruleName,
      enabled: true,
      fn,
      alt: opt.alt || [],
    })

    this.__cache__ = null
  }

  enable(list: string | string[], ignoreInvalid: boolean = false): string[] {
    if (!Array.isArray(list)) {
      list = [list]
    }

    const result: string[] = []

    list.forEach(function (this: Ruler, name) {
      const idx = this.__find__(name)

      if (idx < 0) {
        if (ignoreInvalid) {
          return
        }
        throw new Error('Rules manager: invalid rule name ' + name)
      }
      this.__rules__[idx].enabled = true
      result.push(name)
    }, this)

    this.__cache__ = null
    return result
  }

  enableOnly(list: string | string[], ignoreInvalid: boolean = false): void {
    if (!Array.isArray(list)) {
      list = [list]
    }

    this.__rules__.forEach(function (rule) {
      rule.enabled = false
    })

    this.enable(list, ignoreInvalid)
  }

  disable(list: string | string[], ignoreInvalid: boolean = false): string[] {
    if (!Array.isArray(list)) {
      list = [list]
    }

    const result: string[] = []

    list.forEach(function (this: Ruler, name) {
      const idx = this.__find__(name)

      if (idx < 0) {
        if (ignoreInvalid) {
          return
        }
        throw new Error('Rules manager: invalid rule name ' + name)
      }
      this.__rules__[idx].enabled = false
      result.push(name)
    }, this)

    this.__cache__ = null
    return result
  }

  getRules(chainName: string = ''): Function[] {
    if (this.__cache__ === null) {
      this.__compile__()
    }

    return (this.__cache__ as { [key: string]: Function[] })[chainName] || []
  }
}

export default Ruler
