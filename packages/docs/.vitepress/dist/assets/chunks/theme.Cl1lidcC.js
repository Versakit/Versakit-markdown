import {
  d as h,
  o as a,
  c as l,
  r as c,
  n as N,
  a as D,
  t as T,
  b as k,
  w as v,
  e as m,
  T as ue,
  _ as b,
  u as Ae,
  i as Be,
  f as Ce,
  g as de,
  h as g,
  j as d,
  k as i,
  l as q,
  m as re,
  p as M,
  q as O,
  s as Q,
  v as j,
  x as pe,
  y as ve,
  z as Ee,
  A as Fe,
  B as W,
  F as I,
  C as B,
  D as ge,
  E as X,
  G as _,
  H as F,
  I as $e,
  J as Z,
  K as z,
  L as x,
  M as De,
  N as ye,
  O as Oe,
  P as Pe,
  Q as Le,
  R as ee,
  S as Ge,
  U as Ve,
  V as Se,
  W as Ue,
  X as ze,
  Y as je,
  Z as qe,
  $ as We,
} from './framework.dB56A39y.js'
const Ke = h({
    __name: 'VPBadge',
    props: { text: {}, type: { default: 'tip' } },
    setup(o) {
      return (e, t) => (
        a(),
        l(
          'span',
          { class: N(['VPBadge', e.type]) },
          [c(e.$slots, 'default', {}, () => [D(T(e.text), 1)])],
          2,
        )
      )
    },
  }),
  Re = { key: 0, class: 'VPBackdrop' },
  Je = h({
    __name: 'VPBackdrop',
    props: { show: { type: Boolean } },
    setup(o) {
      return (e, t) => (
        a(),
        k(
          ue,
          { name: 'fade' },
          {
            default: v(() => [e.show ? (a(), l('div', Re)) : m('', !0)]),
            _: 1,
          },
        )
      )
    },
  }),
  Ye = b(Je, [['__scopeId', 'data-v-0553eb91']]),
  P = Ae
function Qe(o, e) {
  let t,
    s = !1
  return () => {
    t && clearTimeout(t),
      s
        ? (t = setTimeout(o, e))
        : (o(), (s = !0) && setTimeout(() => (s = !1), e))
  }
}
function ie(o) {
  return /^\//.test(o) ? o : `/${o}`
}
function fe(o) {
  const {
    pathname: e,
    search: t,
    hash: s,
    protocol: n,
  } = new URL(o, 'http://a.com')
  if (Be(o) || o.startsWith('#') || !n.startsWith('http') || !Ce(e)) return o
  const { site: r } = P(),
    u =
      e.endsWith('/') || e.endsWith('.html')
        ? o
        : o.replace(
            /(?:(^\.+)\/)?.*$/,
            `$1${e.replace(/(\.md)?$/, r.value.cleanUrls ? '' : '.html')}${t}${s}`,
          )
  return de(u)
}
function R({ correspondingLink: o = !1 } = {}) {
  const { site: e, localeIndex: t, page: s, theme: n, hash: r } = P(),
    u = g(() => {
      var p, y
      return {
        label: (p = e.value.locales[t.value]) == null ? void 0 : p.label,
        link:
          ((y = e.value.locales[t.value]) == null ? void 0 : y.link) ||
          (t.value === 'root' ? '/' : `/${t.value}/`),
      }
    })
  return {
    localeLinks: g(() =>
      Object.entries(e.value.locales).flatMap(([p, y]) =>
        u.value.label === y.label
          ? []
          : {
              text: y.label,
              link:
                Xe(
                  y.link || (p === 'root' ? '/' : `/${p}/`),
                  n.value.i18nRouting !== !1 && o,
                  s.value.relativePath.slice(u.value.link.length - 1),
                  !e.value.cleanUrls,
                ) + r.value,
            },
      ),
    ),
    currentLang: u,
  }
}
function Xe(o, e, t, s) {
  return e
    ? o.replace(/\/$/, '') +
        ie(
          t
            .replace(/(^|\/)index\.md$/, '$1')
            .replace(/\.md$/, s ? '.html' : ''),
        )
    : o
}
const Ze = { class: 'NotFound' },
  xe = { class: 'code' },
  et = { class: 'title' },
  tt = { class: 'quote' },
  nt = { class: 'action' },
  st = ['href', 'aria-label'],
  ot = h({
    __name: 'NotFound',
    setup(o) {
      const { theme: e } = P(),
        { currentLang: t } = R()
      return (s, n) => {
        var r, u, f, p, y
        return (
          a(),
          l('div', Ze, [
            d(
              'p',
              xe,
              T(((r = i(e).notFound) == null ? void 0 : r.code) ?? '404'),
              1,
            ),
            d(
              'h1',
              et,
              T(
                ((u = i(e).notFound) == null ? void 0 : u.title) ??
                  'PAGE NOT FOUND',
              ),
              1,
            ),
            n[0] || (n[0] = d('div', { class: 'divider' }, null, -1)),
            d(
              'blockquote',
              tt,
              T(
                ((f = i(e).notFound) == null ? void 0 : f.quote) ??
                  "But if you don't change your direction, and if you keep looking, you may end up where you are heading.",
              ),
              1,
            ),
            d('div', nt, [
              d(
                'a',
                {
                  class: 'link',
                  href: i(de)(i(t).link),
                  'aria-label':
                    ((p = i(e).notFound) == null ? void 0 : p.linkLabel) ??
                    'go to home',
                },
                T(
                  ((y = i(e).notFound) == null ? void 0 : y.linkText) ??
                    'Take me home',
                ),
                9,
                st,
              ),
            ]),
          ])
        )
      }
    },
  }),
  at = b(ot, [['__scopeId', 'data-v-1085fea5']])
function Te(o, e) {
  if (Array.isArray(o)) return J(o)
  if (o == null) return []
  e = ie(e)
  const t = Object.keys(o)
      .sort((n, r) => r.split('/').length - n.split('/').length)
      .find((n) => e.startsWith(ie(n))),
    s = t ? o[t] : []
  return Array.isArray(s) ? J(s) : J(s.items, s.base)
}
function rt(o) {
  const e = []
  let t = 0
  for (const s in o) {
    const n = o[s]
    if (n.items) {
      t = e.push(n)
      continue
    }
    e[t] || e.push({ items: [] }), e[t].items.push(n)
  }
  return e
}
function it(o) {
  const e = []
  function t(s) {
    for (const n of s)
      n.text &&
        n.link &&
        e.push({ text: n.text, link: n.link, docFooterText: n.docFooterText }),
        n.items && t(n.items)
  }
  return t(o), e
}
function le(o, e) {
  return Array.isArray(e)
    ? e.some((t) => le(o, t))
    : q(o, e.link)
      ? !0
      : e.items
        ? le(o, e.items)
        : !1
}
function J(o, e) {
  return [...o].map((t) => {
    const s = { ...t },
      n = s.base || e
    return (
      n && s.link && (s.link = n + s.link),
      s.items && (s.items = J(s.items, n)),
      s
    )
  })
}
function G() {
  const { frontmatter: o, page: e, theme: t } = P(),
    s = re('(min-width: 960px)'),
    n = M(!1),
    r = g(() => {
      const A = t.value.sidebar,
        S = e.value.relativePath
      return A ? Te(A, S) : []
    }),
    u = M(r.value)
  O(r, (A, S) => {
    JSON.stringify(A) !== JSON.stringify(S) && (u.value = r.value)
  })
  const f = g(
      () =>
        o.value.sidebar !== !1 &&
        u.value.length > 0 &&
        o.value.layout !== 'home',
    ),
    p = g(() =>
      y
        ? o.value.aside == null
          ? t.value.aside === 'left'
          : o.value.aside === 'left'
        : !1,
    ),
    y = g(() =>
      o.value.layout === 'home'
        ? !1
        : o.value.aside != null
          ? !!o.value.aside
          : t.value.aside !== !1,
    ),
    L = g(() => f.value && s.value),
    $ = g(() => (f.value ? rt(u.value) : []))
  function V() {
    n.value = !0
  }
  function w() {
    n.value = !1
  }
  function H() {
    n.value ? w() : V()
  }
  return {
    isOpen: n,
    sidebar: u,
    sidebarGroups: $,
    hasSidebar: f,
    hasAside: y,
    leftAside: p,
    isSidebarEnabled: L,
    open: V,
    close: w,
    toggle: H,
  }
}
function lt(o, e) {
  let t
  Q(() => {
    t = o.value ? document.activeElement : void 0
  }),
    j(() => {
      window.addEventListener('keyup', s)
    }),
    pe(() => {
      window.removeEventListener('keyup', s)
    })
  function s(n) {
    n.key === 'Escape' && o.value && (e(), t == null || t.focus())
  }
}
function ct(o) {
  const { page: e, hash: t } = P(),
    s = M(!1),
    n = g(() => o.value.collapsed != null),
    r = g(() => !!o.value.link),
    u = M(!1),
    f = () => {
      u.value = q(e.value.relativePath, o.value.link)
    }
  O([e, o, t], f), j(f)
  const p = g(() =>
      u.value
        ? !0
        : o.value.items
          ? le(e.value.relativePath, o.value.items)
          : !1,
    ),
    y = g(() => !!(o.value.items && o.value.items.length))
  Q(() => {
    s.value = !!(n.value && o.value.collapsed)
  }),
    ve(() => {
      ;(u.value || p.value) && (s.value = !1)
    })
  function L() {
    n.value && (s.value = !s.value)
  }
  return {
    collapsed: s,
    collapsible: n,
    isLink: r,
    isActiveLink: u,
    hasActiveLink: p,
    hasChildren: y,
    toggle: L,
  }
}
function ut() {
  const { hasSidebar: o } = G(),
    e = re('(min-width: 960px)'),
    t = re('(min-width: 1280px)')
  return {
    isAsideEnabled: g(() =>
      !t.value && !e.value ? !1 : o.value ? t.value : e.value,
    ),
  }
}
const ce = []
function Me(o) {
  return (
    (typeof o.outline == 'object' &&
      !Array.isArray(o.outline) &&
      o.outline.label) ||
    o.outlineTitle ||
    'On this page'
  )
}
function me(o) {
  const e = [...document.querySelectorAll('.VPDoc :where(h1,h2,h3,h4,h5,h6)')]
    .filter((t) => t.id && t.hasChildNodes())
    .map((t) => {
      const s = Number(t.tagName[1])
      return { element: t, title: dt(t), link: '#' + t.id, level: s }
    })
  return pt(e, o)
}
function dt(o) {
  let e = ''
  for (const t of o.childNodes)
    if (t.nodeType === 1) {
      if (
        t.classList.contains('VPBadge') ||
        t.classList.contains('header-anchor') ||
        t.classList.contains('ignore-header')
      )
        continue
      e += t.textContent
    } else t.nodeType === 3 && (e += t.textContent)
  return e.trim()
}
function pt(o, e) {
  if (e === !1) return []
  const t = (typeof e == 'object' && !Array.isArray(e) ? e.level : e) || 2,
    [s, n] = typeof t == 'number' ? [t, t] : t === 'deep' ? [2, 6] : t
  return mt(o, s, n)
}
function vt(o, e) {
  const { isAsideEnabled: t } = ut(),
    s = Qe(r, 100)
  let n = null
  j(() => {
    requestAnimationFrame(r), window.addEventListener('scroll', s)
  }),
    Ee(() => {
      u(location.hash)
    }),
    pe(() => {
      window.removeEventListener('scroll', s)
    })
  function r() {
    if (!t.value) return
    const f = window.scrollY,
      p = window.innerHeight,
      y = document.body.offsetHeight,
      L = Math.abs(f + p - y) < 1,
      $ = ce
        .map(({ element: w, link: H }) => ({ link: H, top: ft(w) }))
        .filter(({ top: w }) => !Number.isNaN(w))
        .sort((w, H) => w.top - H.top)
    if (!$.length) {
      u(null)
      return
    }
    if (f < 1) {
      u(null)
      return
    }
    if (L) {
      u($[$.length - 1].link)
      return
    }
    let V = null
    for (const { link: w, top: H } of $) {
      if (H > f + Fe() + 4) break
      V = w
    }
    u(V)
  }
  function u(f) {
    n && n.classList.remove('active'),
      f == null
        ? (n = null)
        : (n = o.value.querySelector(`a[href="${decodeURIComponent(f)}"]`))
    const p = n
    p
      ? (p.classList.add('active'),
        (e.value.style.top = p.offsetTop + 39 + 'px'),
        (e.value.style.opacity = '1'))
      : ((e.value.style.top = '33px'), (e.value.style.opacity = '0'))
  }
}
function ft(o) {
  let e = 0
  for (; o !== document.body; ) {
    if (o === null) return NaN
    ;(e += o.offsetTop), (o = o.offsetParent)
  }
  return e
}
function mt(o, e, t) {
  ce.length = 0
  const s = [],
    n = []
  return (
    o.forEach((r) => {
      const u = { ...r, children: [] }
      let f = n[n.length - 1]
      for (; f && f.level >= u.level; ) n.pop(), (f = n[n.length - 1])
      if (
        u.element.classList.contains('ignore-header') ||
        (f && 'shouldIgnore' in f)
      ) {
        n.push({ level: u.level, shouldIgnore: !0 })
        return
      }
      u.level > t ||
        u.level < e ||
        (ce.push({ element: u.element, link: u.link }),
        f ? f.children.push(u) : s.push(u),
        n.push(u))
    }),
    s
  )
}
const ht = ['href', 'title'],
  _t = h({
    __name: 'VPDocOutlineItem',
    props: { headers: {}, root: { type: Boolean } },
    setup(o) {
      function e({ target: t }) {
        const s = t.href.split('#')[1],
          n = document.getElementById(decodeURIComponent(s))
        n == null || n.focus({ preventScroll: !0 })
      }
      return (t, s) => {
        const n = W('VPDocOutlineItem', !0)
        return (
          a(),
          l(
            'ul',
            { class: N(['VPDocOutlineItem', t.root ? 'root' : 'nested']) },
            [
              (a(!0),
              l(
                I,
                null,
                B(
                  t.headers,
                  ({ children: r, link: u, title: f }) => (
                    a(),
                    l('li', null, [
                      d(
                        'a',
                        {
                          class: 'outline-link',
                          href: u,
                          onClick: e,
                          title: f,
                        },
                        T(f),
                        9,
                        ht,
                      ),
                      r != null && r.length
                        ? (a(),
                          k(n, { key: 0, headers: r }, null, 8, ['headers']))
                        : m('', !0),
                    ])
                  ),
                ),
                256,
              )),
            ],
            2,
          )
        )
      }
    },
  }),
  Ne = b(_t, [['__scopeId', 'data-v-c26a44b0']]),
  kt = { class: 'content' },
  bt = {
    'aria-level': '2',
    class: 'outline-title',
    id: 'doc-outline-aria-label',
    role: 'heading',
  },
  gt = h({
    __name: 'VPDocAsideOutline',
    setup(o) {
      const { frontmatter: e, theme: t } = P(),
        s = ge([])
      X(() => {
        s.value = me(e.value.outline ?? t.value.outline)
      })
      const n = M(),
        r = M()
      return (
        vt(n, r),
        (u, f) => (
          a(),
          l(
            'nav',
            {
              'aria-labelledby': 'doc-outline-aria-label',
              class: N([
                'VPDocAsideOutline',
                { 'has-outline': s.value.length > 0 },
              ]),
              ref_key: 'container',
              ref: n,
            },
            [
              d('div', kt, [
                d(
                  'div',
                  { class: 'outline-marker', ref_key: 'marker', ref: r },
                  null,
                  512,
                ),
                d('div', bt, T(i(Me)(i(t))), 1),
                _(Ne, { headers: s.value, root: !0 }, null, 8, ['headers']),
              ]),
            ],
            2,
          )
        )
      )
    },
  }),
  $t = b(gt, [['__scopeId', 'data-v-202e362a']]),
  yt = { class: 'VPDocAsideCarbonAds' },
  Pt = h({
    __name: 'VPDocAsideCarbonAds',
    props: { carbonAds: {} },
    setup(o) {
      const e = () => null
      return (t, s) => (
        a(),
        l('div', yt, [
          _(i(e), { 'carbon-ads': t.carbonAds }, null, 8, ['carbon-ads']),
        ])
      )
    },
  }),
  Lt = { class: 'VPDocAside' },
  Vt = h({
    __name: 'VPDocAside',
    setup(o) {
      const { theme: e } = P()
      return (t, s) => (
        a(),
        l('div', Lt, [
          c(t.$slots, 'aside-top', {}, void 0, !0),
          c(t.$slots, 'aside-outline-before', {}, void 0, !0),
          _($t),
          c(t.$slots, 'aside-outline-after', {}, void 0, !0),
          s[0] || (s[0] = d('div', { class: 'spacer' }, null, -1)),
          c(t.$slots, 'aside-ads-before', {}, void 0, !0),
          i(e).carbonAds
            ? (a(),
              k(Pt, { key: 0, 'carbon-ads': i(e).carbonAds }, null, 8, [
                'carbon-ads',
              ]))
            : m('', !0),
          c(t.$slots, 'aside-ads-after', {}, void 0, !0),
          c(t.$slots, 'aside-bottom', {}, void 0, !0),
        ])
      )
    },
  }),
  St = b(Vt, [['__scopeId', 'data-v-5fd27657']])
function Tt() {
  const { theme: o, page: e } = P()
  return g(() => {
    const { text: t = 'Edit this page', pattern: s = '' } =
      o.value.editLink || {}
    let n
    return (
      typeof s == 'function'
        ? (n = s(e.value))
        : (n = s.replace(/:path/g, e.value.filePath)),
      { url: n, text: t }
    )
  })
}
function Mt() {
  const { page: o, theme: e, frontmatter: t } = P()
  return g(() => {
    var y, L, $, V, w, H, A, S
    const s = Te(e.value.sidebar, o.value.relativePath),
      n = it(s),
      r = Nt(n, (C) => C.link.replace(/[?#].*$/, '')),
      u = r.findIndex((C) => q(o.value.relativePath, C.link)),
      f =
        (((y = e.value.docFooter) == null ? void 0 : y.prev) === !1 &&
          !t.value.prev) ||
        t.value.prev === !1,
      p =
        (((L = e.value.docFooter) == null ? void 0 : L.next) === !1 &&
          !t.value.next) ||
        t.value.next === !1
    return {
      prev: f
        ? void 0
        : {
            text:
              (typeof t.value.prev == 'string'
                ? t.value.prev
                : typeof t.value.prev == 'object'
                  ? t.value.prev.text
                  : void 0) ??
              (($ = r[u - 1]) == null ? void 0 : $.docFooterText) ??
              ((V = r[u - 1]) == null ? void 0 : V.text),
            link:
              (typeof t.value.prev == 'object' ? t.value.prev.link : void 0) ??
              ((w = r[u - 1]) == null ? void 0 : w.link),
          },
      next: p
        ? void 0
        : {
            text:
              (typeof t.value.next == 'string'
                ? t.value.next
                : typeof t.value.next == 'object'
                  ? t.value.next.text
                  : void 0) ??
              ((H = r[u + 1]) == null ? void 0 : H.docFooterText) ??
              ((A = r[u + 1]) == null ? void 0 : A.text),
            link:
              (typeof t.value.next == 'object' ? t.value.next.link : void 0) ??
              ((S = r[u + 1]) == null ? void 0 : S.link),
          },
    }
  })
}
function Nt(o, e) {
  const t = new Set()
  return o.filter((s) => {
    const n = e(s)
    return t.has(n) ? !1 : t.add(n)
  })
}
const E = h({
    __name: 'VPLink',
    props: {
      tag: {},
      href: {},
      noIcon: { type: Boolean },
      target: {},
      rel: {},
    },
    setup(o) {
      const e = o,
        t = g(() => e.tag ?? (e.href ? 'a' : 'span')),
        s = g(() => (e.href && $e.test(e.href)) || e.target === '_blank')
      return (n, r) => (
        a(),
        k(
          F(t.value),
          {
            class: N([
              'VPLink',
              {
                link: n.href,
                'vp-external-link-icon': s.value,
                'no-icon': n.noIcon,
              },
            ]),
            href: n.href ? i(fe)(n.href) : void 0,
            target: n.target ?? (s.value ? '_blank' : void 0),
            rel: n.rel ?? (s.value ? 'noreferrer' : void 0),
          },
          { default: v(() => [c(n.$slots, 'default')]), _: 3 },
          8,
          ['class', 'href', 'target', 'rel'],
        )
      )
    },
  }),
  It = { class: 'VPLastUpdated' },
  wt = ['datetime'],
  Ht = h({
    __name: 'VPDocFooterLastUpdated',
    setup(o) {
      const { theme: e, page: t, lang: s } = P(),
        n = g(() => new Date(t.value.lastUpdated)),
        r = g(() => n.value.toISOString()),
        u = M('')
      return (
        j(() => {
          Q(() => {
            var f, p, y
            u.value = new Intl.DateTimeFormat(
              (p =
                (f = e.value.lastUpdated) == null ? void 0 : f.formatOptions) !=
                null && p.forceLocale
                ? s.value
                : void 0,
              ((y = e.value.lastUpdated) == null
                ? void 0
                : y.formatOptions) ?? {
                dateStyle: 'short',
                timeStyle: 'short',
              },
            ).format(n.value)
          })
        }),
        (f, p) => {
          var y
          return (
            a(),
            l('p', It, [
              D(
                T(
                  ((y = i(e).lastUpdated) == null ? void 0 : y.text) ||
                    i(e).lastUpdatedText ||
                    'Last updated',
                ) + ': ',
                1,
              ),
              d('time', { datetime: r.value }, T(u.value), 9, wt),
            ])
          )
        }
      )
    },
  }),
  At = b(Ht, [['__scopeId', 'data-v-00b88405']]),
  Bt = { key: 0, class: 'VPDocFooter' },
  Ct = { key: 0, class: 'edit-info' },
  Et = { key: 0, class: 'edit-link' },
  Ft = { key: 1, class: 'last-updated' },
  Dt = {
    key: 1,
    class: 'prev-next',
    'aria-labelledby': 'doc-footer-aria-label',
  },
  Ot = { class: 'pager' },
  Gt = ['innerHTML'],
  Ut = ['innerHTML'],
  zt = { class: 'pager' },
  jt = ['innerHTML'],
  qt = ['innerHTML'],
  Wt = h({
    __name: 'VPDocFooter',
    setup(o) {
      const { theme: e, page: t, frontmatter: s } = P(),
        n = Tt(),
        r = Mt(),
        u = g(() => e.value.editLink && s.value.editLink !== !1),
        f = g(() => t.value.lastUpdated),
        p = g(() => u.value || f.value || r.value.prev || r.value.next)
      return (y, L) => {
        var $, V, w, H
        return p.value
          ? (a(),
            l('footer', Bt, [
              c(y.$slots, 'doc-footer-before', {}, void 0, !0),
              u.value || f.value
                ? (a(),
                  l('div', Ct, [
                    u.value
                      ? (a(),
                        l('div', Et, [
                          _(
                            E,
                            {
                              class: 'edit-link-button',
                              href: i(n).url,
                              'no-icon': !0,
                            },
                            {
                              default: v(() => [
                                L[0] ||
                                  (L[0] = d(
                                    'span',
                                    { class: 'vpi-square-pen edit-link-icon' },
                                    null,
                                    -1,
                                  )),
                                D(' ' + T(i(n).text), 1),
                              ]),
                              _: 1,
                            },
                            8,
                            ['href'],
                          ),
                        ]))
                      : m('', !0),
                    f.value ? (a(), l('div', Ft, [_(At)])) : m('', !0),
                  ]))
                : m('', !0),
              (($ = i(r).prev) != null && $.link) ||
              ((V = i(r).next) != null && V.link)
                ? (a(),
                  l('nav', Dt, [
                    L[1] ||
                      (L[1] = d(
                        'span',
                        {
                          class: 'visually-hidden',
                          id: 'doc-footer-aria-label',
                        },
                        'Pager',
                        -1,
                      )),
                    d('div', Ot, [
                      (w = i(r).prev) != null && w.link
                        ? (a(),
                          k(
                            E,
                            {
                              key: 0,
                              class: 'pager-link prev',
                              href: i(r).prev.link,
                            },
                            {
                              default: v(() => {
                                var A
                                return [
                                  d(
                                    'span',
                                    {
                                      class: 'desc',
                                      innerHTML:
                                        ((A = i(e).docFooter) == null
                                          ? void 0
                                          : A.prev) || 'Previous page',
                                    },
                                    null,
                                    8,
                                    Gt,
                                  ),
                                  d(
                                    'span',
                                    {
                                      class: 'title',
                                      innerHTML: i(r).prev.text,
                                    },
                                    null,
                                    8,
                                    Ut,
                                  ),
                                ]
                              }),
                              _: 1,
                            },
                            8,
                            ['href'],
                          ))
                        : m('', !0),
                    ]),
                    d('div', zt, [
                      (H = i(r).next) != null && H.link
                        ? (a(),
                          k(
                            E,
                            {
                              key: 0,
                              class: 'pager-link next',
                              href: i(r).next.link,
                            },
                            {
                              default: v(() => {
                                var A
                                return [
                                  d(
                                    'span',
                                    {
                                      class: 'desc',
                                      innerHTML:
                                        ((A = i(e).docFooter) == null
                                          ? void 0
                                          : A.next) || 'Next page',
                                    },
                                    null,
                                    8,
                                    jt,
                                  ),
                                  d(
                                    'span',
                                    {
                                      class: 'title',
                                      innerHTML: i(r).next.text,
                                    },
                                    null,
                                    8,
                                    qt,
                                  ),
                                ]
                              }),
                              _: 1,
                            },
                            8,
                            ['href'],
                          ))
                        : m('', !0),
                    ]),
                  ]))
                : m('', !0),
            ]))
          : m('', !0)
      }
    },
  }),
  Kt = b(Wt, [['__scopeId', 'data-v-0003128c']]),
  Rt = { class: 'container' },
  Jt = { class: 'aside-container' },
  Yt = { class: 'aside-content' },
  Qt = { class: 'content' },
  Xt = { class: 'content-container' },
  Zt = { class: 'main' },
  xt = h({
    __name: 'VPDoc',
    setup(o) {
      const { theme: e } = P(),
        t = Z(),
        { hasSidebar: s, hasAside: n, leftAside: r } = G(),
        u = g(() => t.path.replace(/[./]+/g, '_').replace(/_html$/, ''))
      return (f, p) => {
        const y = W('Content')
        return (
          a(),
          l(
            'div',
            { class: N(['VPDoc', { 'has-sidebar': i(s), 'has-aside': i(n) }]) },
            [
              c(f.$slots, 'doc-top', {}, void 0, !0),
              d('div', Rt, [
                i(n)
                  ? (a(),
                    l(
                      'div',
                      { key: 0, class: N(['aside', { 'left-aside': i(r) }]) },
                      [
                        p[0] ||
                          (p[0] = d(
                            'div',
                            { class: 'aside-curtain' },
                            null,
                            -1,
                          )),
                        d('div', Jt, [
                          d('div', Yt, [
                            _(St, null, {
                              'aside-top': v(() => [
                                c(f.$slots, 'aside-top', {}, void 0, !0),
                              ]),
                              'aside-bottom': v(() => [
                                c(f.$slots, 'aside-bottom', {}, void 0, !0),
                              ]),
                              'aside-outline-before': v(() => [
                                c(
                                  f.$slots,
                                  'aside-outline-before',
                                  {},
                                  void 0,
                                  !0,
                                ),
                              ]),
                              'aside-outline-after': v(() => [
                                c(
                                  f.$slots,
                                  'aside-outline-after',
                                  {},
                                  void 0,
                                  !0,
                                ),
                              ]),
                              'aside-ads-before': v(() => [
                                c(f.$slots, 'aside-ads-before', {}, void 0, !0),
                              ]),
                              'aside-ads-after': v(() => [
                                c(f.$slots, 'aside-ads-after', {}, void 0, !0),
                              ]),
                              _: 3,
                            }),
                          ]),
                        ]),
                      ],
                      2,
                    ))
                  : m('', !0),
                d('div', Qt, [
                  d('div', Xt, [
                    c(f.$slots, 'doc-before', {}, void 0, !0),
                    d('main', Zt, [
                      _(
                        y,
                        {
                          class: N([
                            'vp-doc',
                            [
                              u.value,
                              i(e).externalLinkIcon &&
                                'external-link-icon-enabled',
                            ],
                          ]),
                        },
                        null,
                        8,
                        ['class'],
                      ),
                    ]),
                    _(Kt, null, {
                      'doc-footer-before': v(() => [
                        c(f.$slots, 'doc-footer-before', {}, void 0, !0),
                      ]),
                      _: 3,
                    }),
                    c(f.$slots, 'doc-after', {}, void 0, !0),
                  ]),
                ]),
              ]),
              c(f.$slots, 'doc-bottom', {}, void 0, !0),
            ],
            2,
          )
        )
      }
    },
  }),
  en = b(xt, [['__scopeId', 'data-v-6cdd11f1']]),
  tn = h({
    __name: 'VPButton',
    props: {
      tag: {},
      size: { default: 'medium' },
      theme: { default: 'brand' },
      text: {},
      href: {},
      target: {},
      rel: {},
    },
    setup(o) {
      const e = o,
        t = g(() => e.href && $e.test(e.href)),
        s = g(() => e.tag || (e.href ? 'a' : 'button'))
      return (n, r) => (
        a(),
        k(
          F(s.value),
          {
            class: N(['VPButton', [n.size, n.theme]]),
            href: n.href ? i(fe)(n.href) : void 0,
            target: e.target ?? (t.value ? '_blank' : void 0),
            rel: e.rel ?? (t.value ? 'noreferrer' : void 0),
          },
          { default: v(() => [D(T(n.text), 1)]), _: 1 },
          8,
          ['class', 'href', 'target', 'rel'],
        )
      )
    },
  }),
  nn = b(tn, [['__scopeId', 'data-v-4098af3b']]),
  sn = ['src', 'alt'],
  on = h({
    inheritAttrs: !1,
    __name: 'VPImage',
    props: { image: {}, alt: {} },
    setup(o) {
      return (e, t) => {
        const s = W('VPImage', !0)
        return e.image
          ? (a(),
            l(
              I,
              { key: 0 },
              [
                typeof e.image == 'string' || 'src' in e.image
                  ? (a(),
                    l(
                      'img',
                      z(
                        { key: 0, class: 'VPImage' },
                        typeof e.image == 'string'
                          ? e.$attrs
                          : { ...e.image, ...e.$attrs },
                        {
                          src: i(de)(
                            typeof e.image == 'string' ? e.image : e.image.src,
                          ),
                          alt:
                            e.alt ??
                            (typeof e.image == 'string'
                              ? ''
                              : e.image.alt || ''),
                        },
                      ),
                      null,
                      16,
                      sn,
                    ))
                  : (a(),
                    l(
                      I,
                      { key: 1 },
                      [
                        _(
                          s,
                          z(
                            {
                              class: 'dark',
                              image: e.image.dark,
                              alt: e.image.alt,
                            },
                            e.$attrs,
                          ),
                          null,
                          16,
                          ['image', 'alt'],
                        ),
                        _(
                          s,
                          z(
                            {
                              class: 'light',
                              image: e.image.light,
                              alt: e.image.alt,
                            },
                            e.$attrs,
                          ),
                          null,
                          16,
                          ['image', 'alt'],
                        ),
                      ],
                      64,
                    )),
              ],
              64,
            ))
          : m('', !0)
      }
    },
  }),
  Y = b(on, [['__scopeId', 'data-v-6e3eae7a']]),
  an = { class: 'container' },
  rn = { class: 'main' },
  ln = { key: 0, class: 'name' },
  cn = ['innerHTML'],
  un = ['innerHTML'],
  dn = ['innerHTML'],
  pn = { key: 0, class: 'actions' },
  vn = { key: 0, class: 'image' },
  fn = { class: 'image-container' },
  mn = h({
    __name: 'VPHero',
    props: { name: {}, text: {}, tagline: {}, image: {}, actions: {} },
    setup(o) {
      const e = x('hero-image-slot-exists')
      return (t, s) => (
        a(),
        l(
          'div',
          { class: N(['VPHero', { 'has-image': t.image || i(e) }]) },
          [
            d('div', an, [
              d('div', rn, [
                c(t.$slots, 'home-hero-info-before', {}, void 0, !0),
                c(
                  t.$slots,
                  'home-hero-info',
                  {},
                  () => [
                    t.name
                      ? (a(),
                        l('h1', ln, [
                          d(
                            'span',
                            { innerHTML: t.name, class: 'clip' },
                            null,
                            8,
                            cn,
                          ),
                        ]))
                      : m('', !0),
                    t.text
                      ? (a(),
                        l(
                          'p',
                          { key: 1, innerHTML: t.text, class: 'text' },
                          null,
                          8,
                          un,
                        ))
                      : m('', !0),
                    t.tagline
                      ? (a(),
                        l(
                          'p',
                          { key: 2, innerHTML: t.tagline, class: 'tagline' },
                          null,
                          8,
                          dn,
                        ))
                      : m('', !0),
                  ],
                  !0,
                ),
                c(t.$slots, 'home-hero-info-after', {}, void 0, !0),
                t.actions
                  ? (a(),
                    l('div', pn, [
                      (a(!0),
                      l(
                        I,
                        null,
                        B(
                          t.actions,
                          (n) => (
                            a(),
                            l('div', { key: n.link, class: 'action' }, [
                              _(
                                nn,
                                {
                                  tag: 'a',
                                  size: 'medium',
                                  theme: n.theme,
                                  text: n.text,
                                  href: n.link,
                                  target: n.target,
                                  rel: n.rel,
                                },
                                null,
                                8,
                                ['theme', 'text', 'href', 'target', 'rel'],
                              ),
                            ])
                          ),
                        ),
                        128,
                      )),
                    ]))
                  : m('', !0),
                c(t.$slots, 'home-hero-actions-after', {}, void 0, !0),
              ]),
              t.image || i(e)
                ? (a(),
                  l('div', vn, [
                    d('div', fn, [
                      s[0] ||
                        (s[0] = d('div', { class: 'image-bg' }, null, -1)),
                      c(
                        t.$slots,
                        'home-hero-image',
                        {},
                        () => [
                          t.image
                            ? (a(),
                              k(
                                Y,
                                { key: 0, class: 'image-src', image: t.image },
                                null,
                                8,
                                ['image'],
                              ))
                            : m('', !0),
                        ],
                        !0,
                      ),
                    ]),
                  ]))
                : m('', !0),
            ]),
          ],
          2,
        )
      )
    },
  }),
  hn = b(mn, [['__scopeId', 'data-v-f69feb9b']]),
  _n = h({
    __name: 'VPHomeHero',
    setup(o) {
      const { frontmatter: e } = P()
      return (t, s) =>
        i(e).hero
          ? (a(),
            k(
              hn,
              {
                key: 0,
                class: 'VPHomeHero',
                name: i(e).hero.name,
                text: i(e).hero.text,
                tagline: i(e).hero.tagline,
                image: i(e).hero.image,
                actions: i(e).hero.actions,
              },
              {
                'home-hero-info-before': v(() => [
                  c(t.$slots, 'home-hero-info-before'),
                ]),
                'home-hero-info': v(() => [c(t.$slots, 'home-hero-info')]),
                'home-hero-info-after': v(() => [
                  c(t.$slots, 'home-hero-info-after'),
                ]),
                'home-hero-actions-after': v(() => [
                  c(t.$slots, 'home-hero-actions-after'),
                ]),
                'home-hero-image': v(() => [c(t.$slots, 'home-hero-image')]),
                _: 3,
              },
              8,
              ['name', 'text', 'tagline', 'image', 'actions'],
            ))
          : m('', !0)
    },
  }),
  kn = { class: 'box' },
  bn = { key: 0, class: 'icon' },
  gn = ['innerHTML'],
  $n = ['innerHTML'],
  yn = ['innerHTML'],
  Pn = { key: 4, class: 'link-text' },
  Ln = { class: 'link-text-value' },
  Vn = h({
    __name: 'VPFeature',
    props: {
      icon: {},
      title: {},
      details: {},
      link: {},
      linkText: {},
      rel: {},
      target: {},
    },
    setup(o) {
      return (e, t) => (
        a(),
        k(
          E,
          {
            class: 'VPFeature',
            href: e.link,
            rel: e.rel,
            target: e.target,
            'no-icon': !0,
            tag: e.link ? 'a' : 'div',
          },
          {
            default: v(() => [
              d('article', kn, [
                typeof e.icon == 'object' && e.icon.wrap
                  ? (a(),
                    l('div', bn, [
                      _(
                        Y,
                        {
                          image: e.icon,
                          alt: e.icon.alt,
                          height: e.icon.height || 48,
                          width: e.icon.width || 48,
                        },
                        null,
                        8,
                        ['image', 'alt', 'height', 'width'],
                      ),
                    ]))
                  : typeof e.icon == 'object'
                    ? (a(),
                      k(
                        Y,
                        {
                          key: 1,
                          image: e.icon,
                          alt: e.icon.alt,
                          height: e.icon.height || 48,
                          width: e.icon.width || 48,
                        },
                        null,
                        8,
                        ['image', 'alt', 'height', 'width'],
                      ))
                    : e.icon
                      ? (a(),
                        l(
                          'div',
                          { key: 2, class: 'icon', innerHTML: e.icon },
                          null,
                          8,
                          gn,
                        ))
                      : m('', !0),
                d('h2', { class: 'title', innerHTML: e.title }, null, 8, $n),
                e.details
                  ? (a(),
                    l(
                      'p',
                      { key: 3, class: 'details', innerHTML: e.details },
                      null,
                      8,
                      yn,
                    ))
                  : m('', !0),
                e.linkText
                  ? (a(),
                    l('div', Pn, [
                      d('p', Ln, [
                        D(T(e.linkText) + ' ', 1),
                        t[0] ||
                          (t[0] = d(
                            'span',
                            { class: 'vpi-arrow-right link-text-icon' },
                            null,
                            -1,
                          )),
                      ]),
                    ]))
                  : m('', !0),
              ]),
            ]),
            _: 1,
          },
          8,
          ['href', 'rel', 'target', 'tag'],
        )
      )
    },
  }),
  Sn = b(Vn, [['__scopeId', 'data-v-11013eaf']]),
  Tn = { key: 0, class: 'VPFeatures' },
  Mn = { class: 'container' },
  Nn = { class: 'items' },
  In = h({
    __name: 'VPFeatures',
    props: { features: {} },
    setup(o) {
      const e = o,
        t = g(() => {
          const s = e.features.length
          if (s) {
            if (s === 2) return 'grid-2'
            if (s === 3) return 'grid-3'
            if (s % 3 === 0) return 'grid-6'
            if (s > 3) return 'grid-4'
          } else return
        })
      return (s, n) =>
        s.features
          ? (a(),
            l('div', Tn, [
              d('div', Mn, [
                d('div', Nn, [
                  (a(!0),
                  l(
                    I,
                    null,
                    B(
                      s.features,
                      (r) => (
                        a(),
                        l(
                          'div',
                          { key: r.title, class: N(['item', [t.value]]) },
                          [
                            _(
                              Sn,
                              {
                                icon: r.icon,
                                title: r.title,
                                details: r.details,
                                link: r.link,
                                'link-text': r.linkText,
                                rel: r.rel,
                                target: r.target,
                              },
                              null,
                              8,
                              [
                                'icon',
                                'title',
                                'details',
                                'link',
                                'link-text',
                                'rel',
                                'target',
                              ],
                            ),
                          ],
                          2,
                        )
                      ),
                    ),
                    128,
                  )),
                ]),
              ]),
            ]))
          : m('', !0)
    },
  }),
  wn = b(In, [['__scopeId', 'data-v-862d61e7']]),
  Hn = h({
    __name: 'VPHomeFeatures',
    setup(o) {
      const { frontmatter: e } = P()
      return (t, s) =>
        i(e).features
          ? (a(),
            k(
              wn,
              { key: 0, class: 'VPHomeFeatures', features: i(e).features },
              null,
              8,
              ['features'],
            ))
          : m('', !0)
    },
  }),
  An = h({
    __name: 'VPHomeContent',
    setup(o) {
      const { width: e } = De({ initialWidth: 0, includeScrollbar: !1 })
      return (t, s) => (
        a(),
        l(
          'div',
          {
            class: 'vp-doc container',
            style: ye(
              i(e) ? { '--vp-offset': `calc(50% - ${i(e) / 2}px)` } : {},
            ),
          },
          [c(t.$slots, 'default', {}, void 0, !0)],
          4,
        )
      )
    },
  }),
  Bn = b(An, [['__scopeId', 'data-v-e2de7f90']]),
  Cn = { class: 'VPHome' },
  En = h({
    __name: 'VPHome',
    setup(o) {
      const { frontmatter: e } = P()
      return (t, s) => {
        const n = W('Content')
        return (
          a(),
          l('div', Cn, [
            c(t.$slots, 'home-hero-before', {}, void 0, !0),
            _(_n, null, {
              'home-hero-info-before': v(() => [
                c(t.$slots, 'home-hero-info-before', {}, void 0, !0),
              ]),
              'home-hero-info': v(() => [
                c(t.$slots, 'home-hero-info', {}, void 0, !0),
              ]),
              'home-hero-info-after': v(() => [
                c(t.$slots, 'home-hero-info-after', {}, void 0, !0),
              ]),
              'home-hero-actions-after': v(() => [
                c(t.$slots, 'home-hero-actions-after', {}, void 0, !0),
              ]),
              'home-hero-image': v(() => [
                c(t.$slots, 'home-hero-image', {}, void 0, !0),
              ]),
              _: 3,
            }),
            c(t.$slots, 'home-hero-after', {}, void 0, !0),
            c(t.$slots, 'home-features-before', {}, void 0, !0),
            _(Hn),
            c(t.$slots, 'home-features-after', {}, void 0, !0),
            i(e).markdownStyles !== !1
              ? (a(), k(Bn, { key: 0 }, { default: v(() => [_(n)]), _: 1 }))
              : (a(), k(n, { key: 1 })),
          ])
        )
      }
    },
  }),
  Fn = b(En, [['__scopeId', 'data-v-7e2be1c8']]),
  Dn = {},
  On = { class: 'VPPage' }
function Gn(o, e) {
  const t = W('Content')
  return (
    a(),
    l('div', On, [c(o.$slots, 'page-top'), _(t), c(o.$slots, 'page-bottom')])
  )
}
const Un = b(Dn, [['render', Gn]]),
  zn = h({
    __name: 'VPContent',
    setup(o) {
      const { page: e, frontmatter: t } = P(),
        { hasSidebar: s } = G()
      return (n, r) => (
        a(),
        l(
          'div',
          {
            class: N([
              'VPContent',
              { 'has-sidebar': i(s), 'is-home': i(t).layout === 'home' },
            ]),
            id: 'VPContent',
          },
          [
            i(e).isNotFound
              ? c(n.$slots, 'not-found', { key: 0 }, () => [_(at)], !0)
              : i(t).layout === 'page'
                ? (a(),
                  k(
                    Un,
                    { key: 1 },
                    {
                      'page-top': v(() => [
                        c(n.$slots, 'page-top', {}, void 0, !0),
                      ]),
                      'page-bottom': v(() => [
                        c(n.$slots, 'page-bottom', {}, void 0, !0),
                      ]),
                      _: 3,
                    },
                  ))
                : i(t).layout === 'home'
                  ? (a(),
                    k(
                      Fn,
                      { key: 2 },
                      {
                        'home-hero-before': v(() => [
                          c(n.$slots, 'home-hero-before', {}, void 0, !0),
                        ]),
                        'home-hero-info-before': v(() => [
                          c(n.$slots, 'home-hero-info-before', {}, void 0, !0),
                        ]),
                        'home-hero-info': v(() => [
                          c(n.$slots, 'home-hero-info', {}, void 0, !0),
                        ]),
                        'home-hero-info-after': v(() => [
                          c(n.$slots, 'home-hero-info-after', {}, void 0, !0),
                        ]),
                        'home-hero-actions-after': v(() => [
                          c(
                            n.$slots,
                            'home-hero-actions-after',
                            {},
                            void 0,
                            !0,
                          ),
                        ]),
                        'home-hero-image': v(() => [
                          c(n.$slots, 'home-hero-image', {}, void 0, !0),
                        ]),
                        'home-hero-after': v(() => [
                          c(n.$slots, 'home-hero-after', {}, void 0, !0),
                        ]),
                        'home-features-before': v(() => [
                          c(n.$slots, 'home-features-before', {}, void 0, !0),
                        ]),
                        'home-features-after': v(() => [
                          c(n.$slots, 'home-features-after', {}, void 0, !0),
                        ]),
                        _: 3,
                      },
                    ))
                  : i(t).layout && i(t).layout !== 'doc'
                    ? (a(), k(F(i(t).layout), { key: 3 }))
                    : (a(),
                      k(
                        en,
                        { key: 4 },
                        {
                          'doc-top': v(() => [
                            c(n.$slots, 'doc-top', {}, void 0, !0),
                          ]),
                          'doc-bottom': v(() => [
                            c(n.$slots, 'doc-bottom', {}, void 0, !0),
                          ]),
                          'doc-footer-before': v(() => [
                            c(n.$slots, 'doc-footer-before', {}, void 0, !0),
                          ]),
                          'doc-before': v(() => [
                            c(n.$slots, 'doc-before', {}, void 0, !0),
                          ]),
                          'doc-after': v(() => [
                            c(n.$slots, 'doc-after', {}, void 0, !0),
                          ]),
                          'aside-top': v(() => [
                            c(n.$slots, 'aside-top', {}, void 0, !0),
                          ]),
                          'aside-outline-before': v(() => [
                            c(n.$slots, 'aside-outline-before', {}, void 0, !0),
                          ]),
                          'aside-outline-after': v(() => [
                            c(n.$slots, 'aside-outline-after', {}, void 0, !0),
                          ]),
                          'aside-ads-before': v(() => [
                            c(n.$slots, 'aside-ads-before', {}, void 0, !0),
                          ]),
                          'aside-ads-after': v(() => [
                            c(n.$slots, 'aside-ads-after', {}, void 0, !0),
                          ]),
                          'aside-bottom': v(() => [
                            c(n.$slots, 'aside-bottom', {}, void 0, !0),
                          ]),
                          _: 3,
                        },
                      )),
          ],
          2,
        )
      )
    },
  }),
  jn = b(zn, [['__scopeId', 'data-v-b44e9cbe']]),
  qn = { class: 'container' },
  Wn = ['innerHTML'],
  Kn = ['innerHTML'],
  Rn = h({
    __name: 'VPFooter',
    setup(o) {
      const { theme: e, frontmatter: t } = P(),
        { hasSidebar: s } = G()
      return (n, r) =>
        i(e).footer && i(t).footer !== !1
          ? (a(),
            l(
              'footer',
              { key: 0, class: N(['VPFooter', { 'has-sidebar': i(s) }]) },
              [
                d('div', qn, [
                  i(e).footer.message
                    ? (a(),
                      l(
                        'p',
                        {
                          key: 0,
                          class: 'message',
                          innerHTML: i(e).footer.message,
                        },
                        null,
                        8,
                        Wn,
                      ))
                    : m('', !0),
                  i(e).footer.copyright
                    ? (a(),
                      l(
                        'p',
                        {
                          key: 1,
                          class: 'copyright',
                          innerHTML: i(e).footer.copyright,
                        },
                        null,
                        8,
                        Kn,
                      ))
                    : m('', !0),
                ]),
              ],
              2,
            ))
          : m('', !0)
    },
  }),
  Jn = b(Rn, [['__scopeId', 'data-v-00289d65']])
function Yn() {
  const { theme: o, frontmatter: e } = P(),
    t = ge([]),
    s = g(() => t.value.length > 0)
  return (
    X(() => {
      t.value = me(e.value.outline ?? o.value.outline)
    }),
    { headers: t, hasLocalNav: s }
  )
}
const Qn = { class: 'menu-text' },
  Xn = { class: 'header' },
  Zn = { class: 'outline' },
  xn = h({
    __name: 'VPLocalNavOutlineDropdown',
    props: { headers: {}, navHeight: {} },
    setup(o) {
      const e = o,
        { theme: t } = P(),
        s = M(!1),
        n = M(0),
        r = M(),
        u = M()
      function f($) {
        var V
        ;((V = r.value) != null && V.contains($.target)) || (s.value = !1)
      }
      O(s, ($) => {
        if ($) {
          document.addEventListener('click', f)
          return
        }
        document.removeEventListener('click', f)
      }),
        Oe('Escape', () => {
          s.value = !1
        }),
        X(() => {
          s.value = !1
        })
      function p() {
        ;(s.value = !s.value),
          (n.value =
            window.innerHeight + Math.min(window.scrollY - e.navHeight, 0))
      }
      function y($) {
        $.target.classList.contains('outline-link') &&
          (u.value && (u.value.style.transition = 'none'),
          Pe(() => {
            s.value = !1
          }))
      }
      function L() {
        ;(s.value = !1),
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }
      return ($, V) => (
        a(),
        l(
          'div',
          {
            class: 'VPLocalNavOutlineDropdown',
            style: ye({ '--vp-vh': n.value + 'px' }),
            ref_key: 'main',
            ref: r,
          },
          [
            $.headers.length > 0
              ? (a(),
                l(
                  'button',
                  { key: 0, onClick: p, class: N({ open: s.value }) },
                  [
                    d('span', Qn, T(i(Me)(i(t))), 1),
                    V[0] ||
                      (V[0] = d(
                        'span',
                        { class: 'vpi-chevron-right icon' },
                        null,
                        -1,
                      )),
                  ],
                  2,
                ))
              : (a(),
                l(
                  'button',
                  { key: 1, onClick: L },
                  T(i(t).returnToTopLabel || 'Return to top'),
                  1,
                )),
            _(
              ue,
              { name: 'flyout' },
              {
                default: v(() => [
                  s.value
                    ? (a(),
                      l(
                        'div',
                        {
                          key: 0,
                          ref_key: 'items',
                          ref: u,
                          class: 'items',
                          onClick: y,
                        },
                        [
                          d('div', Xn, [
                            d(
                              'a',
                              { class: 'top-link', href: '#', onClick: L },
                              T(i(t).returnToTopLabel || 'Return to top'),
                              1,
                            ),
                          ]),
                          d('div', Zn, [
                            _(Ne, { headers: $.headers }, null, 8, ['headers']),
                          ]),
                        ],
                        512,
                      ))
                    : m('', !0),
                ]),
                _: 1,
              },
            ),
          ],
          4,
        )
      )
    },
  }),
  es = b(xn, [['__scopeId', 'data-v-276378c2']]),
  ts = { class: 'container' },
  ns = ['aria-expanded'],
  ss = { class: 'menu-text' },
  os = h({
    __name: 'VPLocalNav',
    props: { open: { type: Boolean } },
    emits: ['open-menu'],
    setup(o) {
      const { theme: e, frontmatter: t } = P(),
        { hasSidebar: s } = G(),
        { headers: n } = Yn(),
        { y: r } = Le(),
        u = M(0)
      j(() => {
        u.value = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--vp-nav-height',
          ),
        )
      }),
        X(() => {
          n.value = me(t.value.outline ?? e.value.outline)
        })
      const f = g(() => n.value.length === 0),
        p = g(() => f.value && !s.value),
        y = g(() => ({
          VPLocalNav: !0,
          'has-sidebar': s.value,
          empty: f.value,
          fixed: p.value,
        }))
      return (L, $) =>
        i(t).layout !== 'home' && (!p.value || i(r) >= u.value)
          ? (a(),
            l(
              'div',
              { key: 0, class: N(y.value) },
              [
                d('div', ts, [
                  i(s)
                    ? (a(),
                      l(
                        'button',
                        {
                          key: 0,
                          class: 'menu',
                          'aria-expanded': L.open,
                          'aria-controls': 'VPSidebarNav',
                          onClick: $[0] || ($[0] = (V) => L.$emit('open-menu')),
                        },
                        [
                          $[1] ||
                            ($[1] = d(
                              'span',
                              { class: 'vpi-align-left menu-icon' },
                              null,
                              -1,
                            )),
                          d('span', ss, T(i(e).sidebarMenuLabel || 'Menu'), 1),
                        ],
                        8,
                        ns,
                      ))
                    : m('', !0),
                  _(es, { headers: i(n), navHeight: u.value }, null, 8, [
                    'headers',
                    'navHeight',
                  ]),
                ]),
              ],
              2,
            ))
          : m('', !0)
    },
  }),
  as = b(os, [['__scopeId', 'data-v-478d6502']])
function rs() {
  const o = M(!1)
  function e() {
    ;(o.value = !0), window.addEventListener('resize', n)
  }
  function t() {
    ;(o.value = !1), window.removeEventListener('resize', n)
  }
  function s() {
    o.value ? t() : e()
  }
  function n() {
    window.outerWidth >= 768 && t()
  }
  const r = Z()
  return (
    O(() => r.path, t),
    { isScreenOpen: o, openScreen: e, closeScreen: t, toggleScreen: s }
  )
}
const is = {},
  ls = { class: 'VPSwitch', type: 'button', role: 'switch' },
  cs = { class: 'check' },
  us = { key: 0, class: 'icon' }
function ds(o, e) {
  return (
    a(),
    l('button', ls, [
      d('span', cs, [
        o.$slots.default
          ? (a(), l('span', us, [c(o.$slots, 'default', {}, void 0, !0)]))
          : m('', !0),
      ]),
    ])
  )
}
const ps = b(is, [
    ['render', ds],
    ['__scopeId', 'data-v-6772a238'],
  ]),
  vs = h({
    __name: 'VPSwitchAppearance',
    setup(o) {
      const { isDark: e, theme: t } = P(),
        s = x('toggle-appearance', () => {
          e.value = !e.value
        }),
        n = M('')
      return (
        ve(() => {
          n.value = e.value
            ? t.value.lightModeSwitchTitle || 'Switch to light theme'
            : t.value.darkModeSwitchTitle || 'Switch to dark theme'
        }),
        (r, u) => (
          a(),
          k(
            ps,
            {
              title: n.value,
              class: 'VPSwitchAppearance',
              'aria-checked': i(e),
              onClick: i(s),
            },
            {
              default: v(
                () =>
                  u[0] ||
                  (u[0] = [
                    d('span', { class: 'vpi-sun sun' }, null, -1),
                    d('span', { class: 'vpi-moon moon' }, null, -1),
                  ]),
              ),
              _: 1,
            },
            8,
            ['title', 'aria-checked', 'onClick'],
          )
        )
      )
    },
  }),
  he = b(vs, [['__scopeId', 'data-v-dc6b490d']]),
  fs = { key: 0, class: 'VPNavBarAppearance' },
  ms = h({
    __name: 'VPNavBarAppearance',
    setup(o) {
      const { site: e } = P()
      return (t, s) =>
        i(e).appearance &&
        i(e).appearance !== 'force-dark' &&
        i(e).appearance !== 'force-auto'
          ? (a(), l('div', fs, [_(he)]))
          : m('', !0)
    },
  }),
  hs = b(ms, [['__scopeId', 'data-v-d3bb4549']]),
  _e = M()
let Ie = !1,
  ae = 0
function _s(o) {
  const e = M(!1)
  if (ee) {
    !Ie && ks(), ae++
    const t = O(_e, (s) => {
      var n, r, u
      s === o.el.value || ((n = o.el.value) != null && n.contains(s))
        ? ((e.value = !0), (r = o.onFocus) == null || r.call(o))
        : ((e.value = !1), (u = o.onBlur) == null || u.call(o))
    })
    pe(() => {
      t(), ae--, ae || bs()
    })
  }
  return Ge(e)
}
function ks() {
  document.addEventListener('focusin', we),
    (Ie = !0),
    (_e.value = document.activeElement)
}
function bs() {
  document.removeEventListener('focusin', we)
}
function we() {
  _e.value = document.activeElement
}
const gs = { class: 'VPMenuLink' },
  $s = ['innerHTML'],
  ys = h({
    __name: 'VPMenuLink',
    props: { item: {} },
    setup(o) {
      const { page: e } = P()
      return (t, s) => (
        a(),
        l('div', gs, [
          _(
            E,
            {
              class: N({
                active: i(q)(
                  i(e).relativePath,
                  t.item.activeMatch || t.item.link,
                  !!t.item.activeMatch,
                ),
              }),
              href: t.item.link,
              target: t.item.target,
              rel: t.item.rel,
              'no-icon': t.item.noIcon,
            },
            {
              default: v(() => [
                d('span', { innerHTML: t.item.text }, null, 8, $s),
              ]),
              _: 1,
            },
            8,
            ['class', 'href', 'target', 'rel', 'no-icon'],
          ),
        ])
      )
    },
  }),
  te = b(ys, [['__scopeId', 'data-v-8006bb3e']]),
  Ps = { class: 'VPMenuGroup' },
  Ls = { key: 0, class: 'title' },
  Vs = h({
    __name: 'VPMenuGroup',
    props: { text: {}, items: {} },
    setup(o) {
      return (e, t) => (
        a(),
        l('div', Ps, [
          e.text ? (a(), l('p', Ls, T(e.text), 1)) : m('', !0),
          (a(!0),
          l(
            I,
            null,
            B(
              e.items,
              (s) => (
                a(),
                l(
                  I,
                  null,
                  [
                    'link' in s
                      ? (a(), k(te, { key: 0, item: s }, null, 8, ['item']))
                      : m('', !0),
                  ],
                  64,
                )
              ),
            ),
            256,
          )),
        ])
      )
    },
  }),
  Ss = b(Vs, [['__scopeId', 'data-v-b7d9ceea']]),
  Ts = { class: 'VPMenu' },
  Ms = { key: 0, class: 'items' },
  Ns = h({
    __name: 'VPMenu',
    props: { items: {} },
    setup(o) {
      return (e, t) => (
        a(),
        l('div', Ts, [
          e.items
            ? (a(),
              l('div', Ms, [
                (a(!0),
                l(
                  I,
                  null,
                  B(
                    e.items,
                    (s) => (
                      a(),
                      l(
                        I,
                        { key: JSON.stringify(s) },
                        [
                          'link' in s
                            ? (a(),
                              k(te, { key: 0, item: s }, null, 8, ['item']))
                            : 'component' in s
                              ? (a(),
                                k(
                                  F(s.component),
                                  z({ key: 1, ref_for: !0 }, s.props),
                                  null,
                                  16,
                                ))
                              : (a(),
                                k(
                                  Ss,
                                  { key: 2, text: s.text, items: s.items },
                                  null,
                                  8,
                                  ['text', 'items'],
                                )),
                        ],
                        64,
                      )
                    ),
                  ),
                  128,
                )),
              ]))
            : m('', !0),
          c(e.$slots, 'default', {}, void 0, !0),
        ])
      )
    },
  }),
  Is = b(Ns, [['__scopeId', 'data-v-b3ae84fe']]),
  ws = ['aria-expanded', 'aria-label'],
  Hs = { key: 0, class: 'text' },
  As = ['innerHTML'],
  Bs = { key: 1, class: 'vpi-more-horizontal icon' },
  Cs = { class: 'menu' },
  Es = h({
    __name: 'VPFlyout',
    props: { icon: {}, button: {}, label: {}, items: {} },
    setup(o) {
      const e = M(!1),
        t = M()
      _s({ el: t, onBlur: s })
      function s() {
        e.value = !1
      }
      return (n, r) => (
        a(),
        l(
          'div',
          {
            class: 'VPFlyout',
            ref_key: 'el',
            ref: t,
            onMouseenter: r[1] || (r[1] = (u) => (e.value = !0)),
            onMouseleave: r[2] || (r[2] = (u) => (e.value = !1)),
          },
          [
            d(
              'button',
              {
                type: 'button',
                class: 'button',
                'aria-haspopup': 'true',
                'aria-expanded': e.value,
                'aria-label': n.label,
                onClick: r[0] || (r[0] = (u) => (e.value = !e.value)),
              },
              [
                n.button || n.icon
                  ? (a(),
                    l('span', Hs, [
                      n.icon
                        ? (a(),
                          l(
                            'span',
                            { key: 0, class: N([n.icon, 'option-icon']) },
                            null,
                            2,
                          ))
                        : m('', !0),
                      n.button
                        ? (a(),
                          l(
                            'span',
                            { key: 1, innerHTML: n.button },
                            null,
                            8,
                            As,
                          ))
                        : m('', !0),
                      r[3] ||
                        (r[3] = d(
                          'span',
                          { class: 'vpi-chevron-down text-icon' },
                          null,
                          -1,
                        )),
                    ]))
                  : (a(), l('span', Bs)),
              ],
              8,
              ws,
            ),
            d('div', Cs, [
              _(
                Is,
                { items: n.items },
                {
                  default: v(() => [c(n.$slots, 'default', {}, void 0, !0)]),
                  _: 3,
                },
                8,
                ['items'],
              ),
            ]),
          ],
          544,
        )
      )
    },
  }),
  ke = b(Es, [['__scopeId', 'data-v-0350f463']]),
  Fs = ['href', 'aria-label', 'innerHTML'],
  Ds = h({
    __name: 'VPSocialLink',
    props: { icon: {}, link: {}, ariaLabel: {} },
    setup(o) {
      const e = o,
        t = M()
      j(async () => {
        var r
        await Pe()
        const n = (r = t.value) == null ? void 0 : r.children[0]
        n instanceof HTMLElement &&
          n.className.startsWith('vpi-social-') &&
          (getComputedStyle(n).maskImage ||
            getComputedStyle(n).webkitMaskImage) === 'none' &&
          n.style.setProperty(
            '--icon',
            `url('https://api.iconify.design/simple-icons/${e.icon}.svg')`,
          )
      })
      const s = g(() =>
        typeof e.icon == 'object'
          ? e.icon.svg
          : `<span class="vpi-social-${e.icon}"></span>`,
      )
      return (n, r) => (
        a(),
        l(
          'a',
          {
            ref_key: 'el',
            ref: t,
            class: 'VPSocialLink no-icon',
            href: n.link,
            'aria-label':
              n.ariaLabel ?? (typeof n.icon == 'string' ? n.icon : ''),
            target: '_blank',
            rel: 'noopener',
            innerHTML: s.value,
          },
          null,
          8,
          Fs,
        )
      )
    },
  }),
  Os = b(Ds, [['__scopeId', 'data-v-63593759']]),
  Gs = { class: 'VPSocialLinks' },
  Us = h({
    __name: 'VPSocialLinks',
    props: { links: {} },
    setup(o) {
      return (e, t) => (
        a(),
        l('div', Gs, [
          (a(!0),
          l(
            I,
            null,
            B(
              e.links,
              ({ link: s, icon: n, ariaLabel: r }) => (
                a(),
                k(Os, { key: s, icon: n, link: s, ariaLabel: r }, null, 8, [
                  'icon',
                  'link',
                  'ariaLabel',
                ])
              ),
            ),
            128,
          )),
        ])
      )
    },
  }),
  ne = b(Us, [['__scopeId', 'data-v-35da1b18']]),
  zs = { key: 0, class: 'group translations' },
  js = { class: 'trans-title' },
  qs = { key: 1, class: 'group' },
  Ws = { class: 'item appearance' },
  Ks = { class: 'label' },
  Rs = { class: 'appearance-action' },
  Js = { key: 2, class: 'group' },
  Ys = { class: 'item social-links' },
  Qs = h({
    __name: 'VPNavBarExtra',
    setup(o) {
      const { site: e, theme: t } = P(),
        { localeLinks: s, currentLang: n } = R({ correspondingLink: !0 }),
        r = g(
          () =>
            (s.value.length && n.value.label) ||
            e.value.appearance ||
            t.value.socialLinks,
        )
      return (u, f) =>
        r.value
          ? (a(),
            k(
              ke,
              { key: 0, class: 'VPNavBarExtra', label: 'extra navigation' },
              {
                default: v(() => [
                  i(s).length && i(n).label
                    ? (a(),
                      l('div', zs, [
                        d('p', js, T(i(n).label), 1),
                        (a(!0),
                        l(
                          I,
                          null,
                          B(
                            i(s),
                            (p) => (
                              a(),
                              k(te, { key: p.link, item: p }, null, 8, ['item'])
                            ),
                          ),
                          128,
                        )),
                      ]))
                    : m('', !0),
                  i(e).appearance &&
                  i(e).appearance !== 'force-dark' &&
                  i(e).appearance !== 'force-auto'
                    ? (a(),
                      l('div', qs, [
                        d('div', Ws, [
                          d(
                            'p',
                            Ks,
                            T(i(t).darkModeSwitchLabel || 'Appearance'),
                            1,
                          ),
                          d('div', Rs, [_(he)]),
                        ]),
                      ]))
                    : m('', !0),
                  i(t).socialLinks
                    ? (a(),
                      l('div', Js, [
                        d('div', Ys, [
                          _(
                            ne,
                            {
                              class: 'social-links-list',
                              links: i(t).socialLinks,
                            },
                            null,
                            8,
                            ['links'],
                          ),
                        ]),
                      ]))
                    : m('', !0),
                ]),
                _: 1,
              },
            ))
          : m('', !0)
    },
  }),
  Xs = b(Qs, [['__scopeId', 'data-v-c320b050']]),
  Zs = ['aria-expanded'],
  xs = h({
    __name: 'VPNavBarHamburger',
    props: { active: { type: Boolean } },
    emits: ['click'],
    setup(o) {
      return (e, t) => (
        a(),
        l(
          'button',
          {
            type: 'button',
            class: N(['VPNavBarHamburger', { active: e.active }]),
            'aria-label': 'mobile navigation',
            'aria-expanded': e.active,
            'aria-controls': 'VPNavScreen',
            onClick: t[0] || (t[0] = (s) => e.$emit('click')),
          },
          t[1] ||
            (t[1] = [
              d(
                'span',
                { class: 'container' },
                [
                  d('span', { class: 'top' }),
                  d('span', { class: 'middle' }),
                  d('span', { class: 'bottom' }),
                ],
                -1,
              ),
            ]),
          10,
          Zs,
        )
      )
    },
  }),
  eo = b(xs, [['__scopeId', 'data-v-15a05419']]),
  to = ['innerHTML'],
  no = h({
    __name: 'VPNavBarMenuLink',
    props: { item: {} },
    setup(o) {
      const { page: e } = P()
      return (t, s) => (
        a(),
        k(
          E,
          {
            class: N({
              VPNavBarMenuLink: !0,
              active: i(q)(
                i(e).relativePath,
                t.item.activeMatch || t.item.link,
                !!t.item.activeMatch,
              ),
            }),
            href: t.item.link,
            target: t.item.target,
            rel: t.item.rel,
            'no-icon': t.item.noIcon,
            tabindex: '0',
          },
          {
            default: v(() => [
              d('span', { innerHTML: t.item.text }, null, 8, to),
            ]),
            _: 1,
          },
          8,
          ['class', 'href', 'target', 'rel', 'no-icon'],
        )
      )
    },
  }),
  so = b(no, [['__scopeId', 'data-v-59eedca3']]),
  oo = h({
    __name: 'VPNavBarMenuGroup',
    props: { item: {} },
    setup(o) {
      const e = o,
        { page: t } = P(),
        s = (r) =>
          'component' in r
            ? !1
            : 'link' in r
              ? q(t.value.relativePath, r.link, !!e.item.activeMatch)
              : r.items.some(s),
        n = g(() => s(e.item))
      return (r, u) => (
        a(),
        k(
          ke,
          {
            class: N({
              VPNavBarMenuGroup: !0,
              active:
                i(q)(
                  i(t).relativePath,
                  r.item.activeMatch,
                  !!r.item.activeMatch,
                ) || n.value,
            }),
            button: r.item.text,
            items: r.item.items,
          },
          null,
          8,
          ['class', 'button', 'items'],
        )
      )
    },
  }),
  ao = {
    key: 0,
    'aria-labelledby': 'main-nav-aria-label',
    class: 'VPNavBarMenu',
  },
  ro = h({
    __name: 'VPNavBarMenu',
    setup(o) {
      const { theme: e } = P()
      return (t, s) =>
        i(e).nav
          ? (a(),
            l('nav', ao, [
              s[0] ||
                (s[0] = d(
                  'span',
                  { id: 'main-nav-aria-label', class: 'visually-hidden' },
                  ' Main Navigation ',
                  -1,
                )),
              (a(!0),
              l(
                I,
                null,
                B(
                  i(e).nav,
                  (n) => (
                    a(),
                    l(
                      I,
                      { key: JSON.stringify(n) },
                      [
                        'link' in n
                          ? (a(), k(so, { key: 0, item: n }, null, 8, ['item']))
                          : 'component' in n
                            ? (a(),
                              k(
                                F(n.component),
                                z({ key: 1, ref_for: !0 }, n.props),
                                null,
                                16,
                              ))
                            : (a(),
                              k(oo, { key: 2, item: n }, null, 8, ['item'])),
                      ],
                      64,
                    )
                  ),
                ),
                128,
              )),
            ]))
          : m('', !0)
    },
  }),
  io = b(ro, [['__scopeId', 'data-v-22e03c10']])
function lo(o) {
  const { localeIndex: e, theme: t } = P()
  function s(n) {
    var H, A, S
    const r = n.split('.'),
      u = (H = t.value.search) == null ? void 0 : H.options,
      f = u && typeof u == 'object',
      p =
        (f &&
          ((S = (A = u.locales) == null ? void 0 : A[e.value]) == null
            ? void 0
            : S.translations)) ||
        null,
      y = (f && u.translations) || null
    let L = p,
      $ = y,
      V = o
    const w = r.pop()
    for (const C of r) {
      let U = null
      const K = V == null ? void 0 : V[C]
      K && (U = V = K)
      const se = $ == null ? void 0 : $[C]
      se && (U = $ = se)
      const oe = L == null ? void 0 : L[C]
      oe && (U = L = oe), K || (V = U), se || ($ = U), oe || (L = U)
    }
    return (
      (L == null ? void 0 : L[w]) ??
      ($ == null ? void 0 : $[w]) ??
      (V == null ? void 0 : V[w]) ??
      ''
    )
  }
  return s
}
const co = ['aria-label'],
  uo = { class: 'DocSearch-Button-Container' },
  po = { class: 'DocSearch-Button-Placeholder' },
  be = h({
    __name: 'VPNavBarSearchButton',
    setup(o) {
      const t = lo({
        button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
      })
      return (s, n) => (
        a(),
        l(
          'button',
          {
            type: 'button',
            class: 'DocSearch DocSearch-Button',
            'aria-label': i(t)('button.buttonAriaLabel'),
          },
          [
            d('span', uo, [
              n[0] ||
                (n[0] = d(
                  'span',
                  { class: 'vp-icon DocSearch-Search-Icon' },
                  null,
                  -1,
                )),
              d('span', po, T(i(t)('button.buttonText')), 1),
            ]),
            n[1] ||
              (n[1] = d(
                'span',
                { class: 'DocSearch-Button-Keys' },
                [
                  d('kbd', { class: 'DocSearch-Button-Key' }),
                  d('kbd', { class: 'DocSearch-Button-Key' }, 'K'),
                ],
                -1,
              )),
          ],
          8,
          co,
        )
      )
    },
  }),
  vo = { class: 'VPNavBarSearch' },
  fo = { id: 'local-search' },
  mo = { key: 1, id: 'docsearch' },
  ho = h({
    __name: 'VPNavBarSearch',
    setup(o) {
      const e = () => null,
        t = () => null,
        { theme: s } = P(),
        n = M(!1),
        r = M(!1)
      j(() => {})
      function u() {
        n.value || ((n.value = !0), setTimeout(f, 16))
      }
      function f() {
        const L = new Event('keydown')
        ;(L.key = 'k'),
          (L.metaKey = !0),
          window.dispatchEvent(L),
          setTimeout(() => {
            document.querySelector('.DocSearch-Modal') || f()
          }, 16)
      }
      const p = M(!1),
        y = ''
      return (L, $) => {
        var V
        return (
          a(),
          l('div', vo, [
            i(y) === 'local'
              ? (a(),
                l(
                  I,
                  { key: 0 },
                  [
                    p.value
                      ? (a(),
                        k(i(e), {
                          key: 0,
                          onClose: $[0] || ($[0] = (w) => (p.value = !1)),
                        }))
                      : m('', !0),
                    d('div', fo, [
                      _(be, {
                        onClick: $[1] || ($[1] = (w) => (p.value = !0)),
                      }),
                    ]),
                  ],
                  64,
                ))
              : i(y) === 'algolia'
                ? (a(),
                  l(
                    I,
                    { key: 1 },
                    [
                      n.value
                        ? (a(),
                          k(
                            i(t),
                            {
                              key: 0,
                              algolia:
                                ((V = i(s).search) == null
                                  ? void 0
                                  : V.options) ?? i(s).algolia,
                              onVnodeBeforeMount:
                                $[2] || ($[2] = (w) => (r.value = !0)),
                            },
                            null,
                            8,
                            ['algolia'],
                          ))
                        : m('', !0),
                      r.value
                        ? m('', !0)
                        : (a(), l('div', mo, [_(be, { onClick: u })])),
                    ],
                    64,
                  ))
                : m('', !0),
          ])
        )
      }
    },
  }),
  _o = h({
    __name: 'VPNavBarSocialLinks',
    setup(o) {
      const { theme: e } = P()
      return (t, s) =>
        i(e).socialLinks
          ? (a(),
            k(
              ne,
              { key: 0, class: 'VPNavBarSocialLinks', links: i(e).socialLinks },
              null,
              8,
              ['links'],
            ))
          : m('', !0)
    },
  }),
  ko = b(_o, [['__scopeId', 'data-v-2a1d613b']]),
  bo = ['href', 'rel', 'target'],
  go = ['innerHTML'],
  $o = { key: 2 },
  yo = h({
    __name: 'VPNavBarTitle',
    setup(o) {
      const { site: e, theme: t } = P(),
        { hasSidebar: s } = G(),
        { currentLang: n } = R(),
        r = g(() => {
          var p
          return typeof t.value.logoLink == 'string'
            ? t.value.logoLink
            : (p = t.value.logoLink) == null
              ? void 0
              : p.link
        }),
        u = g(() => {
          var p
          return typeof t.value.logoLink == 'string' ||
            (p = t.value.logoLink) == null
            ? void 0
            : p.rel
        }),
        f = g(() => {
          var p
          return typeof t.value.logoLink == 'string' ||
            (p = t.value.logoLink) == null
            ? void 0
            : p.target
        })
      return (p, y) => (
        a(),
        l(
          'div',
          { class: N(['VPNavBarTitle', { 'has-sidebar': i(s) }]) },
          [
            d(
              'a',
              {
                class: 'title',
                href: r.value ?? i(fe)(i(n).link),
                rel: u.value,
                target: f.value,
              },
              [
                c(p.$slots, 'nav-bar-title-before', {}, void 0, !0),
                i(t).logo
                  ? (a(),
                    k(Y, { key: 0, class: 'logo', image: i(t).logo }, null, 8, [
                      'image',
                    ]))
                  : m('', !0),
                i(t).siteTitle
                  ? (a(),
                    l(
                      'span',
                      { key: 1, innerHTML: i(t).siteTitle },
                      null,
                      8,
                      go,
                    ))
                  : i(t).siteTitle === void 0
                    ? (a(), l('span', $o, T(i(e).title), 1))
                    : m('', !0),
                c(p.$slots, 'nav-bar-title-after', {}, void 0, !0),
              ],
              8,
              bo,
            ),
          ],
          2,
        )
      )
    },
  }),
  Po = b(yo, [['__scopeId', 'data-v-41f1c3cb']]),
  Lo = { class: 'items' },
  Vo = { class: 'title' },
  So = h({
    __name: 'VPNavBarTranslations',
    setup(o) {
      const { theme: e } = P(),
        { localeLinks: t, currentLang: s } = R({ correspondingLink: !0 })
      return (n, r) =>
        i(t).length && i(s).label
          ? (a(),
            k(
              ke,
              {
                key: 0,
                class: 'VPNavBarTranslations',
                icon: 'vpi-languages',
                label: i(e).langMenuLabel || 'Change language',
              },
              {
                default: v(() => [
                  d('div', Lo, [
                    d('p', Vo, T(i(s).label), 1),
                    (a(!0),
                    l(
                      I,
                      null,
                      B(
                        i(t),
                        (u) => (
                          a(),
                          k(te, { key: u.link, item: u }, null, 8, ['item'])
                        ),
                      ),
                      128,
                    )),
                  ]),
                ]),
                _: 1,
              },
              8,
              ['label'],
            ))
          : m('', !0)
    },
  }),
  To = b(So, [['__scopeId', 'data-v-57969b17']]),
  Mo = { class: 'wrapper' },
  No = { class: 'container' },
  Io = { class: 'title' },
  wo = { class: 'content' },
  Ho = { class: 'content-body' },
  Ao = h({
    __name: 'VPNavBar',
    props: { isScreenOpen: { type: Boolean } },
    emits: ['toggle-screen'],
    setup(o) {
      const e = o,
        { y: t } = Le(),
        { hasSidebar: s } = G(),
        { frontmatter: n } = P(),
        r = M({})
      return (
        ve(() => {
          r.value = {
            'has-sidebar': s.value,
            home: n.value.layout === 'home',
            top: t.value === 0,
            'screen-open': e.isScreenOpen,
          }
        }),
        (u, f) => (
          a(),
          l(
            'div',
            { class: N(['VPNavBar', r.value]) },
            [
              d('div', Mo, [
                d('div', No, [
                  d('div', Io, [
                    _(Po, null, {
                      'nav-bar-title-before': v(() => [
                        c(u.$slots, 'nav-bar-title-before', {}, void 0, !0),
                      ]),
                      'nav-bar-title-after': v(() => [
                        c(u.$slots, 'nav-bar-title-after', {}, void 0, !0),
                      ]),
                      _: 3,
                    }),
                  ]),
                  d('div', wo, [
                    d('div', Ho, [
                      c(u.$slots, 'nav-bar-content-before', {}, void 0, !0),
                      _(ho, { class: 'search' }),
                      _(io, { class: 'menu' }),
                      _(To, { class: 'translations' }),
                      _(hs, { class: 'appearance' }),
                      _(ko, { class: 'social-links' }),
                      _(Xs, { class: 'extra' }),
                      c(u.$slots, 'nav-bar-content-after', {}, void 0, !0),
                      _(
                        eo,
                        {
                          class: 'hamburger',
                          active: u.isScreenOpen,
                          onClick:
                            f[0] || (f[0] = (p) => u.$emit('toggle-screen')),
                        },
                        null,
                        8,
                        ['active'],
                      ),
                    ]),
                  ]),
                ]),
              ]),
              f[1] ||
                (f[1] = d(
                  'div',
                  { class: 'divider' },
                  [d('div', { class: 'divider-line' })],
                  -1,
                )),
            ],
            2,
          )
        )
      )
    },
  }),
  Bo = b(Ao, [['__scopeId', 'data-v-a786b0ba']]),
  Co = { key: 0, class: 'VPNavScreenAppearance' },
  Eo = { class: 'text' },
  Fo = h({
    __name: 'VPNavScreenAppearance',
    setup(o) {
      const { site: e, theme: t } = P()
      return (s, n) =>
        i(e).appearance &&
        i(e).appearance !== 'force-dark' &&
        i(e).appearance !== 'force-auto'
          ? (a(),
            l('div', Co, [
              d('p', Eo, T(i(t).darkModeSwitchLabel || 'Appearance'), 1),
              _(he),
            ]))
          : m('', !0)
    },
  }),
  Do = b(Fo, [['__scopeId', 'data-v-494f23a1']]),
  Oo = ['innerHTML'],
  Go = h({
    __name: 'VPNavScreenMenuLink',
    props: { item: {} },
    setup(o) {
      const e = x('close-screen')
      return (t, s) => (
        a(),
        k(
          E,
          {
            class: 'VPNavScreenMenuLink',
            href: t.item.link,
            target: t.item.target,
            rel: t.item.rel,
            'no-icon': t.item.noIcon,
            onClick: i(e),
          },
          {
            default: v(() => [
              d('span', { innerHTML: t.item.text }, null, 8, Oo),
            ]),
            _: 1,
          },
          8,
          ['href', 'target', 'rel', 'no-icon', 'onClick'],
        )
      )
    },
  }),
  Uo = b(Go, [['__scopeId', 'data-v-d2005741']]),
  zo = ['innerHTML'],
  jo = h({
    __name: 'VPNavScreenMenuGroupLink',
    props: { item: {} },
    setup(o) {
      const e = x('close-screen')
      return (t, s) => (
        a(),
        k(
          E,
          {
            class: 'VPNavScreenMenuGroupLink',
            href: t.item.link,
            target: t.item.target,
            rel: t.item.rel,
            'no-icon': t.item.noIcon,
            onClick: i(e),
          },
          {
            default: v(() => [
              d('span', { innerHTML: t.item.text }, null, 8, zo),
            ]),
            _: 1,
          },
          8,
          ['href', 'target', 'rel', 'no-icon', 'onClick'],
        )
      )
    },
  }),
  He = b(jo, [['__scopeId', 'data-v-c7f1fb0e']]),
  qo = { class: 'VPNavScreenMenuGroupSection' },
  Wo = { key: 0, class: 'title' },
  Ko = h({
    __name: 'VPNavScreenMenuGroupSection',
    props: { text: {}, items: {} },
    setup(o) {
      return (e, t) => (
        a(),
        l('div', qo, [
          e.text ? (a(), l('p', Wo, T(e.text), 1)) : m('', !0),
          (a(!0),
          l(
            I,
            null,
            B(
              e.items,
              (s) => (a(), k(He, { key: s.text, item: s }, null, 8, ['item'])),
            ),
            128,
          )),
        ])
      )
    },
  }),
  Ro = b(Ko, [['__scopeId', 'data-v-b7009cd9']]),
  Jo = ['aria-controls', 'aria-expanded'],
  Yo = ['innerHTML'],
  Qo = ['id'],
  Xo = { key: 0, class: 'item' },
  Zo = { key: 1, class: 'item' },
  xo = { key: 2, class: 'group' },
  ea = h({
    __name: 'VPNavScreenMenuGroup',
    props: { text: {}, items: {} },
    setup(o) {
      const e = o,
        t = M(!1),
        s = g(() => `NavScreenGroup-${e.text.replace(' ', '-').toLowerCase()}`)
      function n() {
        t.value = !t.value
      }
      return (r, u) => (
        a(),
        l(
          'div',
          { class: N(['VPNavScreenMenuGroup', { open: t.value }]) },
          [
            d(
              'button',
              {
                class: 'button',
                'aria-controls': s.value,
                'aria-expanded': t.value,
                onClick: n,
              },
              [
                d(
                  'span',
                  { class: 'button-text', innerHTML: r.text },
                  null,
                  8,
                  Yo,
                ),
                u[0] ||
                  (u[0] = d(
                    'span',
                    { class: 'vpi-plus button-icon' },
                    null,
                    -1,
                  )),
              ],
              8,
              Jo,
            ),
            d(
              'div',
              { id: s.value, class: 'items' },
              [
                (a(!0),
                l(
                  I,
                  null,
                  B(
                    r.items,
                    (f) => (
                      a(),
                      l(
                        I,
                        { key: JSON.stringify(f) },
                        [
                          'link' in f
                            ? (a(),
                              l('div', Xo, [
                                _(He, { item: f }, null, 8, ['item']),
                              ]))
                            : 'component' in f
                              ? (a(),
                                l('div', Zo, [
                                  (a(),
                                  k(
                                    F(f.component),
                                    z({ ref_for: !0 }, f.props, {
                                      'screen-menu': '',
                                    }),
                                    null,
                                    16,
                                  )),
                                ]))
                              : (a(),
                                l('div', xo, [
                                  _(
                                    Ro,
                                    { text: f.text, items: f.items },
                                    null,
                                    8,
                                    ['text', 'items'],
                                  ),
                                ])),
                        ],
                        64,
                      )
                    ),
                  ),
                  128,
                )),
              ],
              8,
              Qo,
            ),
          ],
          2,
        )
      )
    },
  }),
  ta = b(ea, [['__scopeId', 'data-v-104105f6']]),
  na = { key: 0, class: 'VPNavScreenMenu' },
  sa = h({
    __name: 'VPNavScreenMenu',
    setup(o) {
      const { theme: e } = P()
      return (t, s) =>
        i(e).nav
          ? (a(),
            l('nav', na, [
              (a(!0),
              l(
                I,
                null,
                B(
                  i(e).nav,
                  (n) => (
                    a(),
                    l(
                      I,
                      { key: JSON.stringify(n) },
                      [
                        'link' in n
                          ? (a(), k(Uo, { key: 0, item: n }, null, 8, ['item']))
                          : 'component' in n
                            ? (a(),
                              k(
                                F(n.component),
                                z({ key: 1, ref_for: !0 }, n.props, {
                                  'screen-menu': '',
                                }),
                                null,
                                16,
                              ))
                            : (a(),
                              k(
                                ta,
                                { key: 2, text: n.text || '', items: n.items },
                                null,
                                8,
                                ['text', 'items'],
                              )),
                      ],
                      64,
                    )
                  ),
                ),
                128,
              )),
            ]))
          : m('', !0)
    },
  }),
  oa = h({
    __name: 'VPNavScreenSocialLinks',
    setup(o) {
      const { theme: e } = P()
      return (t, s) =>
        i(e).socialLinks
          ? (a(),
            k(
              ne,
              {
                key: 0,
                class: 'VPNavScreenSocialLinks',
                links: i(e).socialLinks,
              },
              null,
              8,
              ['links'],
            ))
          : m('', !0)
    },
  }),
  aa = { class: 'list' },
  ra = h({
    __name: 'VPNavScreenTranslations',
    setup(o) {
      const { localeLinks: e, currentLang: t } = R({ correspondingLink: !0 }),
        s = M(!1)
      function n() {
        s.value = !s.value
      }
      return (r, u) =>
        i(e).length && i(t).label
          ? (a(),
            l(
              'div',
              {
                key: 0,
                class: N(['VPNavScreenTranslations', { open: s.value }]),
              },
              [
                d('button', { class: 'title', onClick: n }, [
                  u[0] ||
                    (u[0] = d(
                      'span',
                      { class: 'vpi-languages icon lang' },
                      null,
                      -1,
                    )),
                  D(' ' + T(i(t).label) + ' ', 1),
                  u[1] ||
                    (u[1] = d(
                      'span',
                      { class: 'vpi-chevron-down icon chevron' },
                      null,
                      -1,
                    )),
                ]),
                d('ul', aa, [
                  (a(!0),
                  l(
                    I,
                    null,
                    B(
                      i(e),
                      (f) => (
                        a(),
                        l('li', { key: f.link, class: 'item' }, [
                          _(
                            E,
                            { class: 'link', href: f.link },
                            { default: v(() => [D(T(f.text), 1)]), _: 2 },
                            1032,
                            ['href'],
                          ),
                        ])
                      ),
                    ),
                    128,
                  )),
                ]),
              ],
              2,
            ))
          : m('', !0)
    },
  }),
  ia = b(ra, [['__scopeId', 'data-v-c201ca4b']]),
  la = { class: 'container' },
  ca = h({
    __name: 'VPNavScreen',
    props: { open: { type: Boolean } },
    setup(o) {
      const e = M(null),
        t = Ve(ee ? document.body : null)
      return (s, n) => (
        a(),
        k(
          ue,
          {
            name: 'fade',
            onEnter: n[0] || (n[0] = (r) => (t.value = !0)),
            onAfterLeave: n[1] || (n[1] = (r) => (t.value = !1)),
          },
          {
            default: v(() => [
              s.open
                ? (a(),
                  l(
                    'div',
                    {
                      key: 0,
                      class: 'VPNavScreen',
                      ref_key: 'screen',
                      ref: e,
                      id: 'VPNavScreen',
                    },
                    [
                      d('div', la, [
                        c(
                          s.$slots,
                          'nav-screen-content-before',
                          {},
                          void 0,
                          !0,
                        ),
                        _(sa, { class: 'menu' }),
                        _(ia, { class: 'translations' }),
                        _(Do, { class: 'appearance' }),
                        _(oa, { class: 'social-links' }),
                        c(s.$slots, 'nav-screen-content-after', {}, void 0, !0),
                      ]),
                    ],
                    512,
                  ))
                : m('', !0),
            ]),
            _: 3,
          },
        )
      )
    },
  }),
  ua = b(ca, [['__scopeId', 'data-v-8995acae']]),
  da = { key: 0, class: 'VPNav' },
  pa = h({
    __name: 'VPNav',
    setup(o) {
      const { isScreenOpen: e, closeScreen: t, toggleScreen: s } = rs(),
        { frontmatter: n } = P(),
        r = g(() => n.value.navbar !== !1)
      return (
        Se('close-screen', t),
        Q(() => {
          ee && document.documentElement.classList.toggle('hide-nav', !r.value)
        }),
        (u, f) =>
          r.value
            ? (a(),
              l('header', da, [
                _(
                  Bo,
                  { 'is-screen-open': i(e), onToggleScreen: i(s) },
                  {
                    'nav-bar-title-before': v(() => [
                      c(u.$slots, 'nav-bar-title-before', {}, void 0, !0),
                    ]),
                    'nav-bar-title-after': v(() => [
                      c(u.$slots, 'nav-bar-title-after', {}, void 0, !0),
                    ]),
                    'nav-bar-content-before': v(() => [
                      c(u.$slots, 'nav-bar-content-before', {}, void 0, !0),
                    ]),
                    'nav-bar-content-after': v(() => [
                      c(u.$slots, 'nav-bar-content-after', {}, void 0, !0),
                    ]),
                    _: 3,
                  },
                  8,
                  ['is-screen-open', 'onToggleScreen'],
                ),
                _(
                  ua,
                  { open: i(e) },
                  {
                    'nav-screen-content-before': v(() => [
                      c(u.$slots, 'nav-screen-content-before', {}, void 0, !0),
                    ]),
                    'nav-screen-content-after': v(() => [
                      c(u.$slots, 'nav-screen-content-after', {}, void 0, !0),
                    ]),
                    _: 3,
                  },
                  8,
                  ['open'],
                ),
              ]))
            : m('', !0)
      )
    },
  }),
  va = b(pa, [['__scopeId', 'data-v-2aff9063']]),
  fa = ['role', 'tabindex'],
  ma = { key: 1, class: 'items' },
  ha = h({
    __name: 'VPSidebarItem',
    props: { item: {}, depth: {} },
    setup(o) {
      const e = o,
        {
          collapsed: t,
          collapsible: s,
          isLink: n,
          isActiveLink: r,
          hasActiveLink: u,
          hasChildren: f,
          toggle: p,
        } = ct(g(() => e.item)),
        y = g(() => (f.value ? 'section' : 'div')),
        L = g(() => (n.value ? 'a' : 'div')),
        $ = g(() =>
          f.value ? (e.depth + 2 === 7 ? 'p' : `h${e.depth + 2}`) : 'p',
        ),
        V = g(() => (n.value ? void 0 : 'button')),
        w = g(() => [
          [`level-${e.depth}`],
          { collapsible: s.value },
          { collapsed: t.value },
          { 'is-link': n.value },
          { 'is-active': r.value },
          { 'has-active': u.value },
        ])
      function H(S) {
        ;('key' in S && S.key !== 'Enter') || (!e.item.link && p())
      }
      function A() {
        e.item.link && p()
      }
      return (S, C) => {
        const U = W('VPSidebarItem', !0)
        return (
          a(),
          k(
            F(y.value),
            { class: N(['VPSidebarItem', w.value]) },
            {
              default: v(() => [
                S.item.text
                  ? (a(),
                    l(
                      'div',
                      z(
                        { key: 0, class: 'item', role: V.value },
                        Ue(S.item.items ? { click: H, keydown: H } : {}, !0),
                        { tabindex: S.item.items && 0 },
                      ),
                      [
                        C[1] ||
                          (C[1] = d('div', { class: 'indicator' }, null, -1)),
                        S.item.link
                          ? (a(),
                            k(
                              E,
                              {
                                key: 0,
                                tag: L.value,
                                class: 'link',
                                href: S.item.link,
                                rel: S.item.rel,
                                target: S.item.target,
                              },
                              {
                                default: v(() => [
                                  (a(),
                                  k(
                                    F($.value),
                                    { class: 'text', innerHTML: S.item.text },
                                    null,
                                    8,
                                    ['innerHTML'],
                                  )),
                                ]),
                                _: 1,
                              },
                              8,
                              ['tag', 'href', 'rel', 'target'],
                            ))
                          : (a(),
                            k(
                              F($.value),
                              { key: 1, class: 'text', innerHTML: S.item.text },
                              null,
                              8,
                              ['innerHTML'],
                            )),
                        S.item.collapsed != null &&
                        S.item.items &&
                        S.item.items.length
                          ? (a(),
                            l(
                              'div',
                              {
                                key: 2,
                                class: 'caret',
                                role: 'button',
                                'aria-label': 'toggle section',
                                onClick: A,
                                onKeydown: ze(A, ['enter']),
                                tabindex: '0',
                              },
                              C[0] ||
                                (C[0] = [
                                  d(
                                    'span',
                                    { class: 'vpi-chevron-right caret-icon' },
                                    null,
                                    -1,
                                  ),
                                ]),
                              32,
                            ))
                          : m('', !0),
                      ],
                      16,
                      fa,
                    ))
                  : m('', !0),
                S.item.items && S.item.items.length
                  ? (a(),
                    l('div', ma, [
                      S.depth < 5
                        ? (a(!0),
                          l(
                            I,
                            { key: 0 },
                            B(
                              S.item.items,
                              (K) => (
                                a(),
                                k(
                                  U,
                                  { key: K.text, item: K, depth: S.depth + 1 },
                                  null,
                                  8,
                                  ['item', 'depth'],
                                )
                              ),
                            ),
                            128,
                          ))
                        : m('', !0),
                    ]))
                  : m('', !0),
              ]),
              _: 1,
            },
            8,
            ['class'],
          )
        )
      }
    },
  }),
  _a = b(ha, [['__scopeId', 'data-v-3814e593']]),
  ka = h({
    __name: 'VPSidebarGroup',
    props: { items: {} },
    setup(o) {
      const e = M(!0)
      let t = null
      return (
        j(() => {
          t = setTimeout(() => {
            ;(t = null), (e.value = !1)
          }, 300)
        }),
        je(() => {
          t != null && (clearTimeout(t), (t = null))
        }),
        (s, n) => (
          a(!0),
          l(
            I,
            null,
            B(
              s.items,
              (r) => (
                a(),
                l(
                  'div',
                  {
                    key: r.text,
                    class: N(['group', { 'no-transition': e.value }]),
                  },
                  [_(_a, { item: r, depth: 0 }, null, 8, ['item'])],
                  2,
                )
              ),
            ),
            128,
          )
        )
      )
    },
  }),
  ba = b(ka, [['__scopeId', 'data-v-8472490f']]),
  ga = {
    class: 'nav',
    id: 'VPSidebarNav',
    'aria-labelledby': 'sidebar-aria-label',
    tabindex: '-1',
  },
  $a = h({
    __name: 'VPSidebar',
    props: { open: { type: Boolean } },
    setup(o) {
      const { sidebarGroups: e, hasSidebar: t } = G(),
        s = o,
        n = M(null),
        r = Ve(ee ? document.body : null)
      O(
        [s, n],
        () => {
          var f
          s.open
            ? ((r.value = !0), (f = n.value) == null || f.focus())
            : (r.value = !1)
        },
        { immediate: !0, flush: 'post' },
      )
      const u = M(0)
      return (
        O(
          e,
          () => {
            u.value += 1
          },
          { deep: !0 },
        ),
        (f, p) =>
          i(t)
            ? (a(),
              l(
                'aside',
                {
                  key: 0,
                  class: N(['VPSidebar', { open: f.open }]),
                  ref_key: 'navEl',
                  ref: n,
                  onClick: p[0] || (p[0] = qe(() => {}, ['stop'])),
                },
                [
                  p[2] || (p[2] = d('div', { class: 'curtain' }, null, -1)),
                  d('nav', ga, [
                    p[1] ||
                      (p[1] = d(
                        'span',
                        { class: 'visually-hidden', id: 'sidebar-aria-label' },
                        ' Sidebar Navigation ',
                        -1,
                      )),
                    c(f.$slots, 'sidebar-nav-before', {}, void 0, !0),
                    (a(),
                    k(ba, { items: i(e), key: u.value }, null, 8, ['items'])),
                    c(f.$slots, 'sidebar-nav-after', {}, void 0, !0),
                  ]),
                ],
                2,
              ))
            : m('', !0)
      )
    },
  }),
  ya = b($a, [['__scopeId', 'data-v-9be62d55']]),
  Pa = h({
    __name: 'VPSkipLink',
    setup(o) {
      const e = Z(),
        t = M()
      O(
        () => e.path,
        () => t.value.focus(),
      )
      function s({ target: n }) {
        const r = document.getElementById(decodeURIComponent(n.hash).slice(1))
        if (r) {
          const u = () => {
            r.removeAttribute('tabindex'), r.removeEventListener('blur', u)
          }
          r.setAttribute('tabindex', '-1'),
            r.addEventListener('blur', u),
            r.focus(),
            window.scrollTo(0, 0)
        }
      }
      return (n, r) => (
        a(),
        l(
          I,
          null,
          [
            d(
              'span',
              { ref_key: 'backToTop', ref: t, tabindex: '-1' },
              null,
              512,
            ),
            d(
              'a',
              {
                href: '#VPContent',
                class: 'VPSkipLink visually-hidden',
                onClick: s,
              },
              ' Skip to content ',
            ),
          ],
          64,
        )
      )
    },
  }),
  La = b(Pa, [['__scopeId', 'data-v-6e487d2f']]),
  Va = h({
    __name: 'Layout',
    setup(o) {
      const { isOpen: e, open: t, close: s } = G(),
        n = Z()
      O(() => n.path, s), lt(e, s)
      const { frontmatter: r } = P(),
        u = We(),
        f = g(() => !!u['home-hero-image'])
      return (
        Se('hero-image-slot-exists', f),
        (p, y) => {
          const L = W('Content')
          return i(r).layout !== !1
            ? (a(),
              l(
                'div',
                { key: 0, class: N(['Layout', i(r).pageClass]) },
                [
                  c(p.$slots, 'layout-top', {}, void 0, !0),
                  _(La),
                  _(
                    Ye,
                    { class: 'backdrop', show: i(e), onClick: i(s) },
                    null,
                    8,
                    ['show', 'onClick'],
                  ),
                  _(va, null, {
                    'nav-bar-title-before': v(() => [
                      c(p.$slots, 'nav-bar-title-before', {}, void 0, !0),
                    ]),
                    'nav-bar-title-after': v(() => [
                      c(p.$slots, 'nav-bar-title-after', {}, void 0, !0),
                    ]),
                    'nav-bar-content-before': v(() => [
                      c(p.$slots, 'nav-bar-content-before', {}, void 0, !0),
                    ]),
                    'nav-bar-content-after': v(() => [
                      c(p.$slots, 'nav-bar-content-after', {}, void 0, !0),
                    ]),
                    'nav-screen-content-before': v(() => [
                      c(p.$slots, 'nav-screen-content-before', {}, void 0, !0),
                    ]),
                    'nav-screen-content-after': v(() => [
                      c(p.$slots, 'nav-screen-content-after', {}, void 0, !0),
                    ]),
                    _: 3,
                  }),
                  _(as, { open: i(e), onOpenMenu: i(t) }, null, 8, [
                    'open',
                    'onOpenMenu',
                  ]),
                  _(
                    ya,
                    { open: i(e) },
                    {
                      'sidebar-nav-before': v(() => [
                        c(p.$slots, 'sidebar-nav-before', {}, void 0, !0),
                      ]),
                      'sidebar-nav-after': v(() => [
                        c(p.$slots, 'sidebar-nav-after', {}, void 0, !0),
                      ]),
                      _: 3,
                    },
                    8,
                    ['open'],
                  ),
                  _(jn, null, {
                    'page-top': v(() => [
                      c(p.$slots, 'page-top', {}, void 0, !0),
                    ]),
                    'page-bottom': v(() => [
                      c(p.$slots, 'page-bottom', {}, void 0, !0),
                    ]),
                    'not-found': v(() => [
                      c(p.$slots, 'not-found', {}, void 0, !0),
                    ]),
                    'home-hero-before': v(() => [
                      c(p.$slots, 'home-hero-before', {}, void 0, !0),
                    ]),
                    'home-hero-info-before': v(() => [
                      c(p.$slots, 'home-hero-info-before', {}, void 0, !0),
                    ]),
                    'home-hero-info': v(() => [
                      c(p.$slots, 'home-hero-info', {}, void 0, !0),
                    ]),
                    'home-hero-info-after': v(() => [
                      c(p.$slots, 'home-hero-info-after', {}, void 0, !0),
                    ]),
                    'home-hero-actions-after': v(() => [
                      c(p.$slots, 'home-hero-actions-after', {}, void 0, !0),
                    ]),
                    'home-hero-image': v(() => [
                      c(p.$slots, 'home-hero-image', {}, void 0, !0),
                    ]),
                    'home-hero-after': v(() => [
                      c(p.$slots, 'home-hero-after', {}, void 0, !0),
                    ]),
                    'home-features-before': v(() => [
                      c(p.$slots, 'home-features-before', {}, void 0, !0),
                    ]),
                    'home-features-after': v(() => [
                      c(p.$slots, 'home-features-after', {}, void 0, !0),
                    ]),
                    'doc-footer-before': v(() => [
                      c(p.$slots, 'doc-footer-before', {}, void 0, !0),
                    ]),
                    'doc-before': v(() => [
                      c(p.$slots, 'doc-before', {}, void 0, !0),
                    ]),
                    'doc-after': v(() => [
                      c(p.$slots, 'doc-after', {}, void 0, !0),
                    ]),
                    'doc-top': v(() => [
                      c(p.$slots, 'doc-top', {}, void 0, !0),
                    ]),
                    'doc-bottom': v(() => [
                      c(p.$slots, 'doc-bottom', {}, void 0, !0),
                    ]),
                    'aside-top': v(() => [
                      c(p.$slots, 'aside-top', {}, void 0, !0),
                    ]),
                    'aside-bottom': v(() => [
                      c(p.$slots, 'aside-bottom', {}, void 0, !0),
                    ]),
                    'aside-outline-before': v(() => [
                      c(p.$slots, 'aside-outline-before', {}, void 0, !0),
                    ]),
                    'aside-outline-after': v(() => [
                      c(p.$slots, 'aside-outline-after', {}, void 0, !0),
                    ]),
                    'aside-ads-before': v(() => [
                      c(p.$slots, 'aside-ads-before', {}, void 0, !0),
                    ]),
                    'aside-ads-after': v(() => [
                      c(p.$slots, 'aside-ads-after', {}, void 0, !0),
                    ]),
                    _: 3,
                  }),
                  _(Jn),
                  c(p.$slots, 'layout-bottom', {}, void 0, !0),
                ],
                2,
              ))
            : (a(), k(L, { key: 1 }))
        }
      )
    },
  }),
  Sa = b(Va, [['__scopeId', 'data-v-a0c32afe']]),
  Ta = {},
  Ma = { class: 'VPTeamPage' }
function Na(o, e) {
  return a(), l('div', Ma, [c(o.$slots, 'default')])
}
const Za = b(Ta, [
    ['render', Na],
    ['__scopeId', 'data-v-eb80586d'],
  ]),
  Ia = {},
  wa = { class: 'VPTeamPageTitle' },
  Ha = { key: 0, class: 'title' },
  Aa = { key: 1, class: 'lead' }
function Ba(o, e) {
  return (
    a(),
    l('div', wa, [
      o.$slots.title
        ? (a(), l('h1', Ha, [c(o.$slots, 'title', {}, void 0, !0)]))
        : m('', !0),
      o.$slots.lead
        ? (a(), l('p', Aa, [c(o.$slots, 'lead', {}, void 0, !0)]))
        : m('', !0),
    ])
  )
}
const xa = b(Ia, [
    ['render', Ba],
    ['__scopeId', 'data-v-1dd5eb91'],
  ]),
  Ca = { class: 'profile' },
  Ea = { class: 'avatar' },
  Fa = ['src', 'alt'],
  Da = { class: 'data' },
  Oa = { class: 'name' },
  Ga = { key: 0, class: 'affiliation' },
  Ua = { key: 0, class: 'title' },
  za = { key: 1, class: 'at' },
  ja = ['innerHTML'],
  qa = { key: 2, class: 'links' },
  Wa = { key: 0, class: 'sp' },
  Ka = h({
    __name: 'VPTeamMembersItem',
    props: { size: { default: 'medium' }, member: {} },
    setup(o) {
      return (e, t) => (
        a(),
        l(
          'article',
          { class: N(['VPTeamMembersItem', [e.size]]) },
          [
            d('div', Ca, [
              d('figure', Ea, [
                d(
                  'img',
                  {
                    class: 'avatar-img',
                    src: e.member.avatar,
                    alt: e.member.name,
                  },
                  null,
                  8,
                  Fa,
                ),
              ]),
              d('div', Da, [
                d('h1', Oa, T(e.member.name), 1),
                e.member.title || e.member.org
                  ? (a(),
                    l('p', Ga, [
                      e.member.title
                        ? (a(), l('span', Ua, T(e.member.title), 1))
                        : m('', !0),
                      e.member.title && e.member.org
                        ? (a(), l('span', za, ' @ '))
                        : m('', !0),
                      e.member.org
                        ? (a(),
                          k(
                            E,
                            {
                              key: 2,
                              class: N(['org', { link: e.member.orgLink }]),
                              href: e.member.orgLink,
                              'no-icon': '',
                            },
                            { default: v(() => [D(T(e.member.org), 1)]), _: 1 },
                            8,
                            ['class', 'href'],
                          ))
                        : m('', !0),
                    ]))
                  : m('', !0),
                e.member.desc
                  ? (a(),
                    l(
                      'p',
                      { key: 1, class: 'desc', innerHTML: e.member.desc },
                      null,
                      8,
                      ja,
                    ))
                  : m('', !0),
                e.member.links
                  ? (a(),
                    l('div', qa, [
                      _(ne, { links: e.member.links }, null, 8, ['links']),
                    ]))
                  : m('', !0),
              ]),
            ]),
            e.member.sponsor
              ? (a(),
                l('div', Wa, [
                  _(
                    E,
                    { class: 'sp-link', href: e.member.sponsor, 'no-icon': '' },
                    {
                      default: v(() => [
                        t[0] ||
                          (t[0] = d(
                            'span',
                            { class: 'vpi-heart sp-icon' },
                            null,
                            -1,
                          )),
                        D(' ' + T(e.member.actionText || 'Sponsor'), 1),
                      ]),
                      _: 1,
                    },
                    8,
                    ['href'],
                  ),
                ]))
              : m('', !0),
          ],
          2,
        )
      )
    },
  }),
  Ra = b(Ka, [['__scopeId', 'data-v-208203b0']]),
  Ja = { class: 'container' },
  Ya = h({
    __name: 'VPTeamMembers',
    props: { size: { default: 'medium' }, members: {} },
    setup(o) {
      const e = o,
        t = g(() => [e.size, `count-${e.members.length}`])
      return (s, n) => (
        a(),
        l(
          'div',
          { class: N(['VPTeamMembers', t.value]) },
          [
            d('div', Ja, [
              (a(!0),
              l(
                I,
                null,
                B(
                  s.members,
                  (r) => (
                    a(),
                    l('div', { key: r.name, class: 'item' }, [
                      _(Ra, { size: s.size, member: r }, null, 8, [
                        'size',
                        'member',
                      ]),
                    ])
                  ),
                ),
                128,
              )),
            ]),
          ],
          2,
        )
      )
    },
  }),
  er = b(Ya, [['__scopeId', 'data-v-9d437201']]),
  Qa = {
    Layout: Sa,
    enhanceApp: ({ app: o }) => {
      o.component('Badge', Ke)
    },
  },
  tr = { extends: Qa, enhanceApp({ app: o }) {} }
export { tr as R, xa as V, er as a, Za as b }
