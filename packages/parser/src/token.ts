class Token {
  type: string
  tag: string
  attrs: [string, string][] | null
  map: [number, number] | null
  nesting: number
  level: number
  children: Token[] | null
  content: string
  markup: string
  info: string
  meta: any
  block: boolean
  hidden: boolean

  constructor(type: string, tag: string, nesting: number) {
    this.type = type
    this.tag = tag
    this.attrs = null
    this.map = null
    this.nesting = nesting
    this.level = 0
    this.children = null
    this.content = ''
    this.markup = ''
    this.info = ''
    this.meta = null
    this.block = false
    this.hidden = false
  }

  attrIndex(name: string): number {
    if (!this.attrs) {
      return -1
    }

    const attrs = this.attrs
    for (let i = 0, len = attrs.length; i < len; i++) {
      if (attrs[i][0] === name) {
        return i
      }
    }
    return -1
  }

  attrPush(attrData: [string, string]): void {
    if (this.attrs) {
      this.attrs.push(attrData)
    } else {
      this.attrs = [attrData]
    }
  }

  attrSet(name: string, value: string): void {
    const idx = this.attrIndex(name)
    const attrData: [string, string] = [name, value]

    if (idx < 0) {
      this.attrPush(attrData)
    } else {
      this.attrs![idx] = attrData
    }
  }

  attrGet(name: string): string | null {
    const idx = this.attrIndex(name)
    let value: string | null = null
    if (idx >= 0) {
      value = this.attrs![idx][1]
    }
    return value
  }

  attrJoin(name: string, value: string): void {
    const idx = this.attrIndex(name)

    if (idx < 0) {
      this.attrPush([name, value])
    } else {
      this.attrs![idx][1] = this.attrs![idx][1] + ' ' + value
    }
  }
}

export default Token
