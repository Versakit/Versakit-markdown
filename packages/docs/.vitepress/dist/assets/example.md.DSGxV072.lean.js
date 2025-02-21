import {
  o as y,
  c as A,
  r as j,
  d as _,
  h as U,
  j as x,
  N as X,
  p as k,
  v as V,
  Y as N,
  G as h,
  w as v,
  a0 as Z,
  n as F,
  t as D,
  a1 as G,
  T as J,
  k as u,
  x as q,
  b,
  q as K,
  _ as Y,
  a as I,
} from './chunks/framework.dB56A39y.js'
const B = (s, e) => (
    (s.install = (n) => {
      for (const a of [s, ...Object.values({})]) n.component(a.name, a)
    }),
    s
  ),
  $ = (s, e) => {
    const n = s.__vccOpts || s
    for (const [a, l] of e) n[a] = l
    return n
  },
  Q = {},
  ee = { class: 'ver-code' }
function te(s, e) {
  return y(), A('div', ee, [j(s.$slots, 'default', {}, void 0, !0)])
}
const ne = $(Q, [
    ['render', te],
    ['__scopeId', 'data-v-2fe1d274'],
  ]),
  T = B(ne),
  oe = ['xlink:href'],
  re = _({
    name: 'VerIcon',
    inheritAttrs: !1,
    __name: 'index',
    props: {
      name: { default: '' },
      size: { default: 14 },
      color: { default: '' },
    },
    setup(s) {
      const e = s,
        n = e.size + 'px',
        a = U(() => `#icon-${e.name}`)
      return (l, o) => (
        y(),
        A(
          'svg',
          {
            class: 'ver-icon',
            'aria-hidden': 'true',
            style: X({ width: n, height: n, color: e.color }),
          },
          [x('use', { 'xlink:href': a.value }, null, 8, oe)],
          4,
        )
      )
    },
  }),
  ae = $(re, [['__scopeId', 'data-v-66a99963']]),
  R = B(ae),
  ie = _({
    name: 'VerTooltip',
    __name: 'index',
    props: {
      content: {},
      position: { default: 'top' },
      color: { default: '#fff' },
      backgroundColor: { default: '#333' },
    },
    setup(s) {
      const e = s,
        n = k(null),
        a = k(null),
        l = k(!1),
        o = () => {
          if (!n.value || !a.value) return
          const t = n.value.getBoundingClientRect(),
            r = a.value,
            i = {
              top: {
                top: -r.offsetHeight - 8,
                left: (t.width - r.offsetWidth) / 2,
              },
              'top-left': { top: -r.offsetHeight - 8, left: 0 },
              'top-right': {
                top: -r.offsetHeight - 8,
                left: t.width - r.offsetWidth,
              },
              bottom: {
                top: t.height + 8,
                left: (t.width - r.offsetWidth) / 2,
              },
              'bottom-left': { top: t.height + 8, left: 0 },
              'bottom-right': {
                top: t.height + 8,
                left: t.width - r.offsetWidth,
              },
              left: {
                top: (t.height - r.offsetHeight) / 2,
                left: -r.offsetWidth - 8,
              },
              'left-top': { top: 0, left: -r.offsetWidth - 8 },
              'left-bottom': {
                top: t.height - r.offsetHeight,
                left: -r.offsetWidth - 8,
              },
              right: {
                top: (t.height - r.offsetHeight) / 2,
                left: t.width + 8,
              },
              'right-top': { top: 0, left: t.width + 8 },
              'right-bottom': {
                top: t.height - r.offsetHeight,
                left: t.width + 8,
              },
            }[e.position]
          ;(r.style.top = `${i.top}px`), (r.style.left = `${i.left}px`)
        }
      return (
        V(() => {
          window.addEventListener('resize', o)
        }),
        N(() => {
          window.removeEventListener('resize', o)
        }),
        (t, r) => (
          y(),
          A(
            'div',
            {
              ref_key: 'tooltipRef',
              ref: n,
              class: 'tooltip',
              onMouseenter: r[0] || (r[0] = (i) => (l.value = !0)),
              onMouseleave: r[1] || (r[1] = (i) => (l.value = !1)),
            },
            [
              j(t.$slots, 'default', {}, void 0, !0),
              h(
                J,
                { name: 'tooltip', onEnter: o },
                {
                  default: v(() => [
                    Z(
                      x(
                        'div',
                        {
                          ref_key: 'contentRef',
                          ref: a,
                          class: F(['tooltip-content', t.position]),
                          style: X({
                            color: t.color,
                            backgroundColor: t.backgroundColor,
                            '--bg-color': t.backgroundColor,
                          }),
                        },
                        D(t.content),
                        7,
                      ),
                      [[G, l.value]],
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
  se = $(ie, [['__scopeId', 'data-v-e277616a']]),
  S = B(se)
class le {
  constructor() {
    ;(this.observers = []), (this.state = {})
  }
  attach(e) {
    this.observers.includes(e) || this.observers.push(e)
  }
  detach(e) {
    const n = this.observers.indexOf(e)
    n > -1 && this.observers.splice(n, 1)
  }
  notify() {
    this.observers.forEach((e) => e.update(this))
  }
  actions(e) {
    Object.assign(this.state, e), this.notify()
  }
  getState() {
    return this.state
  }
}
class ce {
  constructor(e) {
    this.updateFunction = e
  }
  update(e) {
    this.updateFunction(e)
  }
}
const W = new le(),
  p = {
    attach: (s) => {
      const e = new ce(s)
      return W.attach(e), () => W.detach(e)
    },
    actions: (s) => {
      W.actions(s)
    },
    getState: () => W.getState(),
  },
  de = _({
    __name: 'index',
    setup(s) {
      const e = k(null),
        n = (o) => {
          const t = o.getState()
          e.value = t.editorRef
        },
        a = p.attach(n),
        l = () => {
          if (e.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const t = o.getRangeAt(0)
              let r = t.commonAncestorContainer
              if (
                (r.nodeType === Node.TEXT_NODE && (r = r.parentNode),
                e.value.contains(r))
              ) {
                const i = t.toString()
                if (i.startsWith('**') && i.endsWith('**')) {
                  const c = i.slice(2, -2)
                  t.deleteContents(), t.insertNode(document.createTextNode(c))
                } else {
                  const c = `**${i}**`
                  t.deleteContents()
                  const d = document.createTextNode(c)
                  t.insertNode(d)
                }
                o.removeAllRanges(), o.addRange(t)
              }
            }
          }
          e.value && p.actions({ editorRef: e.value })
        }
      return (
        N(() => {
          a()
        }),
        (o, t) => (
          y(),
          b(
            u(S),
            { position: 'top', content: '文字加粗' },
            {
              default: v(() => [
                h(
                  u(T),
                  { onClick: l },
                  { default: v(() => [h(u(R), { name: 'bold' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  ue = _({
    __name: 'index',
    setup(s) {
      const e = k(null),
        n = (o) => {
          const t = o.getState()
          e.value = t.editorRef
        },
        a = p.attach(n)
      N(() => {
        a()
      })
      const l = () => {
        if (e.value) {
          const o = window.getSelection()
          if (o && o.rangeCount > 0) {
            const t = o.getRangeAt(0)
            let r = t.commonAncestorContainer
            if (
              (r.nodeType === Node.TEXT_NODE && (r = r.parentNode),
              e.value.contains(r))
            ) {
              const i = t.toString()
              if (i.startsWith('*') && i.endsWith('*')) {
                const c = i.slice(2, -2)
                t.deleteContents(), t.insertNode(document.createTextNode(c))
              } else {
                const c = `*${i}*`
                t.deleteContents()
                const d = document.createTextNode(c)
                t.insertNode(d)
              }
              o.removeAllRanges(), o.addRange(t)
            }
          }
        }
        e.value && p.actions({ editorRef: e.value })
      }
      return (o, t) => (
        y(),
        b(
          u(S),
          { content: '文字倾斜' },
          {
            default: v(() => [
              h(
                u(T),
                { onClick: l },
                { default: v(() => [h(u(R), { name: 'italic' })]), _: 1 },
              ),
            ]),
            _: 1,
          },
        )
      )
    },
  }),
  he = _({
    __name: 'index',
    setup(s) {
      const e = k(null),
        n = (o) => {
          const t = o.getState()
          e.value = t.editorRef
        },
        a = p.attach(n),
        l = () => {
          if (e.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const t = o.getRangeAt(0)
              let r = t.commonAncestorContainer
              if (
                (r.nodeType === Node.TEXT_NODE && (r = r.parentNode),
                e.value.contains(r))
              ) {
                const i = t.toString()
                if (i.startsWith('~~') && i.endsWith('~~')) {
                  const c = i.slice(2, -2)
                  t.deleteContents(), t.insertNode(document.createTextNode(c))
                } else {
                  const c = `~~${i}~~`
                  t.deleteContents()
                  const d = document.createTextNode(c)
                  t.insertNode(d)
                }
                o.removeAllRanges(), o.addRange(t)
              }
            }
          }
          e.value && p.actions({ editorRef: e.value })
        }
      return (
        N(() => {
          a()
        }),
        (o, t) => (
          y(),
          b(
            u(S),
            { content: '文字删除线' },
            {
              default: v(() => [
                h(
                  u(T),
                  { onClick: l },
                  {
                    default: v(() => [h(u(R), { name: 'strikethrough' })]),
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
  me = _({
    __name: 'index',
    setup(s) {
      const e = k(null),
        n = (o) => {
          const t = o.getState()
          e.value = t.editorRef
        },
        a = p.attach(n),
        l = () => {
          if (e.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const t = o.getRangeAt(0)
              let r = t.commonAncestorContainer
              if (
                (r.nodeType === Node.TEXT_NODE && (r = r.parentNode),
                e.value.contains(r))
              ) {
                const i = t.toString().trim()
                if (/^\d+\.\s/.test(i)) {
                  const c = i.replace(/^\d+\.\s/, '').trim()
                  t.deleteContents(), t.insertNode(document.createTextNode(c))
                } else {
                  const c = `1. ${i}`
                  t.deleteContents()
                  const d = document.createTextNode(c)
                  t.insertNode(d)
                }
                o.removeAllRanges(), o.addRange(t)
              }
            }
          }
          e.value && p.actions({ editorRef: e.value })
        }
      return (
        N(() => {
          a()
        }),
        (o, t) => (
          y(),
          b(
            u(S),
            { content: '有序列表' },
            {
              default: v(() => [
                h(
                  u(T),
                  { onClick: l },
                  { default: v(() => [h(u(R), { name: 'orderlist' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  fe = _({
    __name: 'index',
    setup(s) {
      const e = k(null),
        n = (o) => {
          const t = o.getState()
          e.value = t.editorRef
        },
        a = p.attach(n),
        l = () => {
          if (e.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const t = o.getRangeAt(0)
              let r = t.commonAncestorContainer
              if (
                (r.nodeType === Node.TEXT_NODE && (r = r.parentNode),
                e.value.contains(r))
              ) {
                const i = t.toString().trim()
                if (/^\s*- \s/.test(i)) {
                  const c = i.replace(/^\s*- \s/, '').trim()
                  t.deleteContents(), t.insertNode(document.createTextNode(c))
                } else {
                  const c = `- ${i}`
                  t.deleteContents()
                  const d = document.createTextNode(c)
                  t.insertNode(d)
                }
                o.removeAllRanges(), o.addRange(t)
              }
            }
          }
          e.value && p.actions({ editorRef: e.value })
        }
      return (
        N(() => {
          a()
        }),
        (o, t) => (
          y(),
          b(
            u(S),
            { content: '无序列表' },
            {
              default: v(() => [
                h(
                  u(T),
                  { onClick: l },
                  {
                    default: v(() => [h(u(R), { name: 'unorderlist' })]),
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
  pe = _({
    __name: 'index',
    setup(s) {
      const e = k(null),
        n = (o) => {
          const t = o.getState()
          e.value = t.editorRef
        },
        a = p.attach(n),
        l = () => {
          if (e.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const t = o.getRangeAt(0)
              let r = t.commonAncestorContainer
              if (
                (r.nodeType === Node.TEXT_NODE && (r = r.parentNode),
                e.value.contains(r))
              ) {
                const i = t.toString().trim()
                if (
                  i.startsWith('> ') &&
                  i.endsWith(`
`)
                ) {
                  const c = i.slice(2, -1)
                  t.deleteContents(), t.insertNode(document.createTextNode(c))
                } else {
                  const c = `> ${i}
`
                  t.deleteContents()
                  const d = document.createTextNode(c)
                  t.insertNode(d)
                }
                o.removeAllRanges(), o.addRange(t)
              }
            }
          }
          e.value && p.actions({ editorRef: e.value })
        }
      return (
        N(() => {
          a()
        }),
        (o, t) => (
          y(),
          b(
            u(S),
            { position: 'top', content: '引用' },
            {
              default: v(() => [
                h(
                  u(T),
                  { onClick: l },
                  { default: v(() => [h(u(R), { name: 'quote' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  ve = _({
    __name: 'index',
    setup(s) {
      const e = k(null),
        n = (o) => {
          const t = o.getState()
          e.value = t.editorRef
        },
        a = p.attach(n),
        l = () => {
          if (e.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const t = o.getRangeAt(0)
              let r = t.commonAncestorContainer
              if (
                (r.nodeType === Node.TEXT_NODE && (r = r.parentNode),
                e.value.contains(r))
              ) {
                const i = t.toString(),
                  c = i.startsWith('`') && i.endsWith('`'),
                  d = i.startsWith('``') && i.endsWith('``')
                if (c) {
                  const m = i.slice(1, -1)
                  t.deleteContents(), t.insertNode(document.createTextNode(m))
                } else if (d) {
                  const m = i.slice(2, -2)
                  t.deleteContents(), t.insertNode(document.createTextNode(m))
                } else {
                  const m =
                      i.includes(`
`) || i.includes('\r')
                        ? '``'
                        : '`',
                    g = `${m}${i}${m}`
                  t.deleteContents()
                  const w = document.createTextNode(g)
                  t.insertNode(w)
                }
                o.removeAllRanges(), o.addRange(t)
              }
            }
          }
          e.value && p.actions({ editorRef: e.value })
        }
      return (
        N(() => {
          a()
        }),
        (o, t) => (
          y(),
          b(
            u(S),
            { content: '代码块' },
            {
              default: v(() => [
                h(
                  u(T),
                  { onClick: l },
                  { default: v(() => [h(u(R), { name: 'code' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  ge = _({
    __name: 'index',
    setup(s) {
      const e = k(null),
        n = (o) => {
          const t = o.getState()
          e.value = t.editorRef
        },
        a = p.attach(n),
        l = () => {
          if (e.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const t = o.getRangeAt(0)
              let r = t.commonAncestorContainer
              if (
                (r.nodeType === Node.TEXT_NODE && (r = r.parentNode),
                e.value.contains(r))
              ) {
                const i = t.toString(),
                  c = `[${i}](url)`
                t.deleteContents()
                const d = document.createTextNode(c)
                t.insertNode(d)
                const m = document.createRange()
                m.setStart(d, i.length + 3),
                  m.setEnd(d, i.length + 6),
                  o.removeAllRanges(),
                  o.addRange(m)
              }
            }
          }
          e.value && p.actions({ editorRef: e.value })
        }
      return (
        N(() => {
          a()
        }),
        (o, t) => (
          y(),
          b(
            u(S),
            { content: '插入链接' },
            {
              default: v(() => [
                h(
                  u(T),
                  { onClick: l },
                  { default: v(() => [h(u(R), { name: 'link' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  ke = _({
    __name: 'index',
    setup(s) {
      const e = k(null),
        n = (o) => {
          const t = o.getState()
          e.value = t.editorRef
        },
        a = p.attach(n),
        l = () => {
          if (e.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const t = o.getRangeAt(0)
              let r = t.commonAncestorContainer
              if (
                (r.nodeType === Node.TEXT_NODE && (r = r.parentNode),
                e.value.contains(r))
              ) {
                const i = t.toString(),
                  c = `![${i || 'img'}](url)`
                t.deleteContents()
                const d = document.createTextNode(c)
                t.insertNode(d)
                const m = document.createRange(),
                  g = i ? i.length + 4 : 7
                m.setStart(d, g),
                  m.setEnd(d, g + 3),
                  o.removeAllRanges(),
                  o.addRange(m)
              }
            }
          }
          e.value && p.actions({ editorRef: e.value })
        }
      return (
        N(() => {
          a()
        }),
        (o, t) => (
          y(),
          b(
            u(S),
            { content: '插入图片' },
            {
              default: v(() => [
                h(
                  u(T),
                  { onClick: l },
                  { default: v(() => [h(u(R), { name: 'image' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  we = _({
    __name: 'index',
    setup(s) {
      const e = k(null),
        n = (o) => {
          const t = o.getState()
          e.value = t.editorRef
        },
        a = p.attach(n),
        l = () => {
          if (e.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const t = o.getRangeAt(0)
              let r = t.commonAncestorContainer
              if (
                (r.nodeType === Node.TEXT_NODE && (r = r.parentNode),
                e.value.contains(r))
              ) {
                t.deleteContents()
                const i = document.createTextNode(`
`),
                  c = document.createTextNode('| 标题 |  |'),
                  d = document.createTextNode(`
`),
                  m = document.createTextNode('| --- | --- |'),
                  g = document.createTextNode(`
`),
                  w = document.createTextNode('|  |  |'),
                  E = document.createTextNode(`
`)
                t.insertNode(E),
                  t.insertNode(w),
                  t.insertNode(g),
                  t.insertNode(m),
                  t.insertNode(d),
                  t.insertNode(c),
                  t.insertNode(i)
                const C = document.createRange()
                C.setStart(c, 2),
                  C.setEnd(c, 4),
                  o.removeAllRanges(),
                  o.addRange(C)
              }
            }
          }
          e.value && p.actions({ editorRef: e.value })
        }
      return (
        N(() => {
          a()
        }),
        (o, t) => (
          y(),
          b(
            u(S),
            { content: '插入表格' },
            {
              default: v(() => [
                h(
                  u(T),
                  { onClick: l },
                  { default: v(() => [h(u(R), { name: 'table' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  ye = _({
    __name: 'index',
    setup(s) {
      const e = k(null),
        n = (o) => {
          const t = o.getState()
          e.value = t.editorRef
        },
        a = p.attach(n),
        l = () => {
          if (e.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const t = o.getRangeAt(0)
              let r = t.commonAncestorContainer
              if (
                (r.nodeType === Node.TEXT_NODE && (r = r.parentNode),
                e.value.contains(r))
              ) {
                const i = t.toString().trim(),
                  c = i.startsWith('`') && i.endsWith('`'),
                  d = i.startsWith('``') && i.endsWith('``'),
                  m = i.match(/^#+/),
                  g = m ? m[0] : ''
                if (c) {
                  const w = i.slice(1, -1)
                  t.deleteContents(), t.insertNode(document.createTextNode(w))
                } else if (d) {
                  const w = i.slice(2, -2)
                  t.deleteContents(), t.insertNode(document.createTextNode(w))
                } else if (g) {
                  const w = i.slice(g.length).trim()
                  t.deleteContents(), t.insertNode(document.createTextNode(w))
                } else {
                  const w = `# ${i}`
                  t.deleteContents()
                  const E = document.createTextNode(w)
                  t.insertNode(E)
                }
                o.removeAllRanges(), o.addRange(t)
              }
            }
          }
          e.value && p.actions({ editorRef: e.value })
        }
      return (
        N(() => {
          a()
        }),
        (o, t) => (
          y(),
          b(
            u(S),
            { content: '一级标题' },
            {
              default: v(() => [
                h(
                  u(T),
                  { onClick: l },
                  { default: v(() => [h(u(R), { name: 'h1' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  _e = _({
    __name: 'index',
    setup(s) {
      const e = k(null),
        n = (o) => {
          const t = o.getState()
          e.value = t.editorRef
        },
        a = p.attach(n),
        l = () => {
          if (e.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const t = o.getRangeAt(0)
              let r = t.commonAncestorContainer
              if (
                (r.nodeType === Node.TEXT_NODE && (r = r.parentNode),
                e.value.contains(r))
              ) {
                const i = t.toString().trim()
                if (i.startsWith('## ')) {
                  const c = i.replace(/^## /, '').trim()
                  t.deleteContents(), t.insertNode(document.createTextNode(c))
                } else {
                  const c = `## ${i}`
                  t.deleteContents()
                  const d = document.createTextNode(c)
                  t.insertNode(d)
                }
                o.removeAllRanges(), o.addRange(t)
              }
            }
          }
          e.value && p.actions({ editorRef: e.value })
        }
      return (
        N(() => {
          a()
        }),
        (o, t) => (
          y(),
          b(
            u(S),
            { content: '二级标题' },
            {
              default: v(() => [
                h(
                  u(T),
                  { onClick: l },
                  { default: v(() => [h(u(R), { name: 'h2' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  xe = _({
    __name: 'index',
    setup(s) {
      const e = k(null),
        n = (o) => {
          const t = o.getState()
          e.value = t.editorRef
        },
        a = p.attach(n),
        l = () => {
          if (e.value) {
            const o = window.getSelection()
            if (o && o.rangeCount > 0) {
              const t = o.getRangeAt(0)
              let r = t.commonAncestorContainer
              if (
                (r.nodeType === Node.TEXT_NODE && (r = r.parentNode),
                e.value.contains(r))
              ) {
                const i = t.toString().trim()
                if (i.startsWith('### ')) {
                  const c = i.replace(/^### /, '').trim()
                  t.deleteContents(), t.insertNode(document.createTextNode(c))
                } else {
                  const c = `### ${i}`
                  t.deleteContents()
                  const d = document.createTextNode(c)
                  t.insertNode(d)
                }
                o.removeAllRanges(), o.addRange(t)
              }
            }
          }
          e.value && p.actions({ editorRef: e.value })
        }
      return (
        N(() => {
          a()
        }),
        (o, t) => (
          y(),
          b(
            u(S),
            { content: '三级标题' },
            {
              default: v(() => [
                h(
                  u(T),
                  { onClick: l },
                  { default: v(() => [h(u(R), { name: 'h3' })]), _: 1 },
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  Ce = { class: 'toolbar' },
  Ne = { class: 'toolbar-group' },
  be = { class: 'toolbar-group' },
  Te = { class: 'toolbar-group' },
  Re = { class: 'toolbar-group' },
  Se = _({
    __name: 'index',
    setup(s) {
      return (e, n) => (
        y(),
        A('div', Ce, [
          x('div', Ne, [h(u(ye)), h(u(_e)), h(u(xe))]),
          x('div', be, [h(u(de)), h(u(ue)), h(u(he))]),
          x('div', Te, [h(u(fe)), h(u(me)), h(u(pe)), h(u(ve))]),
          x('div', Re, [h(u(ge)), h(u(ke)), h(u(we))]),
        ])
      )
    },
  }),
  Ee = $(Se, [['__scopeId', 'data-v-9bc1417d']])
class Me {
  constructor(e, n = {}) {
    ;(this.historyStack = []),
      (this.redoStack = []),
      (this.editor = e),
      (this.options = { maxHistory: 50, ...n }),
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
    let e = ''
    return (
      this.editor instanceof HTMLTextAreaElement
        ? (e = this.editor.value || '')
        : this.editor instanceof HTMLElement &&
          this.editor.isContentEditable &&
          (e = this.editor.innerHTML || ''),
      { content: e }
    )
  }
  restoreState(e) {
    this.editor instanceof HTMLTextAreaElement
      ? (this.editor.value = e.content)
      : this.editor instanceof HTMLElement &&
        this.editor.isContentEditable &&
        (this.editor.innerHTML = e.content)
  }
  onInput() {
    const e = this.saveState()
    this.historyStack.push(e),
      (this.redoStack = []),
      this.historyStack.length > (this.options.maxHistory ?? 50) &&
        this.historyStack.shift()
  }
  undo() {
    if (this.historyStack.length > 1) {
      const e = this.historyStack.pop()
      this.redoStack.push(e)
      const n = this.historyStack[this.historyStack.length - 1]
      this.restoreState(n)
    }
  }
  redo() {
    if (this.redoStack.length > 0) {
      const e = this.redoStack.pop()
      this.historyStack.push(e), this.restoreState(e)
    }
  }
}
const Ae = { class: 'status-bar' },
  $e = _({
    __name: 'index',
    props: { value: { default: '' } },
    emits: ['update:value'],
    setup(s, { emit: e }) {
      const n = k(null),
        a = k(1),
        l = k(1),
        o = e,
        t = () => {
          const d = window.getSelection()
          if (!d || !d.focusNode || !n.value) return
          let m = d.focusNode,
            g = d.focusOffset
          l.value = g + 1
          let w = n.value.firstChild,
            E = 1
          for (; w && w !== m; ) {
            if (w.nodeType === Node.ELEMENT_NODE) {
              const C = w
              ;(C.tagName.toLowerCase() === 'p' ||
                C.tagName.toLowerCase() === 'div' ||
                C.tagName.toLowerCase() === 'br') &&
                E++
            }
            w = w.nextSibling
          }
          a.value = E
        },
        r = () => {
          var d
          const m = ((d = n.value) == null ? void 0 : d.textContent) || ''
          console.log(n.value.innerText), o('update:value', m)
        },
        i = p.attach(r),
        c = k(null)
      return (
        V(() => {
          n.value &&
            (p.actions({ editorRef: n.value }),
            (c.value = new Me(n.value)),
            document.addEventListener('selectionchange', t),
            n.value.addEventListener('input', r),
            document.addEventListener('keydown', (d) => {
              var m, g
              d.ctrlKey &&
                (d.key === 'z'
                  ? (d.preventDefault(), (m = c.value) == null || m.undo())
                  : d.key === 'y' &&
                    (d.preventDefault(), (g = c.value) == null || g.redo()))
            }))
        }),
        q(() => {
          var d
          document.removeEventListener('selectionchange', t),
            (d = n.value) == null || d.removeEventListener('input', r),
            i()
        }),
        (d, m) => (
          y(),
          A('div', null, [
            x(
              'div',
              {
                class: 'editor',
                contenteditable: 'plaintext-only',
                ref_key: 'editorRef',
                ref: n,
              },
              null,
              512,
            ),
            x('div', Ae, [
              x('div', null, '行: ' + D(a.value) + ', 列: ' + D(l.value), 1),
            ]),
          ])
        )
      )
    },
  }),
  He = $($e, [['__scopeId', 'data-v-d897f9a3']]),
  We = { class: 'rich-text-editor' },
  Le = _({
    name: 'VerRichEditor',
    __name: 'index',
    props: { value: { default: '' } },
    emits: ['update:value'],
    setup(s, { emit: e }) {
      const n = e,
        a = (l) => {
          n('update:value', l)
        }
      return (l, o) => (
        y(),
        A('div', null, [
          x('div', We, [
            h(Ee),
            h(He, { value: l.value, 'onUpdate:value': a }, null, 8, ['value']),
          ]),
        ])
      )
    },
  }),
  Be = $(Le, [['__scopeId', 'data-v-a610f2e5']]),
  ze = B(Be)
if (typeof window < 'u') {
  let s = function () {
    var e = document.body,
      n = document.getElementById('__svg__icons__dom__')
    n ||
      ((n = document.createElementNS('http://www.w3.org/2000/svg', 'svg')),
      (n.style.position = 'absolute'),
      (n.style.width = '0'),
      (n.style.height = '0'),
      (n.id = '__svg__icons__dom__'),
      n.setAttribute('xmlns', 'http://www.w3.org/2000/svg'),
      n.setAttribute('xmlns:link', 'http://www.w3.org/1999/xlink')),
      (n.innerHTML =
        '<symbol viewBox="0 0 48 48" fill="none"  id="icon-bold"><path clip-rule="evenodd" d="M24 24c5.506 0 9.969-4.477 9.969-10S29.506 4 24 4H11v20h13ZM28.031 44C33.537 44 38 39.523 38 34s-4.463-10-9.969-10H11v20h17.031Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></symbol><symbol viewBox="0 0 48 48" fill="none"  id="icon-code"><path d="M16 13 4 25.432 16 37M32 13l12 12.432L32 37" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="m28 4-7 40" stroke="#333" stroke-width="4" stroke-linecap="round" /></symbol><symbol viewBox="0 0 48 48" fill="none"  id="icon-h1"><path d="M6 8v32M25 8v32M6 24h19M34.226 24 39 19.017V40" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></symbol><symbol viewBox="0 0 48 48" fill="none"  id="icon-h2"><path d="M6 8v32M24 8v32M7 24h16M32 25c0-3.167 2.667-5 5-5s5 1.833 5 5c0 5.7-10 9.933-10 15h10" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></symbol><symbol viewBox="0 0 48 48" fill="none"  id="icon-h3"><path d="M6 8v32M24 8v32M7 24h16M32 20h10l-7 9c4 0 7 2 7 6s-3 5-5 5c-2.381 0-4-1-5-2.1" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></symbol><symbol  fill="currentColor" class="bi bi-card-image" viewBox="0 0 16 16" id="icon-image"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /><path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" /></symbol><symbol viewBox="0 0 48 48" fill="none"  id="icon-italic"><path d="M20 6h16M12 42h16M29 5.952 19 42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></symbol><symbol viewBox="0 0 48 48" fill="none"  id="icon-link"><path d="M24.707 9.565 9.858 24.415a9 9 0 0 0 0 12.727v0a9 9 0 0 0 12.728 0l17.678-17.677a6 6 0 0 0 0-8.486v0a6 6 0 0 0-8.486 0L14.101 28.657a3 3 0 0 0 0 4.243v0a3 3 0 0 0 4.242 0l14.85-14.85" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></symbol><symbol viewBox="0 0 48 48" fill="none"  id="icon-orderlist"><path d="M9 4v9M12 13H6M12 27H6M6 20s3-3 5 0-5 7-5 7M6 34.5s2-3 5-1 0 4.5 0 4.5 3 2.5 0 4.5-5-1-5-1M11 38H9M9 4 6 6M21 24h22M21 38h22M21 10h22" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></symbol><symbol  fill="currentColor" class="bi bi-quote" viewBox="0 0 16 16" id="icon-quote"><path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" /></symbol><symbol  fill="currentColor" class="bi bi-type-strikethrough" viewBox="0 0 16 16" id="icon-strikethrough"><path d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z" /></symbol><symbol  fill="currentColor" class="bi bi-table" viewBox="0 0 16 16" id="icon-table"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" /></symbol><symbol viewBox="0 0 48 48" fill="none"  id="icon-unorderlist"><path d="M8 18v9M11 27H5M11 12H5M5 5s3-3 5 0-5 7-5 7M5 34.5s2-3 5-1 0 4.5 0 4.5 3 2.5 0 4.5-5-1-5-1M10 38H8M8 18l-3 2M20 24h22M20 38h22M20 10h22" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></symbol>'),
      e.insertBefore(n, e.lastChild)
  }
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', s)
    : s()
}
const f = {
  markdown: {
    heading: /^(#{1,6})\s+(.+)$/,
    bold: /\*\*(.+?)\*\*/,
    italic: /\*(.+?)\*/,
    strikethrough: /~~(.+?)~~/,
    underline: /_(.+?)_/,
    subscript: /~(.+?)~/,
    superscript: /\^(.+?)\^/,
    audio: /!\[音频\]\((.+?)\)/,
    checkboxUnchecked: /^\s*[-*]\s*\[\s*\]\s+(.+)$/,
    checkboxChecked: /^\s*[-*]\s*\[\s*[xX]\s*\]\s+(.+)$/,
    highlight: /==(.+?)==/,
    math: /^\$\$([\s\S]+?)\$\$$/,
    table: { header: /^\|(.+)\|$/, separator: /^\|(:?-+:?\|)+$/ },
    link: /\[(.+?)\]\((.+?)\)/,
    image: /!\[(.+?)\]\((.+?)\)/,
    blockquote: /^>\s+(.+)$/,
    list: /^(-|\*|\d+\.)\s+(.+)$/,
    inlineCode: /`(.+?)`/,
    hr: /^([-*_]){3,}$/,
  },
}
let De = class {
    parseInline(e) {
      const n = []
      let a = e
      for (; a; ) {
        const l = [
          { rule: f.markdown.image, type: 'image' },
          { rule: f.markdown.link, type: 'link' },
          { rule: f.markdown.bold, type: 'bold' },
          { rule: f.markdown.italic, type: 'italic' },
          { rule: f.markdown.inlineCode, type: 'inlineCode' },
          { rule: f.markdown.strikethrough, type: 'strikethrough' },
          { rule: f.markdown.underline, type: 'underline' },
          { rule: f.markdown.subscript, type: 'subscript' },
          { rule: f.markdown.superscript, type: 'superscript' },
          { rule: f.markdown.audio, type: 'audio' },
          { rule: f.markdown.checkboxUnchecked, type: 'checkboxUnchecked' },
          { rule: f.markdown.checkboxChecked, type: 'checkboxChecked' },
          { rule: f.markdown.highlight, type: 'highlight' },
          { rule: f.markdown.table.header, type: 'table' },
        ]
          .map(({ rule: i, type: c }) => {
            const d = a.match(i)
            return d ? { match: d, type: c, index: d.index } : null
          })
          .filter((i) => i !== null)
        if (l.length === 0) {
          n.push({ type: 'text', value: a })
          break
        }
        l.sort((i, c) => i.index - c.index)
        const o = l[0],
          t = a.slice(0, o.index),
          r = a.slice(o.index + o.match[0].length)
        switch ((t && n.push({ type: 'text', value: t }), o.type)) {
          case 'link':
            n.push({
              type: 'link',
              url: o.match[2],
              title: o.match[1],
              children: [{ type: 'text', value: o.match[1] }],
            })
            break
          case 'image':
            n.push({ type: 'image', url: o.match[2], alt: o.match[1] })
            break
          case 'audio':
            n.push({ type: 'audio', url: o.match[1] })
            break
          default:
            n.push({ type: o.type, value: o.match[1] })
        }
        a = r
      }
      return n
    }
  },
  Oe = class {
    constructor() {
      this.inlineParser = new De()
    }
    parseBlocks(e) {
      const n = []
      let a = []
      const l = () => {
        a.length > 0 &&
          (n.push({
            type: 'paragraph',
            children: [{ type: 'text', value: a.join(' ').trim() }],
          }),
          (a = []))
      }
      for (let o = 0; o < e.length; o++) {
        const t = e[o].trim()
        if (t.startsWith('```')) {
          l()
          const r = t.slice(3),
            i = []
          for (o++; o < e.length && !e[o].trim().startsWith('```'); )
            i.push(e[o]), o++
          n.push({
            type: 'code',
            lang: r,
            value: i.join(`
`),
          })
        } else if (f.markdown.heading.test(t)) {
          l()
          const [, r, i] = t.match(f.markdown.heading) || []
          n.push({
            type: 'heading',
            depth: r.length,
            children: [{ type: 'text', value: i }],
          })
        } else {
          if (f.markdown.table.header.test(t)) {
            const r = this.parseTable(e, o)
            if (r) {
              n.push(r), (o += r.rows.length + 1)
              continue
            }
          }
          if (f.markdown.blockquote.test(t)) {
            l()
            const [, r] = t.match(f.markdown.blockquote) || []
            n.push({
              type: 'blockquote',
              children: this.inlineParser.parseInline(r),
            })
          } else if (f.markdown.list.test(t)) {
            l()
            const [, r, i] = t.match(f.markdown.list) || []
            n.push({
              type: 'listItem',
              ordered: /^\d+\./.test(r),
              children: this.inlineParser.parseInline(i),
            })
          } else if (f.markdown.hr.test(t)) l(), n.push({ type: 'hr' })
          else if (f.markdown.math.test(t)) {
            l()
            const [, r] = t.match(f.markdown.math) || []
            n.push({ type: 'math', value: r })
          } else t === '' ? l() : a.push(t)
        }
      }
      return l(), n
    }
    parseTable(e, n) {
      if (!e || !e[n]) return null
      const a = e[n].trim()
      if (!a.match(f.markdown.table.header) || !e[n + 1]) return null
      const l = e[n + 1].trim()
      if (!l.match(f.markdown.table.separator)) return null
      const o = a
          .slice(1, -1)
          .split('|')
          .map((c) => c.trim()),
        t = l
          .slice(1, -1)
          .split('|')
          .map((c) =>
            (c = c.trim()).startsWith(':') && c.endsWith(':')
              ? 'center'
              : c.endsWith(':')
                ? 'right'
                : 'left',
          )
      if (o.length === 0 || o.length !== t.length) return null
      const r = []
      let i = n + 2
      for (
        ;
        i < e.length &&
        e[i].trim().startsWith('|') &&
        e[i].trim().endsWith('|');

      ) {
        const c = e[i]
          .trim()
          .slice(1, -1)
          .split('|')
          .map((d) => d.trim())
        c.length === o.length && r.push(c.map((d) => this.parseInline(d))), i++
      }
      return {
        type: 'table',
        headers: o.map((c) => this.parseInline(c)),
        alignments: t,
        rows: r,
      }
    }
    parseInline(e) {
      const n = (a) => {
        const l = [
          { match: a.match(f.markdown.bold), type: 'bold' },
          { match: a.match(f.markdown.italic), type: 'italic' },
          { match: a.match(f.markdown.link), type: 'link' },
          { match: a.match(f.markdown.image), type: 'image' },
          { match: a.match(f.markdown.inlineCode), type: 'inlineCode' },
        ].filter((m) => m.match)
        if (l.length === 0) return a ? [{ type: 'text', value: a }] : []
        const o = l.reduce((m, g) => (g.match.index < m.match.index ? g : m)),
          { match: t, type: r } = o,
          i = a.slice(0, t.index),
          c = a.slice(t.index + t[0].length),
          d = []
        return (
          i && d.push({ type: 'text', value: i }),
          r === 'link'
            ? d.push({
                type: 'link',
                url: t[2],
                children: [{ type: 'text', value: t[1] }],
              })
            : r === 'image'
              ? d.push({ type: 'image', url: t[2], alt: t[1] })
              : d.push({ type: r, value: t[1] }),
          d.push(...n(c)),
          d
        )
      }
      return n(e)
    }
  },
  Ve = class {
    constructor() {
      this.blockParser = new Oe()
    }
    parseMarkdown(e) {
      const n = e.split(`
`)
      return this.blockParser.parseBlocks(n)
    }
  }
var L = function (s) {
  switch (s.type) {
    case 'root':
      var e = document.createElement('div')
      return (e.className = 'markdown-content'), M(e, s.children), e
    case 'heading':
      return (function (n) {
        var a = document.createElement('h'.concat(n.depth))
        return M(a, n.children), a
      })(s)
    case 'paragraph':
      return (function (n) {
        var a = document.createElement('p')
        return M(a, n.children), a
      })(s)
    case 'text':
    default:
      return Ie(s)
    case 'list':
      return (function (n) {
        var a = document.createElement(n.ordered ? 'ol' : 'ul')
        return M(a, n.children), a
      })(s)
    case 'listItem':
      return (function (n) {
        var a = document.createElement('li')
        return M(a, n.children), a
      })(s)
    case 'emphasis':
      return (function (n) {
        var a = document.createElement('em')
        return M(a, n.children), a
      })(s)
    case 'strong':
      return (function (n) {
        var a = document.createElement('strong')
        return M(a, n.children), a
      })(s)
    case 'link':
      return (function (n) {
        var a = document.createElement('a')
        return (
          (a.href = n.url || ''), (a.title = n.title || ''), M(a, n.children), a
        )
      })(s)
    case 'image':
      return (function (n) {
        var a = document.createElement('img')
        return (a.src = n.url || ''), (a.alt = n.alt || ''), a
      })(s)
    case 'code':
      return (function (n) {
        var a = document.createElement('pre'),
          l = document.createElement('code')
        return (l.textContent = n.value || ''), a.appendChild(l), a
      })(s)
    case 'inlineCode':
      return (function (n) {
        var a = document.createElement('code')
        return (a.textContent = n.value || ''), a
      })(s)
  }
}
function Ie(s) {
  return document.createTextNode(s.value || '')
}
function M(s, e) {
  e === void 0 && (e = []),
    e.forEach(function (n) {
      var a = L(n)
      a && ((n.el = a), s.appendChild(a))
    })
}
var O = function (s, e) {
    if (!s || !e || s.type !== e.type) return !1
    switch (s.type) {
      case 'heading':
        return s.depth === e.depth
      case 'list':
        return s.ordered === e.ordered
      case 'text':
        return s.value === e.value
      case 'code':
        return s.value === e.value && s.lang === e.lang
      default:
        return !0
    }
  },
  je = function (s, e, n, a) {
    for (var l = n; l <= a; l++) if (e[l] && O(e[l], s)) return l
    return null
  },
  z = function (s, e) {
    s !== e &&
      ((e.el = s.el),
      s.type !== 'text' || e.type !== 'text'
        ? ((function (n, a) {
            var l, o
            if (n.el) {
              if (n.type === 'heading' && n.depth !== a.depth) {
                var t = document.createElement('h'.concat(a.depth))
                return (
                  (l = n.el.parentNode) === null ||
                    l === void 0 ||
                    l.replaceChild(t, n.el),
                  void (n.el = t)
                )
              }
              if (n.type === 'list' && n.ordered !== a.ordered)
                return (
                  (t = document.createElement(a.ordered ? 'ol' : 'ul')),
                  (o = n.el.parentNode) === null ||
                    o === void 0 ||
                    o.replaceChild(t, n.el),
                  void (n.el = t)
                )
              if (n.type === 'link') {
                var r = n.el
                ;(r.href = a.url || ''), (r.title = a.title || '')
              }
              if (n.type === 'image') {
                var i = n.el
                ;(i.src = a.url || ''), (i.alt = a.alt || '')
              }
            }
          })(s, e),
          (s.children || e.children) &&
            P(s.el, s.children || [], e.children || []))
        : s.value !== e.value &&
          s.el instanceof Text &&
          (s.el.nodeValue = e.value || ''))
  },
  P = function (s, e, n) {
    if (s) {
      for (
        var a = 0,
          l = 0,
          o = e.length - 1,
          t = n.length - 1,
          r = e[0],
          i = e[o],
          c = n[0],
          d = n[t];
        a <= o && l <= t;

      )
        if (r && r.el)
          if (i && i.el)
            if (O(r, c)) z(r, c), (r = e[++a]), (c = n[++l])
            else if (O(i, d)) z(i, d), (i = e[--o]), (d = n[--t])
            else {
              var m = je(c, e, a, o)
              if (m === null) {
                var g = L(c)
                r && r.el ? s.insertBefore(g, r.el) : s.appendChild(g),
                  (c.el = g)
              } else {
                var w = e[m]
                w &&
                  w.el &&
                  r &&
                  r.el &&
                  (z(w, c), s.insertBefore(w.el, r.el), (e[m] = void 0))
              }
              c = n[++l]
            }
          else i = e[--o]
        else r = e[++a]
      if (a > o) {
        for (var E = document.createDocumentFragment(), C = l; C <= t; C++)
          (g = L(n[C])), E.appendChild(g), (n[C].el = g)
        s.appendChild(E)
      } else if (l > t)
        for (C = a; C <= o; C++) {
          var H = e[C]
          H != null && H.el && H.el instanceof Node && s.removeChild(H.el)
        }
    }
  },
  Xe = (function () {
    function s(e) {
      var n = e.ast,
        a = e.container,
        l = a === void 0 ? '#markdown-viewer' : a
      if (
        ((this.ast = { type: 'root', children: n }),
        (this.oldAst = null),
        typeof l == 'string')
      ) {
        var o = document.querySelector(l)
        if (!o) throw new Error('Container element not found')
        this.viewer = o
      } else this.viewer = l
      ;(this.viewerRoot = document.createElement('div')),
        (this.viewerRoot.className = 'markdown-body'),
        this.viewer.appendChild(this.viewerRoot),
        this.update(n)
    }
    return (
      (s.prototype.update = function (e) {
        var n = { type: 'root', children: e }
        if (this.oldAst)
          P(this.viewerRoot, this.oldAst.children || [], n.children || [])
        else {
          var a = document.createDocumentFragment()
          n.children.forEach(function (l) {
            var o = L(l)
            o && ((l.el = o), a.appendChild(o))
          }),
            this.viewerRoot.appendChild(a)
        }
        ;(this.oldAst = n), (this.ast = n)
      }),
      (s.prototype.destroy = function () {
        this.viewer.removeChild(this.viewerRoot),
          (this.ast = { type: 'root', children: [] }),
          (this.oldAst = null)
      }),
      s
    )
  })(),
  qe = (function () {
    function s() {}
    return (
      (s.prototype.render = function (e) {
        var n = this
        return Array.isArray(e)
          ? e.map(function (a) {
              return n.renderNode(a)
            }).join(`
`)
          : this.renderNode(e)
      }),
      (s.prototype.renderNode = function (e) {
        if (!e) return ''
        switch (e.type) {
          case 'document':
          case 'paragraph':
            return '<p>'.concat(this.renderChildren(e.children), '</p>')
          case 'heading':
            return '<h'
              .concat(e.depth, '>')
              .concat(this.renderChildren(e.children), '</h')
              .concat(e.depth, '>')
          case 'text':
            return e.value || ''
          case 'blockquote':
            return '<blockquote>'.concat(
              this.renderChildren(e.children),
              '</blockquote>',
            )
          case 'list':
            var n = e.ordered ? 'ol' : 'ul'
            return '<'
              .concat(n, '>')
              .concat(this.renderChildren(e.children), '</')
              .concat(n, '>')
          case 'listItem':
            return '<li>'.concat(this.renderChildren(e.children), '</li>')
          case 'code':
            return '<pre><code'
              .concat(
                e.lang ? ' class="language-'.concat(e.lang, '"') : '',
                '>',
              )
              .concat(e.value, '</code></pre>')
          case 'inlineCode':
            return '<code>'.concat(e.value, '</code>')
          default:
            return console.warn('Unknown node type: '.concat(e.type)), ''
        }
      }),
      (s.prototype.renderChildren = function (e) {
        var n = this
        return e
          ? e
              .map(function (a) {
                return n.renderNode(a)
              })
              .join('')
          : ''
      }),
      s
    )
  })()
const Pe = { class: 'container-box' },
  Ue = { class: 'rich' },
  Ze = { class: 'preview' },
  Fe = ['innerHTML'],
  Ge = _({
    __name: 'example',
    setup(s) {
      const e = k(''),
        n = k(),
        a = k(),
        l = k(),
        o = new Ve(),
        t = new qe()
      let r
      V(() => {
        l.value && (r = new Xe({ container: l.value, ast: [] }))
      })
      const i = () => {
        n.value = o.parseMarkdown(e.value)
      }
      return (
        K(e, () => {
          i(), (a.value = t.render(n.value)), r && r.update(n.value)
        }),
        q(() => {
          r && r.destroy()
        }),
        (c, d) => (
          y(),
          A('div', Pe, [
            x('div', Ue, [
              h(
                u(ze),
                {
                  value: e.value,
                  'onUpdate:value': d[0] || (d[0] = (m) => (e.value = m)),
                },
                null,
                8,
                ['value'],
              ),
            ]),
            x('div', Ze, [x('div', { innerHTML: a.value }, null, 8, Fe)]),
          ])
        )
      )
    },
  }),
  Je = Y(Ge, [['__scopeId', 'data-v-cc2e63ea']]),
  nt = JSON.parse(
    '{"title":"编辑器输入组件","description":"","frontmatter":{},"headers":[],"relativePath":"example.md","filePath":"example.md"}',
  ),
  Ke = { name: 'example.md' },
  ot = Object.assign(Ke, {
    setup(s) {
      return (e, n) => (
        y(),
        A('div', null, [
          n[0] ||
            (n[0] = x(
              'h1',
              { id: '编辑器输入组件', tabindex: '-1' },
              [
                I('编辑器输入组件 '),
                x(
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
          n[1] ||
            (n[1] = x(
              'h2',
              {
                id: '这是一个带有-markdown-编辑器输入组件的示例',
                tabindex: '-1',
              },
              [
                I('这是一个带有 Markdown 编辑器输入组件的示例 '),
                x(
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
          h(Je),
        ])
      )
    },
  })
export { nt as __pageData, ot as default }
