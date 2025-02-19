import {
  o as g,
  c as S,
  r as z,
  d as N,
  h as V,
  j as C,
  N as B,
  p as _,
  v as O,
  Y as k,
  G as d,
  w as f,
  a0 as D,
  n as $,
  t as L,
  a1 as j,
  T as X,
  k as i,
  x as I,
  b as w,
  a as W,
} from './chunks/framework.dB56A39y.js'
const A = (c, t) => (
    (c.install = (s) => {
      for (const u of [c, ...Object.values({})]) s.component(u.name, u)
    }),
    c
  ),
  R = (c, t) => {
    const s = c.__vccOpts || c
    for (const [u, h] of t) s[u] = h
    return s
  },
  P = {},
  Z = { class: 'ver-code' }
function q(c, t) {
  return g(), S('div', Z, [z(c.$slots, 'default', {}, void 0, !0)])
}
const U = R(P, [
    ['render', q],
    ['__scopeId', 'data-v-2fe1d274'],
  ]),
  x = A(U),
  F = ['xlink:href'],
  G = N({
    name: 'VerIcon',
    inheritAttrs: !1,
    __name: 'index',
    props: {
      name: { default: '' },
      size: { default: 14 },
      color: { default: '' },
    },
    setup(c) {
      const t = c,
        s = t.size + 'px',
        u = V(() => `#icon-${t.name}`)
      return (h, o) => (
        g(),
        S(
          'svg',
          {
            class: 'ver-icon',
            'aria-hidden': 'true',
            style: B({ width: s, height: s, color: t.color }),
          },
          [C('use', { 'xlink:href': u.value }, null, 8, F)],
          4,
        )
      )
    },
  }),
  J = R(G, [['__scopeId', 'data-v-66a99963']]),
  b = A(J),
  K = N({
    name: 'VerTooltip',
    __name: 'index',
    props: {
      content: {},
      position: { default: 'top' },
      color: { default: '#fff' },
      backgroundColor: { default: '#333' },
    },
    setup(c) {
      const t = c,
        s = _(null),
        u = _(null),
        h = _(!1),
        o = () => {
          if (!s.value || !u.value) return
          const e = s.value.getBoundingClientRect(),
            n = u.value,
            a = {
              top: {
                top: -n.offsetHeight - 8,
                left: (e.width - n.offsetWidth) / 2,
              },
              'top-left': { top: -n.offsetHeight - 8, left: 0 },
              'top-right': {
                top: -n.offsetHeight - 8,
                left: e.width - n.offsetWidth,
              },
              bottom: {
                top: e.height + 8,
                left: (e.width - n.offsetWidth) / 2,
              },
              'bottom-left': { top: e.height + 8, left: 0 },
              'bottom-right': {
                top: e.height + 8,
                left: e.width - n.offsetWidth,
              },
              left: {
                top: (e.height - n.offsetHeight) / 2,
                left: -n.offsetWidth - 8,
              },
              'left-top': { top: 0, left: -n.offsetWidth - 8 },
              'left-bottom': {
                top: e.height - n.offsetHeight,
                left: -n.offsetWidth - 8,
              },
              right: {
                top: (e.height - n.offsetHeight) / 2,
                left: e.width + 8,
              },
              'right-top': { top: 0, left: e.width + 8 },
              'right-bottom': {
                top: e.height - n.offsetHeight,
                left: e.width + 8,
              },
            }[t.position]
          ;(n.style.top = `${a.top}px`), (n.style.left = `${a.left}px`)
        }
      return (
        O(() => {
          window.addEventListener('resize', o)
        }),
        k(() => {
          window.removeEventListener('resize', o)
        }),
        (e, n) => (
          g(),
          S(
            'div',
            {
              ref_key: 'tooltipRef',
              ref: s,
              class: 'tooltip',
              onMouseenter: n[0] || (n[0] = (a) => (h.value = !0)),
              onMouseleave: n[1] || (n[1] = (a) => (h.value = !1)),
            },
            [
              z(e.$slots, 'default', {}, void 0, !0),
              d(
                X,
                { name: 'tooltip', onEnter: o },
                {
                  default: f(() => [
                    D(
                      C(
                        'div',
                        {
                          ref_key: 'contentRef',
                          ref: u,
                          class: $(['tooltip-content', e.position]),
                          style: B({
                            color: e.color,
                            backgroundColor: e.backgroundColor,
                            '--bg-color': e.backgroundColor,
                          }),
                        },
                        L(e.content),
                        7,
                      ),
                      [[j, h.value]],
                    ),
                  ]),
                  _: 1,
                },
              ),
            ],
            544,
          )
        )
      )
    },
  }),
  Y = R(K, [['__scopeId', 'data-v-e277616a']]),
  T = A(Y)
class Q {
  constructor() {
    ;(this.observers = []), (this.state = {})
  }
  attach(t) {
    this.observers.includes(t) || this.observers.push(t)
  }
  detach(t) {
    const s = this.observers.indexOf(t)
    s > -1 && this.observers.splice(s, 1)
  }
  notify() {
    this.observers.forEach((t) => t.update(this))
  }
  actions(t) {
    Object.assign(this.state, t), this.notify()
  }
  getState() {
    return this.state
  }
}
class ee {
  constructor(t) {
    this.updateFunction = t
  }
  update(t) {
    this.updateFunction(t)
  }
}
const E = new Q(),
  m = {
    attach: (c) => {
      const t = new ee(c)
      return E.attach(t), () => E.detach(t)
    },
    actions: (c) => {
      E.actions(c)
    },
    getState: () => E.getState(),
  },
  te = N({
    __name: 'index',
    setup(c) {
      const t = _(null),
        s = (o) => {
          const e = o.getState()
          t.value = e.editorRef
        },
        u = m.attach(s),
        h = () => {
          if (t.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const e = o.getRangeAt(0)
              let n = e.commonAncestorContainer
              if (
                (n.nodeType === Node.TEXT_NODE && (n = n.parentNode),
                t.value.contains(n))
              ) {
                const a = e.toString()
                if (a.startsWith('**') && a.endsWith('**')) {
                  const l = a.slice(2, -2)
                  e.deleteContents(), e.insertNode(document.createTextNode(l))
                } else {
                  const l = `**${a}**`
                  e.deleteContents()
                  const r = document.createTextNode(l)
                  e.insertNode(r)
                }
                o.removeAllRanges(), o.addRange(e)
              }
            }
          }
          t.value && m.actions({ editorRef: t.value })
        }
      return (
        k(() => {
          u()
        }),
        (o, e) => (
          g(),
          w(
            i(T),
            { position: 'top', content: '文字加粗' },
            {
              default: f(() => [
                d(
                  i(x),
                  { onClick: h },
                  { default: f(() => [d(i(b), { name: 'bold' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  oe = N({
    __name: 'index',
    setup(c) {
      const t = _(null),
        s = (o) => {
          const e = o.getState()
          t.value = e.editorRef
        },
        u = m.attach(s)
      k(() => {
        u()
      })
      const h = () => {
        if (t.value) {
          const o = window.getSelection()
          if (o && o.rangeCount > 0) {
            const e = o.getRangeAt(0)
            let n = e.commonAncestorContainer
            if (
              (n.nodeType === Node.TEXT_NODE && (n = n.parentNode),
              t.value.contains(n))
            ) {
              const a = e.toString()
              if (a.startsWith('*') && a.endsWith('*')) {
                const l = a.slice(2, -2)
                e.deleteContents(), e.insertNode(document.createTextNode(l))
              } else {
                const l = `*${a}*`
                e.deleteContents()
                const r = document.createTextNode(l)
                e.insertNode(r)
              }
              o.removeAllRanges(), o.addRange(e)
            }
          }
        }
        t.value && m.actions({ editorRef: t.value })
      }
      return (o, e) => (
        g(),
        w(
          i(T),
          { content: '文字倾斜' },
          {
            default: f(() => [
              d(
                i(x),
                { onClick: h },
                { default: f(() => [d(i(b), { name: 'italic' })]), _: 1 },
              ),
            ]),
            _: 1,
          },
        )
      )
    },
  }),
  ne = N({
    __name: 'index',
    setup(c) {
      const t = _(null),
        s = (o) => {
          const e = o.getState()
          t.value = e.editorRef
        },
        u = m.attach(s),
        h = () => {
          if (t.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const e = o.getRangeAt(0)
              let n = e.commonAncestorContainer
              if (
                (n.nodeType === Node.TEXT_NODE && (n = n.parentNode),
                t.value.contains(n))
              ) {
                const a = e.toString()
                if (a.startsWith('~~') && a.endsWith('~~')) {
                  const l = a.slice(2, -2)
                  e.deleteContents(), e.insertNode(document.createTextNode(l))
                } else {
                  const l = `~~${a}~~`
                  e.deleteContents()
                  const r = document.createTextNode(l)
                  e.insertNode(r)
                }
                o.removeAllRanges(), o.addRange(e)
              }
            }
          }
          t.value && m.actions({ editorRef: t.value })
        }
      return (
        k(() => {
          u()
        }),
        (o, e) => (
          g(),
          w(
            i(T),
            { content: '文字删除线' },
            {
              default: f(() => [
                d(
                  i(x),
                  { onClick: h },
                  {
                    default: f(() => [d(i(b), { name: 'strikethrough' })]),
                    _: 1,
                  },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  se = N({
    __name: 'index',
    setup(c) {
      const t = _(null),
        s = (o) => {
          const e = o.getState()
          t.value = e.editorRef
        },
        u = m.attach(s),
        h = () => {
          if (t.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const e = o.getRangeAt(0)
              let n = e.commonAncestorContainer
              if (
                (n.nodeType === Node.TEXT_NODE && (n = n.parentNode),
                t.value.contains(n))
              ) {
                const a = e.toString().trim()
                if (/^\d+\.\s/.test(a)) {
                  const l = a.replace(/^\d+\.\s/, '').trim()
                  e.deleteContents(), e.insertNode(document.createTextNode(l))
                } else {
                  const l = `1. ${a}`
                  e.deleteContents()
                  const r = document.createTextNode(l)
                  e.insertNode(r)
                }
                o.removeAllRanges(), o.addRange(e)
              }
            }
          }
          t.value && m.actions({ editorRef: t.value })
        }
      return (
        k(() => {
          u()
        }),
        (o, e) => (
          g(),
          w(
            i(T),
            { content: '有序列表' },
            {
              default: f(() => [
                d(
                  i(x),
                  { onClick: h },
                  { default: f(() => [d(i(b), { name: 'orderlist' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  ae = N({
    __name: 'index',
    setup(c) {
      const t = _(null),
        s = (o) => {
          const e = o.getState()
          t.value = e.editorRef
        },
        u = m.attach(s),
        h = () => {
          if (t.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const e = o.getRangeAt(0)
              let n = e.commonAncestorContainer
              if (
                (n.nodeType === Node.TEXT_NODE && (n = n.parentNode),
                t.value.contains(n))
              ) {
                const a = e.toString().trim()
                if (/^\s*- \s/.test(a)) {
                  const l = a.replace(/^\s*- \s/, '').trim()
                  e.deleteContents(), e.insertNode(document.createTextNode(l))
                } else {
                  const l = `- ${a}`
                  e.deleteContents()
                  const r = document.createTextNode(l)
                  e.insertNode(r)
                }
                o.removeAllRanges(), o.addRange(e)
              }
            }
          }
          t.value && m.actions({ editorRef: t.value })
        }
      return (
        k(() => {
          u()
        }),
        (o, e) => (
          g(),
          w(
            i(T),
            { content: '无序列表' },
            {
              default: f(() => [
                d(
                  i(x),
                  { onClick: h },
                  {
                    default: f(() => [d(i(b), { name: 'unorderlist' })]),
                    _: 1,
                  },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  ie = N({
    __name: 'index',
    setup(c) {
      const t = _(null),
        s = (o) => {
          const e = o.getState()
          t.value = e.editorRef
        },
        u = m.attach(s),
        h = () => {
          if (t.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const e = o.getRangeAt(0)
              let n = e.commonAncestorContainer
              if (
                (n.nodeType === Node.TEXT_NODE && (n = n.parentNode),
                t.value.contains(n))
              ) {
                const a = e.toString().trim()
                if (
                  a.startsWith('> ') &&
                  a.endsWith(`
`)
                ) {
                  const l = a.slice(2, -1)
                  e.deleteContents(), e.insertNode(document.createTextNode(l))
                } else {
                  const l = `> ${a}
`
                  e.deleteContents()
                  const r = document.createTextNode(l)
                  e.insertNode(r)
                }
                o.removeAllRanges(), o.addRange(e)
              }
            }
          }
          t.value && m.actions({ editorRef: t.value })
        }
      return (
        k(() => {
          u()
        }),
        (o, e) => (
          g(),
          w(
            i(T),
            { position: 'top', content: '引用' },
            {
              default: f(() => [
                d(
                  i(x),
                  { onClick: h },
                  { default: f(() => [d(i(b), { name: 'quote' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  le = N({
    __name: 'index',
    setup(c) {
      const t = _(null),
        s = (o) => {
          const e = o.getState()
          t.value = e.editorRef
        },
        u = m.attach(s),
        h = () => {
          if (t.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const e = o.getRangeAt(0)
              let n = e.commonAncestorContainer
              if (
                (n.nodeType === Node.TEXT_NODE && (n = n.parentNode),
                t.value.contains(n))
              ) {
                const a = e.toString(),
                  l = a.startsWith('`') && a.endsWith('`'),
                  r = a.startsWith('``') && a.endsWith('``')
                if (l) {
                  const v = a.slice(1, -1)
                  e.deleteContents(), e.insertNode(document.createTextNode(v))
                } else if (r) {
                  const v = a.slice(2, -2)
                  e.deleteContents(), e.insertNode(document.createTextNode(v))
                } else {
                  const v =
                      a.includes(`
`) || a.includes('\r')
                        ? '``'
                        : '`',
                    y = `${v}${a}${v}`
                  e.deleteContents()
                  const p = document.createTextNode(y)
                  e.insertNode(p)
                }
                o.removeAllRanges(), o.addRange(e)
              }
            }
          }
          t.value && m.actions({ editorRef: t.value })
        }
      return (
        k(() => {
          u()
        }),
        (o, e) => (
          g(),
          w(
            i(T),
            { content: '代码块' },
            {
              default: f(() => [
                d(
                  i(x),
                  { onClick: h },
                  { default: f(() => [d(i(b), { name: 'code' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  re = N({
    __name: 'index',
    setup(c) {
      const t = _(null),
        s = (o) => {
          const e = o.getState()
          t.value = e.editorRef
        },
        u = m.attach(s),
        h = () => {
          if (t.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const e = o.getRangeAt(0)
              let n = e.commonAncestorContainer
              if (
                (n.nodeType === Node.TEXT_NODE && (n = n.parentNode),
                t.value.contains(n))
              ) {
                const a = e.toString(),
                  l = `[${a}](url)`
                e.deleteContents()
                const r = document.createTextNode(l)
                e.insertNode(r)
                const v = document.createRange()
                v.setStart(r, a.length + 3),
                  v.setEnd(r, a.length + 6),
                  o.removeAllRanges(),
                  o.addRange(v)
              }
            }
          }
          t.value && m.actions({ editorRef: t.value })
        }
      return (
        k(() => {
          u()
        }),
        (o, e) => (
          g(),
          w(
            i(T),
            { content: '插入链接' },
            {
              default: f(() => [
                d(
                  i(x),
                  { onClick: h },
                  { default: f(() => [d(i(b), { name: 'link' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  de = N({
    __name: 'index',
    setup(c) {
      return (t, s) => (
        g(),
        w(
          i(T),
          { content: '插入图片' },
          {
            default: f(() => [
              d(i(x), null, {
                default: f(() => [d(i(b), { name: 'image' })]),
                _: 1,
              }),
            ]),
            _: 1,
          },
        )
      )
    },
  }),
  ce = N({
    __name: 'index',
    setup(c) {
      const t = _(null),
        s = (o) => {
          const e = o.getState()
          t.value = e.editorRef
        },
        u = m.attach(s),
        h = () => {
          if (t.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const e = o.getRangeAt(0)
              let n = e.commonAncestorContainer
              if (
                (n.nodeType === Node.TEXT_NODE && (n = n.parentNode),
                t.value.contains(n))
              ) {
                e.deleteContents()
                const a = document.createTextNode('| 标题 |  |'),
                  l = document.createElement('br'),
                  r = document.createTextNode('| --- | --- |'),
                  v = document.createElement('br'),
                  y = document.createTextNode('|  |  |')
                e.insertNode(y),
                  e.insertNode(v),
                  e.insertNode(r),
                  e.insertNode(l),
                  e.insertNode(a)
                const p = document.createRange()
                p.setStart(a, 2),
                  p.setEnd(a, 4),
                  o.removeAllRanges(),
                  o.addRange(p)
              }
            }
          }
          t.value && m.actions({ editorRef: t.value })
        }
      return (
        k(() => {
          u()
        }),
        (o, e) => (
          g(),
          w(
            i(T),
            { content: '插入表格' },
            {
              default: f(() => [
                d(
                  i(x),
                  { onClick: h },
                  { default: f(() => [d(i(b), { name: 'table' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  ue = N({
    __name: 'index',
    setup(c) {
      const t = _(null),
        s = (o) => {
          const e = o.getState()
          t.value = e.editorRef
        },
        u = m.attach(s),
        h = () => {
          if (t.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const e = o.getRangeAt(0)
              let n = e.commonAncestorContainer
              if (
                (n.nodeType === Node.TEXT_NODE && (n = n.parentNode),
                t.value.contains(n))
              ) {
                const a = e.toString().trim(),
                  l = a.startsWith('`') && a.endsWith('`'),
                  r = a.startsWith('``') && a.endsWith('``'),
                  v = a.match(/^#+/),
                  y = v ? v[0] : ''
                if (l) {
                  const p = a.slice(1, -1)
                  e.deleteContents(), e.insertNode(document.createTextNode(p))
                } else if (r) {
                  const p = a.slice(2, -2)
                  e.deleteContents(), e.insertNode(document.createTextNode(p))
                } else if (y) {
                  const p = a.slice(y.length).trim()
                  e.deleteContents(), e.insertNode(document.createTextNode(p))
                } else {
                  const p = `# ${a}`
                  e.deleteContents()
                  const M = document.createTextNode(p)
                  e.insertNode(M)
                }
                o.removeAllRanges(), o.addRange(e)
              }
            }
          }
          t.value && m.actions({ editorRef: t.value })
        }
      return (
        k(() => {
          u()
        }),
        (o, e) => (
          g(),
          w(
            i(T),
            { content: '一级标题' },
            {
              default: f(() => [
                d(
                  i(x),
                  { onClick: h },
                  { default: f(() => [d(i(b), { name: 'h1' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  he = N({
    __name: 'index',
    setup(c) {
      const t = _(null),
        s = (o) => {
          const e = o.getState()
          t.value = e.editorRef
        },
        u = m.attach(s),
        h = () => {
          if (t.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const e = o.getRangeAt(0)
              let n = e.commonAncestorContainer
              if (
                (n.nodeType === Node.TEXT_NODE && (n = n.parentNode),
                t.value.contains(n))
              ) {
                const a = e.toString().trim()
                if (a.startsWith('## ')) {
                  const l = a.replace(/^## /, '').trim()
                  e.deleteContents(), e.insertNode(document.createTextNode(l))
                } else {
                  const l = `## ${a}`
                  e.deleteContents()
                  const r = document.createTextNode(l)
                  e.insertNode(r)
                }
                o.removeAllRanges(), o.addRange(e)
              }
            }
          }
          t.value && m.actions({ editorRef: t.value })
        }
      return (
        k(() => {
          u()
        }),
        (o, e) => (
          g(),
          w(
            i(T),
            { content: '二级标题' },
            {
              default: f(() => [
                d(
                  i(x),
                  { onClick: h },
                  { default: f(() => [d(i(b), { name: 'h2' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  fe = N({
    __name: 'index',
    setup(c) {
      const t = _(null),
        s = (o) => {
          const e = o.getState()
          t.value = e.editorRef
        },
        u = m.attach(s),
        h = () => {
          if (t.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const e = o.getRangeAt(0)
              let n = e.commonAncestorContainer
              if (
                (n.nodeType === Node.TEXT_NODE && (n = n.parentNode),
                t.value.contains(n))
              ) {
                const a = e.toString().trim()
                if (a.startsWith('### ')) {
                  const l = a.replace(/^### /, '').trim()
                  e.deleteContents(), e.insertNode(document.createTextNode(l))
                } else {
                  const l = `### ${a}`
                  e.deleteContents()
                  const r = document.createTextNode(l)
                  e.insertNode(r)
                }
                o.removeAllRanges(), o.addRange(e)
              }
            }
          }
          t.value && m.actions({ editorRef: t.value })
        }
      return (
        k(() => {
          u()
        }),
        (o, e) => (
          g(),
          w(
            i(T),
            { content: '三级标题' },
            {
              default: f(() => [
                d(
                  i(x),
                  { onClick: h },
                  { default: f(() => [d(i(b), { name: 'h3' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  me = { class: 'toolbar' },
  ve = { class: 'toolbar-group' },
  pe = { class: 'toolbar-group' },
  ge = { class: 'toolbar-group' },
  _e = { class: 'toolbar-group' },
  Ne = N({
    __name: 'index',
    setup(c) {
      return (t, s) => (
        g(),
        S('div', me, [
          C('div', ve, [d(i(ue)), d(i(he)), d(i(fe))]),
          C('div', pe, [d(i(te)), d(i(oe)), d(i(ne))]),
          C('div', ge, [d(i(ae)), d(i(se)), d(i(ie)), d(i(le))]),
          C('div', _e, [d(i(re)), d(i(de)), d(i(ce))]),
        ])
      )
    },
  }),
  Ce = R(Ne, [['__scopeId', 'data-v-9bc1417d']])
class ke {
  constructor(t, s = {}) {
    ;(this.historyStack = []),
      (this.redoStack = []),
      (this.editor = t),
      (this.options = { maxHistory: 50, ...s }),
      this.init()
  }
  init() {
    if (!this.editor) {
      console.error('Editor element is not valid.')
      return
    }
    this.editor.addEventListener('input', () => this.onInput())
  }
  saveState() {
    let t = ''
    return (
      this.editor instanceof HTMLTextAreaElement
        ? (t = this.editor.value || '')
        : this.editor instanceof HTMLElement &&
          this.editor.isContentEditable &&
          (t = this.editor.innerHTML || ''),
      { content: t }
    )
  }
  restoreState(t) {
    this.editor instanceof HTMLTextAreaElement
      ? (this.editor.value = t.content)
      : this.editor instanceof HTMLElement &&
        this.editor.isContentEditable &&
        (this.editor.innerHTML = t.content)
  }
  onInput() {
    const t = this.saveState()
    this.historyStack.push(t),
      (this.redoStack = []),
      this.historyStack.length > (this.options.maxHistory ?? 50) &&
        this.historyStack.shift()
  }
  undo() {
    if (this.historyStack.length > 1) {
      const t = this.historyStack.pop()
      this.redoStack.push(t)
      const s = this.historyStack[this.historyStack.length - 1]
      this.restoreState(s)
    }
  }
  redo() {
    if (this.redoStack.length > 0) {
      const t = this.redoStack.pop()
      this.historyStack.push(t), this.restoreState(t)
    }
  }
}
const we = { class: 'status-bar' },
  xe = N({
    __name: 'index',
    props: { value: { default: '' } },
    emits: ['update:value'],
    setup(c, { emit: t }) {
      const s = _(null),
        u = _(1),
        h = _(1),
        o = t,
        e = () => {
          const r = window.getSelection()
          if (!r || !r.focusNode || !s.value) return
          let v = r.focusNode,
            y = r.focusOffset
          h.value = y + 1
          let p = s.value.firstChild,
            M = 1
          for (; p && p !== v; ) {
            if (p.nodeType === Node.ELEMENT_NODE) {
              const H = p
              ;(H.tagName.toLowerCase() === 'p' ||
                H.tagName.toLowerCase() === 'div' ||
                H.tagName.toLowerCase() === 'br') &&
                M++
            }
            p = p.nextSibling
          }
          u.value = M
        },
        n = () => {
          var r
          const v = ((r = s.value) == null ? void 0 : r.textContent) || ''
          console.log(s.value.innerText), o('update:value', v)
        },
        a = m.attach(n),
        l = _(null)
      return (
        O(() => {
          s.value &&
            (m.actions({ editorRef: s.value }),
            (l.value = new ke(s.value)),
            document.addEventListener('selectionchange', e),
            s.value.addEventListener('input', n),
            document.addEventListener('keydown', (r) => {
              var v, y
              r.ctrlKey &&
                (r.key === 'z'
                  ? (r.preventDefault(), (v = l.value) == null || v.undo())
                  : r.key === 'y' &&
                    (r.preventDefault(), (y = l.value) == null || y.redo()))
            }))
        }),
        I(() => {
          var r
          document.removeEventListener('selectionchange', e),
            (r = s.value) == null || r.removeEventListener('input', n),
            a()
        }),
        (r, v) => (
          g(),
          S('div', null, [
            C(
              'div',
              {
                class: 'editor',
                contenteditable: 'plaintext-only',
                ref_key: 'editorRef',
                ref: s,
              },
              null,
              512,
            ),
            C('div', we, [
              C('div', null, '行: ' + L(u.value) + ', 列: ' + L(h.value), 1),
            ]),
          ])
        )
      )
    },
  }),
  be = R(xe, [['__scopeId', 'data-v-d897f9a3']]),
  Te = { class: 'rich-text-editor' },
  ye = N({
    name: 'VerRichEditor',
    __name: 'index',
    props: { value: { default: '' } },
    emits: ['update:value'],
    setup(c, { emit: t }) {
      const s = t,
        u = (h) => {
          s('update:value', h)
        }
      return (h, o) => (
        g(),
        S('div', null, [
          C('div', Te, [
            d(Ce),
            d(be, { value: h.value, 'onUpdate:value': u }, null, 8, ['value']),
          ]),
        ])
      )
    },
  }),
  Se = R(ye, [['__scopeId', 'data-v-a610f2e5']]),
  Re = A(Se)
if (typeof window < 'u') {
  let c = function () {
    var t = document.body,
      s = document.getElementById('__svg__icons__dom__')
    s ||
      ((s = document.createElementNS('http://www.w3.org/2000/svg', 'svg')),
      (s.style.position = 'absolute'),
      (s.style.width = '0'),
      (s.style.height = '0'),
      (s.id = '__svg__icons__dom__'),
      s.setAttribute('xmlns', 'http://www.w3.org/2000/svg'),
      s.setAttribute('xmlns:link', 'http://www.w3.org/1999/xlink')),
      (s.innerHTML =
        '<symbol viewBox="0 0 48 48" fill="none"  id="icon-bold"><path clip-rule="evenodd" d="M24 24c5.506 0 9.969-4.477 9.969-10S29.506 4 24 4H11v20h13ZM28.031 44C33.537 44 38 39.523 38 34s-4.463-10-9.969-10H11v20h17.031Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></symbol><symbol viewBox="0 0 48 48" fill="none"  id="icon-code"><path d="M16 13 4 25.432 16 37M32 13l12 12.432L32 37" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="m28 4-7 40" stroke="#333" stroke-width="4" stroke-linecap="round" /></symbol><symbol viewBox="0 0 48 48" fill="none"  id="icon-h1"><path d="M6 8v32M25 8v32M6 24h19M34.226 24 39 19.017V40" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></symbol><symbol viewBox="0 0 48 48" fill="none"  id="icon-h2"><path d="M6 8v32M24 8v32M7 24h16M32 25c0-3.167 2.667-5 5-5s5 1.833 5 5c0 5.7-10 9.933-10 15h10" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></symbol><symbol viewBox="0 0 48 48" fill="none"  id="icon-h3"><path d="M6 8v32M24 8v32M7 24h16M32 20h10l-7 9c4 0 7 2 7 6s-3 5-5 5c-2.381 0-4-1-5-2.1" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></symbol><symbol  fill="currentColor" class="bi bi-card-image" viewBox="0 0 16 16" id="icon-image"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /><path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" /></symbol><symbol viewBox="0 0 48 48" fill="none"  id="icon-italic"><path d="M20 6h16M12 42h16M29 5.952 19 42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></symbol><symbol viewBox="0 0 48 48" fill="none"  id="icon-link"><path d="M24.707 9.565 9.858 24.415a9 9 0 0 0 0 12.727v0a9 9 0 0 0 12.728 0l17.678-17.677a6 6 0 0 0 0-8.486v0a6 6 0 0 0-8.486 0L14.101 28.657a3 3 0 0 0 0 4.243v0a3 3 0 0 0 4.242 0l14.85-14.85" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></symbol><symbol viewBox="0 0 48 48" fill="none"  id="icon-orderlist"><path d="M9 4v9M12 13H6M12 27H6M6 20s3-3 5 0-5 7-5 7M6 34.5s2-3 5-1 0 4.5 0 4.5 3 2.5 0 4.5-5-1-5-1M11 38H9M9 4 6 6M21 24h22M21 38h22M21 10h22" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></symbol><symbol  fill="currentColor" class="bi bi-quote" viewBox="0 0 16 16" id="icon-quote"><path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" /></symbol><symbol  fill="currentColor" class="bi bi-type-strikethrough" viewBox="0 0 16 16" id="icon-strikethrough"><path d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z" /></symbol><symbol  fill="currentColor" class="bi bi-table" viewBox="0 0 16 16" id="icon-table"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" /></symbol><symbol viewBox="0 0 48 48" fill="none"  id="icon-unorderlist"><path d="M8 18v9M11 27H5M11 12H5M5 5s3-3 5 0-5 7-5 7M5 34.5s2-3 5-1 0 4.5 0 4.5 3 2.5 0 4.5-5-1-5-1M10 38H8M8 18l-3 2M20 24h22M20 38h22M20 10h22" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></symbol>'),
      t.insertBefore(s, t.lastChild)
  }
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', c)
    : c()
}
const Ae = JSON.parse(
    '{"title":"编辑器输入组件","description":"","frontmatter":{},"headers":[],"relativePath":"examples.md","filePath":"examples.md"}',
  ),
  Me = { name: 'examples.md' },
  He = Object.assign(Me, {
    setup(c) {
      return (t, s) => (
        g(),
        S('div', null, [
          s[0] ||
            (s[0] = C(
              'h1',
              { id: '编辑器输入组件', tabindex: '-1' },
              [
                W('编辑器输入组件 '),
                C(
                  'a',
                  {
                    class: 'header-anchor',
                    href: '#编辑器输入组件',
                    'aria-label': 'Permalink to "编辑器输入组件"',
                  },
                  '​',
                ),
              ],
              -1,
            )),
          s[1] ||
            (s[1] = C(
              'h2',
              {
                id: '这是一个带有-markdown-编辑器输入组件的示例',
                tabindex: '-1',
              },
              [
                W('这是一个带有 Markdown 编辑器输入组件的示例 '),
                C(
                  'a',
                  {
                    class: 'header-anchor',
                    href: '#这是一个带有-markdown-编辑器输入组件的示例',
                    'aria-label':
                      'Permalink to "这是一个带有 Markdown 编辑器输入组件的示例"',
                  },
                  '​',
                ),
              ],
              -1,
            )),
          d(i(Re)),
        ])
      )
    },
  })
export { Ae as __pageData, He as default }
