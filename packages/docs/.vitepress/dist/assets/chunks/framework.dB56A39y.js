/**
 * @vue/shared v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function As(e) {
  const t = Object.create(null)
  for (const n of e.split(',')) t[n] = 1
  return (n) => n in t
}
const Z = {},
  St = [],
  Ue = () => {},
  xo = () => !1,
  Jt = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  Rs = (e) => e.startsWith('onUpdate:'),
  fe = Object.assign,
  Os = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  Eo = Object.prototype.hasOwnProperty,
  z = (e, t) => Eo.call(e, t),
  k = Array.isArray,
  xt = (e) => Cn(e) === '[object Map]',
  Dr = (e) => Cn(e) === '[object Set]',
  q = (e) => typeof e == 'function',
  re = (e) => typeof e == 'string',
  Ye = (e) => typeof e == 'symbol',
  ne = (e) => e !== null && typeof e == 'object',
  $r = (e) => (ne(e) || q(e)) && q(e.then) && q(e.catch),
  jr = Object.prototype.toString,
  Cn = (e) => jr.call(e),
  To = (e) => Cn(e).slice(8, -1),
  Vr = (e) => Cn(e) === '[object Object]',
  Ms = (e) =>
    re(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  Et = As(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
  ),
  An = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  Co = /-(\w)/g,
  Le = An((e) => e.replace(Co, (t, n) => (n ? n.toUpperCase() : ''))),
  Ao = /\B([A-Z])/g,
  st = An((e) => e.replace(Ao, '-$1').toLowerCase()),
  Rn = An((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  hn = An((e) => (e ? `on${Rn(e)}` : '')),
  et = (e, t) => !Object.is(e, t),
  qn = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t)
  },
  Ur = (e, t, n, s = !1) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      writable: s,
      value: n,
    })
  },
  Ro = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  },
  Oo = (e) => {
    const t = re(e) ? Number(e) : NaN
    return isNaN(t) ? e : t
  }
let Xs
const On = () =>
  Xs ||
  (Xs =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : {})
function Is(e) {
  if (k(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = re(s) ? Po(s) : Is(s)
      if (r) for (const i in r) t[i] = r[i]
    }
    return t
  } else if (re(e) || ne(e)) return e
}
const Mo = /;(?![^(]*\))/g,
  Io = /:([^]+)/,
  Lo = /\/\*[^]*?\*\//g
function Po(e) {
  const t = {}
  return (
    e
      .replace(Lo, '')
      .split(Mo)
      .forEach((n) => {
        if (n) {
          const s = n.split(Io)
          s.length > 1 && (t[s[0].trim()] = s[1].trim())
        }
      }),
    t
  )
}
function Ls(e) {
  let t = ''
  if (re(e)) t = e
  else if (k(e))
    for (let n = 0; n < e.length; n++) {
      const s = Ls(e[n])
      s && (t += s + ' ')
    }
  else if (ne(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const No =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  Fo = As(No)
function kr(e) {
  return !!e || e === ''
}
const Br = (e) => !!(e && e.__v_isRef === !0),
  Ho = (e) =>
    re(e)
      ? e
      : e == null
        ? ''
        : k(e) || (ne(e) && (e.toString === jr || !q(e.toString)))
          ? Br(e)
            ? Ho(e.value)
            : JSON.stringify(e, Wr, 2)
          : String(e),
  Wr = (e, t) =>
    Br(t)
      ? Wr(e, t.value)
      : xt(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [s, r], i) => ((n[Gn(s, i) + ' =>'] = r), n),
              {},
            ),
          }
        : Dr(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((n) => Gn(n)) }
          : Ye(t)
            ? Gn(t)
            : ne(t) && !k(t) && !Vr(t)
              ? String(t)
              : t,
  Gn = (e, t = '') => {
    var n
    return Ye(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  }
/**
 * @vue/reactivity v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let we
class Do {
  constructor(t = !1) {
    ;(this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this._isPaused = !1),
      (this.parent = we),
      !t && we && (this.index = (we.scopes || (we.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  pause() {
    if (this._active) {
      this._isPaused = !0
      let t, n
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause()
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause()
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1
      let t, n
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume()
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume()
    }
  }
  run(t) {
    if (this._active) {
      const n = we
      try {
        return (we = this), t()
      } finally {
        we = n
      }
    }
  }
  on() {
    we = this
  }
  off() {
    we = this.parent
  }
  stop(t) {
    if (this._active) {
      this._active = !1
      let n, s
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop()
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]()
      if (((this.cleanups.length = 0), this.scopes)) {
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0)
        this.scopes.length = 0
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop()
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index))
      }
      this.parent = void 0
    }
  }
}
function Kr() {
  return we
}
function $o(e, t = !1) {
  we && we.cleanups.push(e)
}
let te
const Yn = new WeakSet()
class qr {
  constructor(t) {
    ;(this.fn = t),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      we && we.active && we.effects.push(this)
  }
  pause() {
    this.flags |= 64
  }
  resume() {
    this.flags & 64 &&
      ((this.flags &= -65), Yn.has(this) && (Yn.delete(this), this.trigger()))
  }
  notify() {
    ;(this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || Yr(this)
  }
  run() {
    if (!(this.flags & 1)) return this.fn()
    ;(this.flags |= 2), Js(this), Xr(this)
    const t = te,
      n = Ne
    ;(te = this), (Ne = !0)
    try {
      return this.fn()
    } finally {
      Jr(this), (te = t), (Ne = n), (this.flags &= -3)
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) Fs(t)
      ;(this.deps = this.depsTail = void 0),
        Js(this),
        this.onStop && this.onStop(),
        (this.flags &= -2)
    }
  }
  trigger() {
    this.flags & 64
      ? Yn.add(this)
      : this.scheduler
        ? this.scheduler()
        : this.runIfDirty()
  }
  runIfDirty() {
    hs(this) && this.run()
  }
  get dirty() {
    return hs(this)
  }
}
let Gr = 0,
  Ht,
  Dt
function Yr(e, t = !1) {
  if (((e.flags |= 8), t)) {
    ;(e.next = Dt), (Dt = e)
    return
  }
  ;(e.next = Ht), (Ht = e)
}
function Ps() {
  Gr++
}
function Ns() {
  if (--Gr > 0) return
  if (Dt) {
    let t = Dt
    for (Dt = void 0; t; ) {
      const n = t.next
      ;(t.next = void 0), (t.flags &= -9), (t = n)
    }
  }
  let e
  for (; Ht; ) {
    let t = Ht
    for (Ht = void 0; t; ) {
      const n = t.next
      if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
        try {
          t.trigger()
        } catch (s) {
          e || (e = s)
        }
      t = n
    }
  }
  if (e) throw e
}
function Xr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    (t.version = -1),
      (t.prevActiveLink = t.dep.activeLink),
      (t.dep.activeLink = t)
}
function Jr(e) {
  let t,
    n = e.depsTail,
    s = n
  for (; s; ) {
    const r = s.prevDep
    s.version === -1 ? (s === n && (n = r), Fs(s), jo(s)) : (t = s),
      (s.dep.activeLink = s.prevActiveLink),
      (s.prevActiveLink = void 0),
      (s = r)
  }
  ;(e.deps = t), (e.depsTail = n)
}
function hs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (
      t.dep.version !== t.version ||
      (t.dep.computed && (zr(t.dep.computed) || t.dep.version !== t.version))
    )
      return !0
  return !!e._dirty
}
function zr(e) {
  if (
    (e.flags & 4 && !(e.flags & 16)) ||
    ((e.flags &= -17), e.globalVersion === Ut)
  )
    return
  e.globalVersion = Ut
  const t = e.dep
  if (((e.flags |= 2), t.version > 0 && !e.isSSR && e.deps && !hs(e))) {
    e.flags &= -3
    return
  }
  const n = te,
    s = Ne
  ;(te = e), (Ne = !0)
  try {
    Xr(e)
    const r = e.fn(e._value)
    ;(t.version === 0 || et(r, e._value)) && ((e._value = r), t.version++)
  } catch (r) {
    throw (t.version++, r)
  } finally {
    ;(te = n), (Ne = s), Jr(e), (e.flags &= -3)
  }
}
function Fs(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e
  if (
    (s && ((s.nextSub = r), (e.prevSub = void 0)),
    r && ((r.prevSub = s), (e.nextSub = void 0)),
    n.subs === e && ((n.subs = s), !s && n.computed))
  ) {
    n.computed.flags &= -5
    for (let i = n.computed.deps; i; i = i.nextDep) Fs(i, !0)
  }
  !t && !--n.sc && n.map && n.map.delete(n.key)
}
function jo(e) {
  const { prevDep: t, nextDep: n } = e
  t && ((t.nextDep = n), (e.prevDep = void 0)),
    n && ((n.prevDep = t), (e.nextDep = void 0))
}
let Ne = !0
const Qr = []
function rt() {
  Qr.push(Ne), (Ne = !1)
}
function it() {
  const e = Qr.pop()
  Ne = e === void 0 ? !0 : e
}
function Js(e) {
  const { cleanup: t } = e
  if (((e.cleanup = void 0), t)) {
    const n = te
    te = void 0
    try {
      t()
    } finally {
      te = n
    }
  }
}
let Ut = 0
class Vo {
  constructor(t, n) {
    ;(this.sub = t),
      (this.dep = n),
      (this.version = n.version),
      (this.nextDep =
        this.prevDep =
        this.nextSub =
        this.prevSub =
        this.prevActiveLink =
          void 0)
  }
}
class Mn {
  constructor(t) {
    ;(this.computed = t),
      (this.version = 0),
      (this.activeLink = void 0),
      (this.subs = void 0),
      (this.map = void 0),
      (this.key = void 0),
      (this.sc = 0)
  }
  track(t) {
    if (!te || !Ne || te === this.computed) return
    let n = this.activeLink
    if (n === void 0 || n.sub !== te)
      (n = this.activeLink = new Vo(te, this)),
        te.deps
          ? ((n.prevDep = te.depsTail),
            (te.depsTail.nextDep = n),
            (te.depsTail = n))
          : (te.deps = te.depsTail = n),
        Zr(n)
    else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
      const s = n.nextDep
      ;(s.prevDep = n.prevDep),
        n.prevDep && (n.prevDep.nextDep = s),
        (n.prevDep = te.depsTail),
        (n.nextDep = void 0),
        (te.depsTail.nextDep = n),
        (te.depsTail = n),
        te.deps === n && (te.deps = s)
    }
    return n
  }
  trigger(t) {
    this.version++, Ut++, this.notify(t)
  }
  notify(t) {
    Ps()
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify()
    } finally {
      Ns()
    }
  }
}
function Zr(e) {
  if ((e.dep.sc++, e.sub.flags & 4)) {
    const t = e.dep.computed
    if (t && !e.dep.subs) {
      t.flags |= 20
      for (let s = t.deps; s; s = s.nextDep) Zr(s)
    }
    const n = e.dep.subs
    n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e)
  }
}
const _n = new WeakMap(),
  dt = Symbol(''),
  ps = Symbol(''),
  kt = Symbol('')
function me(e, t, n) {
  if (Ne && te) {
    let s = _n.get(e)
    s || _n.set(e, (s = new Map()))
    let r = s.get(n)
    r || (s.set(n, (r = new Mn())), (r.map = s), (r.key = n)), r.track()
  }
}
function Ke(e, t, n, s, r, i) {
  const o = _n.get(e)
  if (!o) {
    Ut++
    return
  }
  const l = (c) => {
    c && c.trigger()
  }
  if ((Ps(), t === 'clear')) o.forEach(l)
  else {
    const c = k(e),
      u = c && Ms(n)
    if (c && n === 'length') {
      const f = Number(s)
      o.forEach((h, _) => {
        ;(_ === 'length' || _ === kt || (!Ye(_) && _ >= f)) && l(h)
      })
    } else
      switch (
        ((n !== void 0 || o.has(void 0)) && l(o.get(n)), u && l(o.get(kt)), t)
      ) {
        case 'add':
          c ? u && l(o.get('length')) : (l(o.get(dt)), xt(e) && l(o.get(ps)))
          break
        case 'delete':
          c || (l(o.get(dt)), xt(e) && l(o.get(ps)))
          break
        case 'set':
          xt(e) && l(o.get(dt))
          break
      }
  }
  Ns()
}
function Uo(e, t) {
  const n = _n.get(e)
  return n && n.get(t)
}
function bt(e) {
  const t = J(e)
  return t === e ? t : (me(t, 'iterate', kt), Ie(e) ? t : t.map(ye))
}
function In(e) {
  return me((e = J(e)), 'iterate', kt), e
}
const ko = {
  __proto__: null,
  [Symbol.iterator]() {
    return Xn(this, Symbol.iterator, ye)
  },
  concat(...e) {
    return bt(this).concat(...e.map((t) => (k(t) ? bt(t) : t)))
  },
  entries() {
    return Xn(this, 'entries', (e) => ((e[1] = ye(e[1])), e))
  },
  every(e, t) {
    return ke(this, 'every', e, t, void 0, arguments)
  },
  filter(e, t) {
    return ke(this, 'filter', e, t, (n) => n.map(ye), arguments)
  },
  find(e, t) {
    return ke(this, 'find', e, t, ye, arguments)
  },
  findIndex(e, t) {
    return ke(this, 'findIndex', e, t, void 0, arguments)
  },
  findLast(e, t) {
    return ke(this, 'findLast', e, t, ye, arguments)
  },
  findLastIndex(e, t) {
    return ke(this, 'findLastIndex', e, t, void 0, arguments)
  },
  forEach(e, t) {
    return ke(this, 'forEach', e, t, void 0, arguments)
  },
  includes(...e) {
    return Jn(this, 'includes', e)
  },
  indexOf(...e) {
    return Jn(this, 'indexOf', e)
  },
  join(e) {
    return bt(this).join(e)
  },
  lastIndexOf(...e) {
    return Jn(this, 'lastIndexOf', e)
  },
  map(e, t) {
    return ke(this, 'map', e, t, void 0, arguments)
  },
  pop() {
    return Lt(this, 'pop')
  },
  push(...e) {
    return Lt(this, 'push', e)
  },
  reduce(e, ...t) {
    return zs(this, 'reduce', e, t)
  },
  reduceRight(e, ...t) {
    return zs(this, 'reduceRight', e, t)
  },
  shift() {
    return Lt(this, 'shift')
  },
  some(e, t) {
    return ke(this, 'some', e, t, void 0, arguments)
  },
  splice(...e) {
    return Lt(this, 'splice', e)
  },
  toReversed() {
    return bt(this).toReversed()
  },
  toSorted(e) {
    return bt(this).toSorted(e)
  },
  toSpliced(...e) {
    return bt(this).toSpliced(...e)
  },
  unshift(...e) {
    return Lt(this, 'unshift', e)
  },
  values() {
    return Xn(this, 'values', ye)
  },
}
function Xn(e, t, n) {
  const s = In(e),
    r = s[t]()
  return (
    s !== e &&
      !Ie(e) &&
      ((r._next = r.next),
      (r.next = () => {
        const i = r._next()
        return i.value && (i.value = n(i.value)), i
      })),
    r
  )
}
const Bo = Array.prototype
function ke(e, t, n, s, r, i) {
  const o = In(e),
    l = o !== e && !Ie(e),
    c = o[t]
  if (c !== Bo[t]) {
    const h = c.apply(e, i)
    return l ? ye(h) : h
  }
  let u = n
  o !== e &&
    (l
      ? (u = function (h, _) {
          return n.call(this, ye(h), _, e)
        })
      : n.length > 2 &&
        (u = function (h, _) {
          return n.call(this, h, _, e)
        }))
  const f = c.call(o, u, s)
  return l && r ? r(f) : f
}
function zs(e, t, n, s) {
  const r = In(e)
  let i = n
  return (
    r !== e &&
      (Ie(e)
        ? n.length > 3 &&
          (i = function (o, l, c) {
            return n.call(this, o, l, c, e)
          })
        : (i = function (o, l, c) {
            return n.call(this, o, ye(l), c, e)
          })),
    r[t](i, ...s)
  )
}
function Jn(e, t, n) {
  const s = J(e)
  me(s, 'iterate', kt)
  const r = s[t](...n)
  return (r === -1 || r === !1) && $s(n[0]) ? ((n[0] = J(n[0])), s[t](...n)) : r
}
function Lt(e, t, n = []) {
  rt(), Ps()
  const s = J(e)[t].apply(e, n)
  return Ns(), it(), s
}
const Wo = As('__proto__,__v_isRef,__isVue'),
  ei = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(Ye),
  )
function Ko(e) {
  Ye(e) || (e = String(e))
  const t = J(this)
  return me(t, 'has', e), t.hasOwnProperty(e)
}
class ti {
  constructor(t = !1, n = !1) {
    ;(this._isReadonly = t), (this._isShallow = n)
  }
  get(t, n, s) {
    if (n === '__v_skip') return t.__v_skip
    const r = this._isReadonly,
      i = this._isShallow
    if (n === '__v_isReactive') return !r
    if (n === '__v_isReadonly') return r
    if (n === '__v_isShallow') return i
    if (n === '__v_raw')
      return s === (r ? (i ? tl : ii) : i ? ri : si).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(s)
        ? t
        : void 0
    const o = k(t)
    if (!r) {
      let c
      if (o && (c = ko[n])) return c
      if (n === 'hasOwnProperty') return Ko
    }
    const l = Reflect.get(t, n, ce(t) ? t : s)
    return (Ye(n) ? ei.has(n) : Wo(n)) || (r || me(t, 'get', n), i)
      ? l
      : ce(l)
        ? o && Ms(n)
          ? l
          : l.value
        : ne(l)
          ? r
            ? Pn(l)
            : Ln(l)
          : l
  }
}
class ni extends ti {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, n, s, r) {
    let i = t[n]
    if (!this._isShallow) {
      const c = yt(i)
      if (
        (!Ie(s) && !yt(s) && ((i = J(i)), (s = J(s))), !k(t) && ce(i) && !ce(s))
      )
        return c ? !1 : ((i.value = s), !0)
    }
    const o = k(t) && Ms(n) ? Number(n) < t.length : z(t, n),
      l = Reflect.set(t, n, s, ce(t) ? t : r)
    return (
      t === J(r) && (o ? et(s, i) && Ke(t, 'set', n, s) : Ke(t, 'add', n, s)), l
    )
  }
  deleteProperty(t, n) {
    const s = z(t, n)
    t[n]
    const r = Reflect.deleteProperty(t, n)
    return r && s && Ke(t, 'delete', n, void 0), r
  }
  has(t, n) {
    const s = Reflect.has(t, n)
    return (!Ye(n) || !ei.has(n)) && me(t, 'has', n), s
  }
  ownKeys(t) {
    return me(t, 'iterate', k(t) ? 'length' : dt), Reflect.ownKeys(t)
  }
}
class qo extends ti {
  constructor(t = !1) {
    super(!0, t)
  }
  set(t, n) {
    return !0
  }
  deleteProperty(t, n) {
    return !0
  }
}
const Go = new ni(),
  Yo = new qo(),
  Xo = new ni(!0)
const gs = (e) => e,
  tn = (e) => Reflect.getPrototypeOf(e)
function Jo(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      i = J(r),
      o = xt(i),
      l = e === 'entries' || (e === Symbol.iterator && o),
      c = e === 'keys' && o,
      u = r[e](...s),
      f = n ? gs : t ? ms : ye
    return (
      !t && me(i, 'iterate', c ? ps : dt),
      {
        next() {
          const { value: h, done: _ } = u.next()
          return _
            ? { value: h, done: _ }
            : { value: l ? [f(h[0]), f(h[1])] : f(h), done: _ }
        },
        [Symbol.iterator]() {
          return this
        },
      }
    )
  }
}
function nn(e) {
  return function (...t) {
    return e === 'delete' ? !1 : e === 'clear' ? void 0 : this
  }
}
function zo(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw,
        o = J(i),
        l = J(r)
      e || (et(r, l) && me(o, 'get', r), me(o, 'get', l))
      const { has: c } = tn(o),
        u = t ? gs : e ? ms : ye
      if (c.call(o, r)) return u(i.get(r))
      if (c.call(o, l)) return u(i.get(l))
      i !== o && i.get(r)
    },
    get size() {
      const r = this.__v_raw
      return !e && me(J(r), 'iterate', dt), Reflect.get(r, 'size', r)
    },
    has(r) {
      const i = this.__v_raw,
        o = J(i),
        l = J(r)
      return (
        e || (et(r, l) && me(o, 'has', r), me(o, 'has', l)),
        r === l ? i.has(r) : i.has(r) || i.has(l)
      )
    },
    forEach(r, i) {
      const o = this,
        l = o.__v_raw,
        c = J(l),
        u = t ? gs : e ? ms : ye
      return (
        !e && me(c, 'iterate', dt),
        l.forEach((f, h) => r.call(i, u(f), u(h), o))
      )
    },
  }
  return (
    fe(
      n,
      e
        ? {
            add: nn('add'),
            set: nn('set'),
            delete: nn('delete'),
            clear: nn('clear'),
          }
        : {
            add(r) {
              !t && !Ie(r) && !yt(r) && (r = J(r))
              const i = J(this)
              return (
                tn(i).has.call(i, r) || (i.add(r), Ke(i, 'add', r, r)), this
              )
            },
            set(r, i) {
              !t && !Ie(i) && !yt(i) && (i = J(i))
              const o = J(this),
                { has: l, get: c } = tn(o)
              let u = l.call(o, r)
              u || ((r = J(r)), (u = l.call(o, r)))
              const f = c.call(o, r)
              return (
                o.set(r, i),
                u ? et(i, f) && Ke(o, 'set', r, i) : Ke(o, 'add', r, i),
                this
              )
            },
            delete(r) {
              const i = J(this),
                { has: o, get: l } = tn(i)
              let c = o.call(i, r)
              c || ((r = J(r)), (c = o.call(i, r))), l && l.call(i, r)
              const u = i.delete(r)
              return c && Ke(i, 'delete', r, void 0), u
            },
            clear() {
              const r = J(this),
                i = r.size !== 0,
                o = r.clear()
              return i && Ke(r, 'clear', void 0, void 0), o
            },
          },
    ),
    ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
      n[r] = Jo(r, e, t)
    }),
    n
  )
}
function Hs(e, t) {
  const n = zo(e, t)
  return (s, r, i) =>
    r === '__v_isReactive'
      ? !e
      : r === '__v_isReadonly'
        ? e
        : r === '__v_raw'
          ? s
          : Reflect.get(z(n, r) && r in s ? n : s, r, i)
}
const Qo = { get: Hs(!1, !1) },
  Zo = { get: Hs(!1, !0) },
  el = { get: Hs(!0, !1) }
const si = new WeakMap(),
  ri = new WeakMap(),
  ii = new WeakMap(),
  tl = new WeakMap()
function nl(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2
    default:
      return 0
  }
}
function sl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : nl(To(e))
}
function Ln(e) {
  return yt(e) ? e : Ds(e, !1, Go, Qo, si)
}
function rl(e) {
  return Ds(e, !1, Xo, Zo, ri)
}
function Pn(e) {
  return Ds(e, !0, Yo, el, ii)
}
function Ds(e, t, n, s, r) {
  if (!ne(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const i = r.get(e)
  if (i) return i
  const o = sl(e)
  if (o === 0) return e
  const l = new Proxy(e, o === 2 ? s : n)
  return r.set(e, l), l
}
function ht(e) {
  return yt(e) ? ht(e.__v_raw) : !!(e && e.__v_isReactive)
}
function yt(e) {
  return !!(e && e.__v_isReadonly)
}
function Ie(e) {
  return !!(e && e.__v_isShallow)
}
function $s(e) {
  return e ? !!e.__v_raw : !1
}
function J(e) {
  const t = e && e.__v_raw
  return t ? J(t) : e
}
function pn(e) {
  return !z(e, '__v_skip') && Object.isExtensible(e) && Ur(e, '__v_skip', !0), e
}
const ye = (e) => (ne(e) ? Ln(e) : e),
  ms = (e) => (ne(e) ? Pn(e) : e)
function ce(e) {
  return e ? e.__v_isRef === !0 : !1
}
function de(e) {
  return li(e, !1)
}
function oi(e) {
  return li(e, !0)
}
function li(e, t) {
  return ce(e) ? e : new il(e, t)
}
class il {
  constructor(t, n) {
    ;(this.dep = new Mn()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = n ? t : J(t)),
      (this._value = n ? t : ye(t)),
      (this.__v_isShallow = n)
  }
  get value() {
    return this.dep.track(), this._value
  }
  set value(t) {
    const n = this._rawValue,
      s = this.__v_isShallow || Ie(t) || yt(t)
    ;(t = s ? t : J(t)),
      et(t, n) &&
        ((this._rawValue = t),
        (this._value = s ? t : ye(t)),
        this.dep.trigger())
  }
}
function ci(e) {
  return ce(e) ? e.value : e
}
const ol = {
  get: (e, t, n) => (t === '__v_raw' ? e : ci(Reflect.get(e, t, n))),
  set: (e, t, n, s) => {
    const r = e[t]
    return ce(r) && !ce(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s)
  },
}
function fi(e) {
  return ht(e) ? e : new Proxy(e, ol)
}
class ll {
  constructor(t) {
    ;(this.__v_isRef = !0), (this._value = void 0)
    const n = (this.dep = new Mn()),
      { get: s, set: r } = t(n.track.bind(n), n.trigger.bind(n))
    ;(this._get = s), (this._set = r)
  }
  get value() {
    return (this._value = this._get())
  }
  set value(t) {
    this._set(t)
  }
}
function cl(e) {
  return new ll(e)
}
class fl {
  constructor(t, n, s) {
    ;(this._object = t),
      (this._key = n),
      (this._defaultValue = s),
      (this.__v_isRef = !0),
      (this._value = void 0)
  }
  get value() {
    const t = this._object[this._key]
    return (this._value = t === void 0 ? this._defaultValue : t)
  }
  set value(t) {
    this._object[this._key] = t
  }
  get dep() {
    return Uo(J(this._object), this._key)
  }
}
class al {
  constructor(t) {
    ;(this._getter = t),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !0),
      (this._value = void 0)
  }
  get value() {
    return (this._value = this._getter())
  }
}
function ul(e, t, n) {
  return ce(e)
    ? e
    : q(e)
      ? new al(e)
      : ne(e) && arguments.length > 1
        ? dl(e, t, n)
        : de(e)
}
function dl(e, t, n) {
  const s = e[t]
  return ce(s) ? s : new fl(e, t, n)
}
class hl {
  constructor(t, n, s) {
    ;(this.fn = t),
      (this.setter = n),
      (this._value = void 0),
      (this.dep = new Mn(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = Ut - 1),
      (this.next = void 0),
      (this.effect = this),
      (this.__v_isReadonly = !n),
      (this.isSSR = s)
  }
  notify() {
    if (((this.flags |= 16), !(this.flags & 8) && te !== this))
      return Yr(this, !0), !0
  }
  get value() {
    const t = this.dep.track()
    return zr(this), t && (t.version = this.dep.version), this._value
  }
  set value(t) {
    this.setter && this.setter(t)
  }
}
function pl(e, t, n = !1) {
  let s, r
  return q(e) ? (s = e) : ((s = e.get), (r = e.set)), new hl(s, r, n)
}
const sn = {},
  bn = new WeakMap()
let at
function gl(e, t = !1, n = at) {
  if (n) {
    let s = bn.get(n)
    s || bn.set(n, (s = [])), s.push(e)
  }
}
function ml(e, t, n = Z) {
  const {
      immediate: s,
      deep: r,
      once: i,
      scheduler: o,
      augmentJob: l,
      call: c,
    } = n,
    u = (p) => (r ? p : Ie(p) || r === !1 || r === 0 ? qe(p, 1) : qe(p))
  let f,
    h,
    _,
    S,
    L = !1,
    O = !1
  if (
    (ce(e)
      ? ((h = () => e.value), (L = Ie(e)))
      : ht(e)
        ? ((h = () => u(e)), (L = !0))
        : k(e)
          ? ((O = !0),
            (L = e.some((p) => ht(p) || Ie(p))),
            (h = () =>
              e.map((p) => {
                if (ce(p)) return p.value
                if (ht(p)) return u(p)
                if (q(p)) return c ? c(p, 2) : p()
              })))
          : q(e)
            ? t
              ? (h = c ? () => c(e, 2) : e)
              : (h = () => {
                  if (_) {
                    rt()
                    try {
                      _()
                    } finally {
                      it()
                    }
                  }
                  const p = at
                  at = f
                  try {
                    return c ? c(e, 3, [S]) : e(S)
                  } finally {
                    at = p
                  }
                })
            : (h = Ue),
    t && r)
  ) {
    const p = h,
      A = r === !0 ? 1 / 0 : r
    h = () => qe(p(), A)
  }
  const G = Kr(),
    U = () => {
      f.stop(), G && G.active && Os(G.effects, f)
    }
  if (i && t) {
    const p = t
    t = (...A) => {
      p(...A), U()
    }
  }
  let W = O ? new Array(e.length).fill(sn) : sn
  const g = (p) => {
    if (!(!(f.flags & 1) || (!f.dirty && !p)))
      if (t) {
        const A = f.run()
        if (r || L || (O ? A.some(($, j) => et($, W[j])) : et(A, W))) {
          _ && _()
          const $ = at
          at = f
          try {
            const j = [A, W === sn ? void 0 : O && W[0] === sn ? [] : W, S]
            c ? c(t, 3, j) : t(...j), (W = A)
          } finally {
            at = $
          }
        }
      } else f.run()
  }
  return (
    l && l(g),
    (f = new qr(h)),
    (f.scheduler = o ? () => o(g, !1) : g),
    (S = (p) => gl(p, !1, f)),
    (_ = f.onStop =
      () => {
        const p = bn.get(f)
        if (p) {
          if (c) c(p, 4)
          else for (const A of p) A()
          bn.delete(f)
        }
      }),
    t ? (s ? g(!0) : (W = f.run())) : o ? o(g.bind(null, !0), !0) : f.run(),
    (U.pause = f.pause.bind(f)),
    (U.resume = f.resume.bind(f)),
    (U.stop = U),
    U
  )
}
function qe(e, t = 1 / 0, n) {
  if (t <= 0 || !ne(e) || e.__v_skip || ((n = n || new Set()), n.has(e)))
    return e
  if ((n.add(e), t--, ce(e))) qe(e.value, t, n)
  else if (k(e)) for (let s = 0; s < e.length; s++) qe(e[s], t, n)
  else if (Dr(e) || xt(e))
    e.forEach((s) => {
      qe(s, t, n)
    })
  else if (Vr(e)) {
    for (const s in e) qe(e[s], t, n)
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && qe(e[s], t, n)
  }
  return e
}
/**
 * @vue/runtime-core v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function zt(e, t, n, s) {
  try {
    return s ? e(...s) : e()
  } catch (r) {
    Nn(r, t, n)
  }
}
function He(e, t, n, s) {
  if (q(e)) {
    const r = zt(e, t, n, s)
    return (
      r &&
        $r(r) &&
        r.catch((i) => {
          Nn(i, t, n)
        }),
      r
    )
  }
  if (k(e)) {
    const r = []
    for (let i = 0; i < e.length; i++) r.push(He(e[i], t, n, s))
    return r
  }
}
function Nn(e, t, n, s = !0) {
  const r = t ? t.vnode : null,
    { errorHandler: i, throwUnhandledErrorInProduction: o } =
      (t && t.appContext.config) || Z
  if (t) {
    let l = t.parent
    const c = t.proxy,
      u = `https://vuejs.org/error-reference/#runtime-${n}`
    for (; l; ) {
      const f = l.ec
      if (f) {
        for (let h = 0; h < f.length; h++) if (f[h](e, c, u) === !1) return
      }
      l = l.parent
    }
    if (i) {
      rt(), zt(i, null, 10, [e, c, u]), it()
      return
    }
  }
  yl(e, n, r, s, o)
}
function yl(e, t, n, s = !0, r = !1) {
  if (r) throw e
  console.error(e)
}
const ve = []
let je = -1
const Tt = []
let ze = null,
  vt = 0
const ai = Promise.resolve()
let wn = null
function Fn(e) {
  const t = wn || ai
  return e ? t.then(this ? e.bind(this) : e) : t
}
function _l(e) {
  let t = je + 1,
    n = ve.length
  for (; t < n; ) {
    const s = (t + n) >>> 1,
      r = ve[s],
      i = Bt(r)
    i < e || (i === e && r.flags & 2) ? (t = s + 1) : (n = s)
  }
  return t
}
function js(e) {
  if (!(e.flags & 1)) {
    const t = Bt(e),
      n = ve[ve.length - 1]
    !n || (!(e.flags & 2) && t >= Bt(n)) ? ve.push(e) : ve.splice(_l(t), 0, e),
      (e.flags |= 1),
      ui()
  }
}
function ui() {
  wn || (wn = ai.then(di))
}
function bl(e) {
  k(e)
    ? Tt.push(...e)
    : ze && e.id === -1
      ? ze.splice(vt + 1, 0, e)
      : e.flags & 1 || (Tt.push(e), (e.flags |= 1)),
    ui()
}
function Qs(e, t, n = je + 1) {
  for (; n < ve.length; n++) {
    const s = ve[n]
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid) continue
      ve.splice(n, 1),
        n--,
        s.flags & 4 && (s.flags &= -2),
        s(),
        s.flags & 4 || (s.flags &= -2)
    }
  }
}
function vn(e) {
  if (Tt.length) {
    const t = [...new Set(Tt)].sort((n, s) => Bt(n) - Bt(s))
    if (((Tt.length = 0), ze)) {
      ze.push(...t)
      return
    }
    for (ze = t, vt = 0; vt < ze.length; vt++) {
      const n = ze[vt]
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2)
    }
    ;(ze = null), (vt = 0)
  }
}
const Bt = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id)
function di(e) {
  try {
    for (je = 0; je < ve.length; je++) {
      const t = ve[je]
      t &&
        !(t.flags & 8) &&
        (t.flags & 4 && (t.flags &= -2),
        zt(t, t.i, t.i ? 15 : 14),
        t.flags & 4 || (t.flags &= -2))
    }
  } finally {
    for (; je < ve.length; je++) {
      const t = ve[je]
      t && (t.flags &= -2)
    }
    ;(je = -1),
      (ve.length = 0),
      vn(),
      (wn = null),
      (ve.length || Tt.length) && di()
  }
}
let le = null,
  hi = null
function Sn(e) {
  const t = le
  return (le = e), (hi = (e && e.type.__scopeId) || null), t
}
function wl(e, t = le, n) {
  if (!t || e._n) return e
  const s = (...r) => {
    s._d && ar(-1)
    const i = Sn(t)
    let o
    try {
      o = e(...r)
    } finally {
      Sn(i), s._d && ar(1)
    }
    return o
  }
  return (s._n = !0), (s._c = !0), (s._d = !0), s
}
function zf(e, t) {
  if (le === null) return e
  const n = kn(le),
    s = e.dirs || (e.dirs = [])
  for (let r = 0; r < t.length; r++) {
    let [i, o, l, c = Z] = t[r]
    i &&
      (q(i) && (i = { mounted: i, updated: i }),
      i.deep && qe(o),
      s.push({
        dir: i,
        instance: n,
        value: o,
        oldValue: void 0,
        arg: l,
        modifiers: c,
      }))
  }
  return e
}
function Ve(e, t, n, s) {
  const r = e.dirs,
    i = t && t.dirs
  for (let o = 0; o < r.length; o++) {
    const l = r[o]
    i && (l.oldValue = i[o].value)
    let c = l.dir[s]
    c && (rt(), He(c, n, 8, [e.el, l, e, t]), it())
  }
}
const vl = Symbol('_vte'),
  pi = (e) => e.__isTeleport,
  Qe = Symbol('_leaveCb'),
  rn = Symbol('_enterCb')
function Sl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  }
  return (
    Ot(() => {
      e.isMounted = !0
    }),
    xi(() => {
      e.isUnmounting = !0
    }),
    e
  )
}
const Re = [Function, Array],
  gi = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Re,
    onEnter: Re,
    onAfterEnter: Re,
    onEnterCancelled: Re,
    onBeforeLeave: Re,
    onLeave: Re,
    onAfterLeave: Re,
    onLeaveCancelled: Re,
    onBeforeAppear: Re,
    onAppear: Re,
    onAfterAppear: Re,
    onAppearCancelled: Re,
  },
  mi = (e) => {
    const t = e.subTree
    return t.component ? mi(t.component) : t
  },
  xl = {
    name: 'BaseTransition',
    props: gi,
    setup(e, { slots: t }) {
      const n = Un(),
        s = Sl()
      return () => {
        const r = t.default && bi(t.default(), !0)
        if (!r || !r.length) return
        const i = yi(r),
          o = J(e),
          { mode: l } = o
        if (s.isLeaving) return zn(i)
        const c = Zs(i)
        if (!c) return zn(i)
        let u = ys(c, o, s, n, (h) => (u = h))
        c.type !== _e && Wt(c, u)
        let f = n.subTree && Zs(n.subTree)
        if (f && f.type !== _e && !ut(c, f) && mi(n).type !== _e) {
          let h = ys(f, o, s, n)
          if ((Wt(f, h), l === 'out-in' && c.type !== _e))
            return (
              (s.isLeaving = !0),
              (h.afterLeave = () => {
                ;(s.isLeaving = !1),
                  n.job.flags & 8 || n.update(),
                  delete h.afterLeave,
                  (f = void 0)
              }),
              zn(i)
            )
          l === 'in-out' && c.type !== _e
            ? (h.delayLeave = (_, S, L) => {
                const O = _i(s, f)
                ;(O[String(f.key)] = f),
                  (_[Qe] = () => {
                    S(), (_[Qe] = void 0), delete u.delayedLeave, (f = void 0)
                  }),
                  (u.delayedLeave = () => {
                    L(), delete u.delayedLeave, (f = void 0)
                  })
              })
            : (f = void 0)
        } else f && (f = void 0)
        return i
      }
    },
  }
function yi(e) {
  let t = e[0]
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== _e) {
        t = n
        break
      }
  }
  return t
}
const El = xl
function _i(e, t) {
  const { leavingVNodes: n } = e
  let s = n.get(t.type)
  return s || ((s = Object.create(null)), n.set(t.type, s)), s
}
function ys(e, t, n, s, r) {
  const {
      appear: i,
      mode: o,
      persisted: l = !1,
      onBeforeEnter: c,
      onEnter: u,
      onAfterEnter: f,
      onEnterCancelled: h,
      onBeforeLeave: _,
      onLeave: S,
      onAfterLeave: L,
      onLeaveCancelled: O,
      onBeforeAppear: G,
      onAppear: U,
      onAfterAppear: W,
      onAppearCancelled: g,
    } = t,
    p = String(e.key),
    A = _i(n, e),
    $ = (I, b) => {
      I && He(I, s, 9, b)
    },
    j = (I, b) => {
      const P = b[1]
      $(I, b),
        k(I) ? I.every((w) => w.length <= 1) && P() : I.length <= 1 && P()
    },
    K = {
      mode: o,
      persisted: l,
      beforeEnter(I) {
        let b = c
        if (!n.isMounted)
          if (i) b = G || c
          else return
        I[Qe] && I[Qe](!0)
        const P = A[p]
        P && ut(e, P) && P.el[Qe] && P.el[Qe](), $(b, [I])
      },
      enter(I) {
        let b = u,
          P = f,
          w = h
        if (!n.isMounted)
          if (i) (b = U || u), (P = W || f), (w = g || h)
          else return
        let V = !1
        const se = (I[rn] = (ie) => {
          V ||
            ((V = !0),
            ie ? $(w, [I]) : $(P, [I]),
            K.delayedLeave && K.delayedLeave(),
            (I[rn] = void 0))
        })
        b ? j(b, [I, se]) : se()
      },
      leave(I, b) {
        const P = String(e.key)
        if ((I[rn] && I[rn](!0), n.isUnmounting)) return b()
        $(_, [I])
        let w = !1
        const V = (I[Qe] = (se) => {
          w ||
            ((w = !0),
            b(),
            se ? $(O, [I]) : $(L, [I]),
            (I[Qe] = void 0),
            A[P] === e && delete A[P])
        })
        ;(A[P] = e), S ? j(S, [I, V]) : V()
      },
      clone(I) {
        const b = ys(I, t, n, s, r)
        return r && r(b), b
      },
    }
  return K
}
function zn(e) {
  if (Hn(e)) return (e = nt(e)), (e.children = null), e
}
function Zs(e) {
  if (!Hn(e)) return pi(e.type) && e.children ? yi(e.children) : e
  const { shapeFlag: t, children: n } = e
  if (n) {
    if (t & 16) return n[0]
    if (t & 32 && q(n.default)) return n.default()
  }
}
function Wt(e, t) {
  e.shapeFlag & 6 && e.component
    ? ((e.transition = t), Wt(e.component.subTree, t))
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t)
}
function bi(e, t = !1, n) {
  let s = [],
    r = 0
  for (let i = 0; i < e.length; i++) {
    let o = e[i]
    const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : i)
    o.type === Se
      ? (o.patchFlag & 128 && r++, (s = s.concat(bi(o.children, t, l))))
      : (t || o.type !== _e) && s.push(l != null ? nt(o, { key: l }) : o)
  }
  if (r > 1) for (let i = 0; i < s.length; i++) s[i].patchFlag = -2
  return s
}
/*! #__NO_SIDE_EFFECTS__ */ function wi(e, t) {
  return q(e) ? fe({ name: e.name }, t, { setup: e }) : e
}
function vi(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + '-', 0, 0]
}
function Kt(e, t, n, s, r = !1) {
  if (k(e)) {
    e.forEach((L, O) => Kt(L, t && (k(t) ? t[O] : t), n, s, r))
    return
  }
  if (pt(s) && !r) {
    s.shapeFlag & 512 &&
      s.type.__asyncResolved &&
      s.component.subTree.component &&
      Kt(e, t, n, s.component.subTree)
    return
  }
  const i = s.shapeFlag & 4 ? kn(s.component) : s.el,
    o = r ? null : i,
    { i: l, r: c } = e,
    u = t && t.r,
    f = l.refs === Z ? (l.refs = {}) : l.refs,
    h = l.setupState,
    _ = J(h),
    S = h === Z ? () => !1 : (L) => z(_, L)
  if (
    (u != null &&
      u !== c &&
      (re(u)
        ? ((f[u] = null), S(u) && (h[u] = null))
        : ce(u) && (u.value = null)),
    q(c))
  )
    zt(c, l, 12, [o, f])
  else {
    const L = re(c),
      O = ce(c)
    if (L || O) {
      const G = () => {
        if (e.f) {
          const U = L ? (S(c) ? h[c] : f[c]) : c.value
          r
            ? k(U) && Os(U, i)
            : k(U)
              ? U.includes(i) || U.push(i)
              : L
                ? ((f[c] = [i]), S(c) && (h[c] = f[c]))
                : ((c.value = [i]), e.k && (f[e.k] = c.value))
        } else
          L
            ? ((f[c] = o), S(c) && (h[c] = o))
            : O && ((c.value = o), e.k && (f[e.k] = o))
      }
      o ? ((G.id = -1), Ce(G, n)) : G()
    }
  }
}
let er = !1
const wt = () => {
    er ||
      (console.error('Hydration completed but contains mismatches.'), (er = !0))
  },
  Tl = (e) => e.namespaceURI.includes('svg') && e.tagName !== 'foreignObject',
  Cl = (e) => e.namespaceURI.includes('MathML'),
  on = (e) => {
    if (e.nodeType === 1) {
      if (Tl(e)) return 'svg'
      if (Cl(e)) return 'mathml'
    }
  },
  ln = (e) => e.nodeType === 8
function Al(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: s,
        createText: r,
        nextSibling: i,
        parentNode: o,
        remove: l,
        insert: c,
        createComment: u,
      },
    } = e,
    f = (g, p) => {
      if (!p.hasChildNodes()) {
        n(null, g, p), vn(), (p._vnode = g)
        return
      }
      h(p.firstChild, g, null, null, null), vn(), (p._vnode = g)
    },
    h = (g, p, A, $, j, K = !1) => {
      K = K || !!p.dynamicChildren
      const I = ln(g) && g.data === '[',
        b = () => O(g, p, A, $, j, I),
        { type: P, ref: w, shapeFlag: V, patchFlag: se } = p
      let ie = g.nodeType
      ;(p.el = g), se === -2 && ((K = !1), (p.dynamicChildren = null))
      let H = null
      switch (P) {
        case gt:
          ie !== 3
            ? p.children === ''
              ? (c((p.el = r('')), o(g), g), (H = g))
              : (H = b())
            : (g.data !== p.children && (wt(), (g.data = p.children)),
              (H = i(g)))
          break
        case _e:
          W(g)
            ? ((H = i(g)), U((p.el = g.content.firstChild), g, A))
            : ie !== 8 || I
              ? (H = b())
              : (H = i(g))
          break
        case jt:
          if ((I && ((g = i(g)), (ie = g.nodeType)), ie === 1 || ie === 3)) {
            H = g
            const Y = !p.children.length
            for (let F = 0; F < p.staticCount; F++)
              Y && (p.children += H.nodeType === 1 ? H.outerHTML : H.data),
                F === p.staticCount - 1 && (p.anchor = H),
                (H = i(H))
            return I ? i(H) : H
          } else b()
          break
        case Se:
          I ? (H = L(g, p, A, $, j, K)) : (H = b())
          break
        default:
          if (V & 1)
            (ie !== 1 || p.type.toLowerCase() !== g.tagName.toLowerCase()) &&
            !W(g)
              ? (H = b())
              : (H = _(g, p, A, $, j, K))
          else if (V & 6) {
            p.slotScopeIds = j
            const Y = o(g)
            if (
              (I
                ? (H = G(g))
                : ln(g) && g.data === 'teleport start'
                  ? (H = G(g, g.data, 'teleport end'))
                  : (H = i(g)),
              t(p, Y, null, A, $, on(Y), K),
              pt(p) && !p.type.__asyncResolved)
            ) {
              let F
              I
                ? ((F = he(Se)),
                  (F.anchor = H ? H.previousSibling : Y.lastChild))
                : (F = g.nodeType === 3 ? Qi('') : he('div')),
                (F.el = g),
                (p.component.subTree = F)
            }
          } else
            V & 64
              ? ie !== 8
                ? (H = b())
                : (H = p.type.hydrate(g, p, A, $, j, K, e, S))
              : V & 128 &&
                (H = p.type.hydrate(g, p, A, $, on(o(g)), j, K, e, h))
      }
      return w != null && Kt(w, null, $, p), H
    },
    _ = (g, p, A, $, j, K) => {
      K = K || !!p.dynamicChildren
      const {
          type: I,
          props: b,
          patchFlag: P,
          shapeFlag: w,
          dirs: V,
          transition: se,
        } = p,
        ie = I === 'input' || I === 'option'
      if (ie || P !== -1) {
        V && Ve(p, null, A, 'created')
        let H = !1
        if (W(g)) {
          H = Vi(null, se) && A && A.vnode.props && A.vnode.props.appear
          const F = g.content.firstChild
          H && se.beforeEnter(F), U(F, g, A), (p.el = g = F)
        }
        if (w & 16 && !(b && (b.innerHTML || b.textContent))) {
          let F = S(g.firstChild, p, g, A, $, j, K)
          for (; F; ) {
            cn(g, 1) || wt()
            const ae = F
            ;(F = F.nextSibling), l(ae)
          }
        } else if (w & 8) {
          let F = p.children
          F[0] ===
            `
` &&
            (g.tagName === 'PRE' || g.tagName === 'TEXTAREA') &&
            (F = F.slice(1)),
            g.textContent !== F &&
              (cn(g, 0) || wt(), (g.textContent = p.children))
        }
        if (b) {
          if (ie || !K || P & 48) {
            const F = g.tagName.includes('-')
            for (const ae in b)
              ((ie && (ae.endsWith('value') || ae === 'indeterminate')) ||
                (Jt(ae) && !Et(ae)) ||
                ae[0] === '.' ||
                F) &&
                s(g, ae, null, b[ae], void 0, A)
          } else if (b.onClick) s(g, 'onClick', null, b.onClick, void 0, A)
          else if (P & 4 && ht(b.style)) for (const F in b.style) b.style[F]
        }
        let Y
        ;(Y = b && b.onVnodeBeforeMount) && Oe(Y, A, p),
          V && Ve(p, null, A, 'beforeMount'),
          ((Y = b && b.onVnodeMounted) || V || H) &&
            Yi(() => {
              Y && Oe(Y, A, p), H && se.enter(g), V && Ve(p, null, A, 'mounted')
            }, $)
      }
      return g.nextSibling
    },
    S = (g, p, A, $, j, K, I) => {
      I = I || !!p.dynamicChildren
      const b = p.children,
        P = b.length
      for (let w = 0; w < P; w++) {
        const V = I ? b[w] : (b[w] = Me(b[w])),
          se = V.type === gt
        g
          ? (se &&
              !I &&
              w + 1 < P &&
              Me(b[w + 1]).type === gt &&
              (c(r(g.data.slice(V.children.length)), A, i(g)),
              (g.data = V.children)),
            (g = h(g, V, $, j, K, I)))
          : se && !V.children
            ? c((V.el = r('')), A)
            : (cn(A, 1) || wt(), n(null, V, A, null, $, j, on(A), K))
      }
      return g
    },
    L = (g, p, A, $, j, K) => {
      const { slotScopeIds: I } = p
      I && (j = j ? j.concat(I) : I)
      const b = o(g),
        P = S(i(g), p, b, A, $, j, K)
      return P && ln(P) && P.data === ']'
        ? i((p.anchor = P))
        : (wt(), c((p.anchor = u(']')), b, P), P)
    },
    O = (g, p, A, $, j, K) => {
      if ((cn(g.parentElement, 1) || wt(), (p.el = null), K)) {
        const P = G(g)
        for (;;) {
          const w = i(g)
          if (w && w !== P) l(w)
          else break
        }
      }
      const I = i(g),
        b = o(g)
      return (
        l(g),
        n(null, p, b, I, A, $, on(b), j),
        A && ((A.vnode.el = p.el), qi(A, p.el)),
        I
      )
    },
    G = (g, p = '[', A = ']') => {
      let $ = 0
      for (; g; )
        if (((g = i(g)), g && ln(g) && (g.data === p && $++, g.data === A))) {
          if ($ === 0) return i(g)
          $--
        }
      return g
    },
    U = (g, p, A) => {
      const $ = p.parentNode
      $ && $.replaceChild(g, p)
      let j = A
      for (; j; )
        j.vnode.el === p && (j.vnode.el = j.subTree.el = g), (j = j.parent)
    },
    W = (g) => g.nodeType === 1 && g.tagName === 'TEMPLATE'
  return [f, h]
}
const tr = 'data-allow-mismatch',
  Rl = { 0: 'text', 1: 'children', 2: 'class', 3: 'style', 4: 'attribute' }
function cn(e, t) {
  if (t === 0 || t === 1) for (; e && !e.hasAttribute(tr); ) e = e.parentElement
  const n = e && e.getAttribute(tr)
  if (n == null) return !1
  if (n === '') return !0
  {
    const s = n.split(',')
    return t === 0 && s.includes('children') ? !0 : n.split(',').includes(Rl[t])
  }
}
On().requestIdleCallback
On().cancelIdleCallback
const pt = (e) => !!e.type.__asyncLoader,
  Hn = (e) => e.type.__isKeepAlive
function Ol(e, t) {
  Si(e, 'a', t)
}
function Ml(e, t) {
  Si(e, 'da', t)
}
function Si(e, t, n = ue) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n
      for (; r; ) {
        if (r.isDeactivated) return
        r = r.parent
      }
      return e()
    })
  if ((Dn(t, s, n), n)) {
    let r = n.parent
    for (; r && r.parent; ) Hn(r.parent.vnode) && Il(s, t, n, r), (r = r.parent)
  }
}
function Il(e, t, n, s) {
  const r = Dn(t, e, s, !0)
  $n(() => {
    Os(s[t], r)
  }, n)
}
function Dn(e, t, n = ue, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...o) => {
          rt()
          const l = Qt(n),
            c = He(t, n, e, o)
          return l(), it(), c
        })
    return s ? r.unshift(i) : r.push(i), i
  }
}
const Xe =
    (e) =>
    (t, n = ue) => {
      ;(!Yt || e === 'sp') && Dn(e, (...s) => t(...s), n)
    },
  Ll = Xe('bm'),
  Ot = Xe('m'),
  Pl = Xe('bu'),
  Nl = Xe('u'),
  xi = Xe('bum'),
  $n = Xe('um'),
  Fl = Xe('sp'),
  Hl = Xe('rtg'),
  Dl = Xe('rtc')
function $l(e, t = ue) {
  Dn('ec', e, t)
}
const Ei = 'components'
function Qf(e, t) {
  return Ci(Ei, e, !0, t) || e
}
const Ti = Symbol.for('v-ndc')
function Zf(e) {
  return re(e) ? Ci(Ei, e, !1) || e : e || Ti
}
function Ci(e, t, n = !0, s = !1) {
  const r = le || ue
  if (r) {
    const i = r.type
    {
      const l = Sc(i, !1)
      if (l && (l === t || l === Le(t) || l === Rn(Le(t)))) return i
    }
    const o = nr(r[e] || i[e], t) || nr(r.appContext[e], t)
    return !o && s ? i : o
  }
}
function nr(e, t) {
  return e && (e[t] || e[Le(t)] || e[Rn(Le(t))])
}
function ea(e, t, n, s) {
  let r
  const i = n,
    o = k(e)
  if (o || re(e)) {
    const l = o && ht(e)
    let c = !1
    l && ((c = !Ie(e)), (e = In(e))), (r = new Array(e.length))
    for (let u = 0, f = e.length; u < f; u++)
      r[u] = t(c ? ye(e[u]) : e[u], u, void 0, i)
  } else if (typeof e == 'number') {
    r = new Array(e)
    for (let l = 0; l < e; l++) r[l] = t(l + 1, l, void 0, i)
  } else if (ne(e))
    if (e[Symbol.iterator]) r = Array.from(e, (l, c) => t(l, c, void 0, i))
    else {
      const l = Object.keys(e)
      r = new Array(l.length)
      for (let c = 0, u = l.length; c < u; c++) {
        const f = l[c]
        r[c] = t(e[f], f, c, i)
      }
    }
  else r = []
  return r
}
function ta(e, t, n = {}, s, r) {
  if (le.ce || (le.parent && pt(le.parent) && le.parent.ce))
    return (
      t !== 'default' && (n.name = t),
      Ss(),
      xs(Se, null, [he('slot', n, s && s())], 64)
    )
  let i = e[t]
  i && i._c && (i._d = !1), Ss()
  const o = i && Ai(i(n)),
    l = n.key || (o && o.key),
    c = xs(
      Se,
      { key: (l && !Ye(l) ? l : `_${t}`) + (!o && s ? '_fb' : '') },
      o || (s ? s() : []),
      o && e._ === 1 ? 64 : -2,
    )
  return (
    !r && c.scopeId && (c.slotScopeIds = [c.scopeId + '-s']),
    i && i._c && (i._d = !0),
    c
  )
}
function Ai(e) {
  return e.some((t) =>
    Gt(t) ? !(t.type === _e || (t.type === Se && !Ai(t.children))) : !0,
  )
    ? e
    : null
}
function na(e, t) {
  const n = {}
  for (const s in e) n[/[A-Z]/.test(s) ? `on:${s}` : hn(s)] = e[s]
  return n
}
const _s = (e) => (e ? (Zi(e) ? kn(e) : _s(e.parent)) : null),
  $t = fe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => _s(e.parent),
    $root: (e) => _s(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Oi(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        js(e.update)
      }),
    $nextTick: (e) => e.n || (e.n = Fn.bind(e.proxy)),
    $watch: (e) => oc.bind(e),
  }),
  Qn = (e, t) => e !== Z && !e.__isScriptSetup && z(e, t),
  jl = {
    get({ _: e }, t) {
      if (t === '__v_skip') return !0
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: i,
        accessCache: o,
        type: l,
        appContext: c,
      } = e
      let u
      if (t[0] !== '$') {
        const S = o[t]
        if (S !== void 0)
          switch (S) {
            case 1:
              return s[t]
            case 2:
              return r[t]
            case 4:
              return n[t]
            case 3:
              return i[t]
          }
        else {
          if (Qn(s, t)) return (o[t] = 1), s[t]
          if (r !== Z && z(r, t)) return (o[t] = 2), r[t]
          if ((u = e.propsOptions[0]) && z(u, t)) return (o[t] = 3), i[t]
          if (n !== Z && z(n, t)) return (o[t] = 4), n[t]
          bs && (o[t] = 0)
        }
      }
      const f = $t[t]
      let h, _
      if (f) return t === '$attrs' && me(e.attrs, 'get', ''), f(e)
      if ((h = l.__cssModules) && (h = h[t])) return h
      if (n !== Z && z(n, t)) return (o[t] = 4), n[t]
      if (((_ = c.config.globalProperties), z(_, t))) return _[t]
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: i } = e
      return Qn(r, t)
        ? ((r[t] = n), !0)
        : s !== Z && z(s, t)
          ? ((s[t] = n), !0)
          : z(e.props, t) || (t[0] === '$' && t.slice(1) in e)
            ? !1
            : ((i[t] = n), !0)
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          propsOptions: i,
        },
      },
      o,
    ) {
      let l
      return (
        !!n[o] ||
        (e !== Z && z(e, o)) ||
        Qn(t, o) ||
        ((l = i[0]) && z(l, o)) ||
        z(s, o) ||
        z($t, o) ||
        z(r.config.globalProperties, o)
      )
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : z(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      )
    },
  }
function sa() {
  return Vl().slots
}
function Vl() {
  const e = Un()
  return e.setupContext || (e.setupContext = to(e))
}
function sr(e) {
  return k(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e
}
let bs = !0
function Ul(e) {
  const t = Oi(e),
    n = e.proxy,
    s = e.ctx
  ;(bs = !1), t.beforeCreate && rr(t.beforeCreate, e, 'bc')
  const {
    data: r,
    computed: i,
    methods: o,
    watch: l,
    provide: c,
    inject: u,
    created: f,
    beforeMount: h,
    mounted: _,
    beforeUpdate: S,
    updated: L,
    activated: O,
    deactivated: G,
    beforeDestroy: U,
    beforeUnmount: W,
    destroyed: g,
    unmounted: p,
    render: A,
    renderTracked: $,
    renderTriggered: j,
    errorCaptured: K,
    serverPrefetch: I,
    expose: b,
    inheritAttrs: P,
    components: w,
    directives: V,
    filters: se,
  } = t
  if ((u && kl(u, s, null), o))
    for (const Y in o) {
      const F = o[Y]
      q(F) && (s[Y] = F.bind(n))
    }
  if (r) {
    const Y = r.call(n, n)
    ne(Y) && (e.data = Ln(Y))
  }
  if (((bs = !0), i))
    for (const Y in i) {
      const F = i[Y],
        ae = q(F) ? F.bind(n, n) : q(F.get) ? F.get.bind(n, n) : Ue,
        Zt = !q(F) && q(F.set) ? F.set.bind(n) : Ue,
        ot = oe({ get: ae, set: Zt })
      Object.defineProperty(s, Y, {
        enumerable: !0,
        configurable: !0,
        get: () => ot.value,
        set: (De) => (ot.value = De),
      })
    }
  if (l) for (const Y in l) Ri(l[Y], s, n, Y)
  if (c) {
    const Y = q(c) ? c.call(n) : c
    Reflect.ownKeys(Y).forEach((F) => {
      Yl(F, Y[F])
    })
  }
  f && rr(f, e, 'c')
  function H(Y, F) {
    k(F) ? F.forEach((ae) => Y(ae.bind(n))) : F && Y(F.bind(n))
  }
  if (
    (H(Ll, h),
    H(Ot, _),
    H(Pl, S),
    H(Nl, L),
    H(Ol, O),
    H(Ml, G),
    H($l, K),
    H(Dl, $),
    H(Hl, j),
    H(xi, W),
    H($n, p),
    H(Fl, I),
    k(b))
  )
    if (b.length) {
      const Y = e.exposed || (e.exposed = {})
      b.forEach((F) => {
        Object.defineProperty(Y, F, {
          get: () => n[F],
          set: (ae) => (n[F] = ae),
        })
      })
    } else e.exposed || (e.exposed = {})
  A && e.render === Ue && (e.render = A),
    P != null && (e.inheritAttrs = P),
    w && (e.components = w),
    V && (e.directives = V),
    I && vi(e)
}
function kl(e, t, n = Ue) {
  k(e) && (e = ws(e))
  for (const s in e) {
    const r = e[s]
    let i
    ne(r)
      ? 'default' in r
        ? (i = At(r.from || s, r.default, !0))
        : (i = At(r.from || s))
      : (i = At(r)),
      ce(i)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (o) => (i.value = o),
          })
        : (t[s] = i)
  }
}
function rr(e, t, n) {
  He(k(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Ri(e, t, n, s) {
  let r = s.includes('.') ? Wi(n, s) : () => n[s]
  if (re(e)) {
    const i = t[e]
    q(i) && Fe(r, i)
  } else if (q(e)) Fe(r, e.bind(n))
  else if (ne(e))
    if (k(e)) e.forEach((i) => Ri(i, t, n, s))
    else {
      const i = q(e.handler) ? e.handler.bind(n) : t[e.handler]
      q(i) && Fe(r, i, e)
    }
}
function Oi(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: i,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    l = i.get(t)
  let c
  return (
    l
      ? (c = l)
      : !r.length && !n && !s
        ? (c = t)
        : ((c = {}),
          r.length && r.forEach((u) => xn(c, u, o, !0)),
          xn(c, t, o)),
    ne(t) && i.set(t, c),
    c
  )
}
function xn(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t
  i && xn(e, i, n, !0), r && r.forEach((o) => xn(e, o, n, !0))
  for (const o in t)
    if (!(s && o === 'expose')) {
      const l = Bl[o] || (n && n[o])
      e[o] = l ? l(e[o], t[o]) : t[o]
    }
  return e
}
const Bl = {
  data: ir,
  props: or,
  emits: or,
  methods: Ft,
  computed: Ft,
  beforeCreate: be,
  created: be,
  beforeMount: be,
  mounted: be,
  beforeUpdate: be,
  updated: be,
  beforeDestroy: be,
  beforeUnmount: be,
  destroyed: be,
  unmounted: be,
  activated: be,
  deactivated: be,
  errorCaptured: be,
  serverPrefetch: be,
  components: Ft,
  directives: Ft,
  watch: Kl,
  provide: ir,
  inject: Wl,
}
function ir(e, t) {
  return t
    ? e
      ? function () {
          return fe(
            q(e) ? e.call(this, this) : e,
            q(t) ? t.call(this, this) : t,
          )
        }
      : t
    : e
}
function Wl(e, t) {
  return Ft(ws(e), ws(t))
}
function ws(e) {
  if (k(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function be(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function Ft(e, t) {
  return e ? fe(Object.create(null), e, t) : t
}
function or(e, t) {
  return e
    ? k(e) && k(t)
      ? [...new Set([...e, ...t])]
      : fe(Object.create(null), sr(e), sr(t ?? {}))
    : t
}
function Kl(e, t) {
  if (!e) return t
  if (!t) return e
  const n = fe(Object.create(null), e)
  for (const s in t) n[s] = be(e[s], t[s])
  return n
}
function Mi() {
  return {
    app: null,
    config: {
      isNativeTag: xo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  }
}
let ql = 0
function Gl(e, t) {
  return function (s, r = null) {
    q(s) || (s = fe({}, s)), r != null && !ne(r) && (r = null)
    const i = Mi(),
      o = new WeakSet(),
      l = []
    let c = !1
    const u = (i.app = {
      _uid: ql++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: Ec,
      get config() {
        return i.config
      },
      set config(f) {},
      use(f, ...h) {
        return (
          o.has(f) ||
            (f && q(f.install)
              ? (o.add(f), f.install(u, ...h))
              : q(f) && (o.add(f), f(u, ...h))),
          u
        )
      },
      mixin(f) {
        return i.mixins.includes(f) || i.mixins.push(f), u
      },
      component(f, h) {
        return h ? ((i.components[f] = h), u) : i.components[f]
      },
      directive(f, h) {
        return h ? ((i.directives[f] = h), u) : i.directives[f]
      },
      mount(f, h, _) {
        if (!c) {
          const S = u._ceVNode || he(s, r)
          return (
            (S.appContext = i),
            _ === !0 ? (_ = 'svg') : _ === !1 && (_ = void 0),
            h && t ? t(S, f) : e(S, f, _),
            (c = !0),
            (u._container = f),
            (f.__vue_app__ = u),
            kn(S.component)
          )
        }
      },
      onUnmount(f) {
        l.push(f)
      },
      unmount() {
        c &&
          (He(l, u._instance, 16),
          e(null, u._container),
          delete u._container.__vue_app__)
      },
      provide(f, h) {
        return (i.provides[f] = h), u
      },
      runWithContext(f) {
        const h = Ct
        Ct = u
        try {
          return f()
        } finally {
          Ct = h
        }
      },
    })
    return u
  }
}
let Ct = null
function Yl(e, t) {
  if (ue) {
    let n = ue.provides
    const s = ue.parent && ue.parent.provides
    s === n && (n = ue.provides = Object.create(s)), (n[e] = t)
  }
}
function At(e, t, n = !1) {
  const s = ue || le
  if (s || Ct) {
    const r = Ct
      ? Ct._context.provides
      : s
        ? s.parent == null
          ? s.vnode.appContext && s.vnode.appContext.provides
          : s.parent.provides
        : void 0
    if (r && e in r) return r[e]
    if (arguments.length > 1) return n && q(t) ? t.call(s && s.proxy) : t
  }
}
const Ii = {},
  Li = () => Object.create(Ii),
  Pi = (e) => Object.getPrototypeOf(e) === Ii
function Xl(e, t, n, s = !1) {
  const r = {},
    i = Li()
  ;(e.propsDefaults = Object.create(null)), Ni(e, t, r, i)
  for (const o in e.propsOptions[0]) o in r || (r[o] = void 0)
  n ? (e.props = s ? r : rl(r)) : e.type.props ? (e.props = r) : (e.props = i),
    (e.attrs = i)
}
function Jl(e, t, n, s) {
  const {
      props: r,
      attrs: i,
      vnode: { patchFlag: o },
    } = e,
    l = J(r),
    [c] = e.propsOptions
  let u = !1
  if ((s || o > 0) && !(o & 16)) {
    if (o & 8) {
      const f = e.vnode.dynamicProps
      for (let h = 0; h < f.length; h++) {
        let _ = f[h]
        if (Vn(e.emitsOptions, _)) continue
        const S = t[_]
        if (c)
          if (z(i, _)) S !== i[_] && ((i[_] = S), (u = !0))
          else {
            const L = Le(_)
            r[L] = vs(c, l, L, S, e, !1)
          }
        else S !== i[_] && ((i[_] = S), (u = !0))
      }
    }
  } else {
    Ni(e, t, r, i) && (u = !0)
    let f
    for (const h in l)
      (!t || (!z(t, h) && ((f = st(h)) === h || !z(t, f)))) &&
        (c
          ? n &&
            (n[h] !== void 0 || n[f] !== void 0) &&
            (r[h] = vs(c, l, h, void 0, e, !0))
          : delete r[h])
    if (i !== l) for (const h in i) (!t || !z(t, h)) && (delete i[h], (u = !0))
  }
  u && Ke(e.attrs, 'set', '')
}
function Ni(e, t, n, s) {
  const [r, i] = e.propsOptions
  let o = !1,
    l
  if (t)
    for (let c in t) {
      if (Et(c)) continue
      const u = t[c]
      let f
      r && z(r, (f = Le(c)))
        ? !i || !i.includes(f)
          ? (n[f] = u)
          : ((l || (l = {}))[f] = u)
        : Vn(e.emitsOptions, c) ||
          ((!(c in s) || u !== s[c]) && ((s[c] = u), (o = !0)))
    }
  if (i) {
    const c = J(n),
      u = l || Z
    for (let f = 0; f < i.length; f++) {
      const h = i[f]
      n[h] = vs(r, c, h, u[h], e, !z(u, h))
    }
  }
  return o
}
function vs(e, t, n, s, r, i) {
  const o = e[n]
  if (o != null) {
    const l = z(o, 'default')
    if (l && s === void 0) {
      const c = o.default
      if (o.type !== Function && !o.skipFactory && q(c)) {
        const { propsDefaults: u } = r
        if (n in u) s = u[n]
        else {
          const f = Qt(r)
          ;(s = u[n] = c.call(null, t)), f()
        }
      } else s = c
      r.ce && r.ce._setProp(n, s)
    }
    o[0] && (i && !l ? (s = !1) : o[1] && (s === '' || s === st(n)) && (s = !0))
  }
  return s
}
const zl = new WeakMap()
function Fi(e, t, n = !1) {
  const s = n ? zl : t.propsCache,
    r = s.get(e)
  if (r) return r
  const i = e.props,
    o = {},
    l = []
  let c = !1
  if (!q(e)) {
    const f = (h) => {
      c = !0
      const [_, S] = Fi(h, t, !0)
      fe(o, _), S && l.push(...S)
    }
    !n && t.mixins.length && t.mixins.forEach(f),
      e.extends && f(e.extends),
      e.mixins && e.mixins.forEach(f)
  }
  if (!i && !c) return ne(e) && s.set(e, St), St
  if (k(i))
    for (let f = 0; f < i.length; f++) {
      const h = Le(i[f])
      lr(h) && (o[h] = Z)
    }
  else if (i)
    for (const f in i) {
      const h = Le(f)
      if (lr(h)) {
        const _ = i[f],
          S = (o[h] = k(_) || q(_) ? { type: _ } : fe({}, _)),
          L = S.type
        let O = !1,
          G = !0
        if (k(L))
          for (let U = 0; U < L.length; ++U) {
            const W = L[U],
              g = q(W) && W.name
            if (g === 'Boolean') {
              O = !0
              break
            } else g === 'String' && (G = !1)
          }
        else O = q(L) && L.name === 'Boolean'
        ;(S[0] = O), (S[1] = G), (O || z(S, 'default')) && l.push(h)
      }
    }
  const u = [o, l]
  return ne(e) && s.set(e, u), u
}
function lr(e) {
  return e[0] !== '$' && !Et(e)
}
const Hi = (e) => e[0] === '_' || e === '$stable',
  Vs = (e) => (k(e) ? e.map(Me) : [Me(e)]),
  Ql = (e, t, n) => {
    if (t._n) return t
    const s = wl((...r) => Vs(t(...r)), n)
    return (s._c = !1), s
  },
  Di = (e, t, n) => {
    const s = e._ctx
    for (const r in e) {
      if (Hi(r)) continue
      const i = e[r]
      if (q(i)) t[r] = Ql(r, i, s)
      else if (i != null) {
        const o = Vs(i)
        t[r] = () => o
      }
    }
  },
  $i = (e, t) => {
    const n = Vs(t)
    e.slots.default = () => n
  },
  ji = (e, t, n) => {
    for (const s in t) (n || s !== '_') && (e[s] = t[s])
  },
  Zl = (e, t, n) => {
    const s = (e.slots = Li())
    if (e.vnode.shapeFlag & 32) {
      const r = t._
      r ? (ji(s, t, n), n && Ur(s, '_', r, !0)) : Di(t, s)
    } else t && $i(e, t)
  },
  ec = (e, t, n) => {
    const { vnode: s, slots: r } = e
    let i = !0,
      o = Z
    if (s.shapeFlag & 32) {
      const l = t._
      l
        ? n && l === 1
          ? (i = !1)
          : ji(r, t, n)
        : ((i = !t.$stable), Di(t, r)),
        (o = t)
    } else t && ($i(e, t), (o = { default: 1 }))
    if (i) for (const l in r) !Hi(l) && o[l] == null && delete r[l]
  },
  Ce = Yi
function tc(e) {
  return nc(e, Al)
}
function nc(e, t) {
  const n = On()
  n.__VUE__ = !0
  const {
      insert: s,
      remove: r,
      patchProp: i,
      createElement: o,
      createText: l,
      createComment: c,
      setText: u,
      setElementText: f,
      parentNode: h,
      nextSibling: _,
      setScopeId: S = Ue,
      insertStaticContent: L,
    } = e,
    O = (
      a,
      d,
      m,
      x = null,
      y = null,
      v = null,
      R = void 0,
      C = null,
      T = !!d.dynamicChildren,
    ) => {
      if (a === d) return
      a && !ut(a, d) && ((x = en(a)), De(a, y, v, !0), (a = null)),
        d.patchFlag === -2 && ((T = !1), (d.dynamicChildren = null))
      const { type: E, ref: D, shapeFlag: M } = d
      switch (E) {
        case gt:
          G(a, d, m, x)
          break
        case _e:
          U(a, d, m, x)
          break
        case jt:
          a == null && W(d, m, x, R)
          break
        case Se:
          w(a, d, m, x, y, v, R, C, T)
          break
        default:
          M & 1
            ? A(a, d, m, x, y, v, R, C, T)
            : M & 6
              ? V(a, d, m, x, y, v, R, C, T)
              : (M & 64 || M & 128) && E.process(a, d, m, x, y, v, R, C, T, _t)
      }
      D != null && y && Kt(D, a && a.ref, v, d || a, !d)
    },
    G = (a, d, m, x) => {
      if (a == null) s((d.el = l(d.children)), m, x)
      else {
        const y = (d.el = a.el)
        d.children !== a.children && u(y, d.children)
      }
    },
    U = (a, d, m, x) => {
      a == null ? s((d.el = c(d.children || '')), m, x) : (d.el = a.el)
    },
    W = (a, d, m, x) => {
      ;[a.el, a.anchor] = L(a.children, d, m, x, a.el, a.anchor)
    },
    g = ({ el: a, anchor: d }, m, x) => {
      let y
      for (; a && a !== d; ) (y = _(a)), s(a, m, x), (a = y)
      s(d, m, x)
    },
    p = ({ el: a, anchor: d }) => {
      let m
      for (; a && a !== d; ) (m = _(a)), r(a), (a = m)
      r(d)
    },
    A = (a, d, m, x, y, v, R, C, T) => {
      d.type === 'svg' ? (R = 'svg') : d.type === 'math' && (R = 'mathml'),
        a == null ? $(d, m, x, y, v, R, C, T) : I(a, d, y, v, R, C, T)
    },
    $ = (a, d, m, x, y, v, R, C) => {
      let T, E
      const { props: D, shapeFlag: M, transition: N, dirs: B } = a
      if (
        ((T = a.el = o(a.type, v, D && D.is, D)),
        M & 8
          ? f(T, a.children)
          : M & 16 && K(a.children, T, null, x, y, Zn(a, v), R, C),
        B && Ve(a, null, x, 'created'),
        j(T, a, a.scopeId, R, x),
        D)
      ) {
        for (const ee in D)
          ee !== 'value' && !Et(ee) && i(T, ee, null, D[ee], v, x)
        'value' in D && i(T, 'value', null, D.value, v),
          (E = D.onVnodeBeforeMount) && Oe(E, x, a)
      }
      B && Ve(a, null, x, 'beforeMount')
      const X = Vi(y, N)
      X && N.beforeEnter(T),
        s(T, d, m),
        ((E = D && D.onVnodeMounted) || X || B) &&
          Ce(() => {
            E && Oe(E, x, a), X && N.enter(T), B && Ve(a, null, x, 'mounted')
          }, y)
    },
    j = (a, d, m, x, y) => {
      if ((m && S(a, m), x)) for (let v = 0; v < x.length; v++) S(a, x[v])
      if (y) {
        let v = y.subTree
        if (
          d === v ||
          (Gi(v.type) && (v.ssContent === d || v.ssFallback === d))
        ) {
          const R = y.vnode
          j(a, R, R.scopeId, R.slotScopeIds, y.parent)
        }
      }
    },
    K = (a, d, m, x, y, v, R, C, T = 0) => {
      for (let E = T; E < a.length; E++) {
        const D = (a[E] = C ? Ze(a[E]) : Me(a[E]))
        O(null, D, d, m, x, y, v, R, C)
      }
    },
    I = (a, d, m, x, y, v, R) => {
      const C = (d.el = a.el)
      let { patchFlag: T, dynamicChildren: E, dirs: D } = d
      T |= a.patchFlag & 16
      const M = a.props || Z,
        N = d.props || Z
      let B
      if (
        (m && lt(m, !1),
        (B = N.onVnodeBeforeUpdate) && Oe(B, m, d, a),
        D && Ve(d, a, m, 'beforeUpdate'),
        m && lt(m, !0),
        ((M.innerHTML && N.innerHTML == null) ||
          (M.textContent && N.textContent == null)) &&
          f(C, ''),
        E
          ? b(a.dynamicChildren, E, C, m, x, Zn(d, y), v)
          : R || F(a, d, C, null, m, x, Zn(d, y), v, !1),
        T > 0)
      ) {
        if (T & 16) P(C, M, N, m, y)
        else if (
          (T & 2 && M.class !== N.class && i(C, 'class', null, N.class, y),
          T & 4 && i(C, 'style', M.style, N.style, y),
          T & 8)
        ) {
          const X = d.dynamicProps
          for (let ee = 0; ee < X.length; ee++) {
            const Q = X[ee],
              xe = M[Q],
              pe = N[Q]
            ;(pe !== xe || Q === 'value') && i(C, Q, xe, pe, y, m)
          }
        }
        T & 1 && a.children !== d.children && f(C, d.children)
      } else !R && E == null && P(C, M, N, m, y)
      ;((B = N.onVnodeUpdated) || D) &&
        Ce(() => {
          B && Oe(B, m, d, a), D && Ve(d, a, m, 'updated')
        }, x)
    },
    b = (a, d, m, x, y, v, R) => {
      for (let C = 0; C < d.length; C++) {
        const T = a[C],
          E = d[C],
          D =
            T.el && (T.type === Se || !ut(T, E) || T.shapeFlag & 70)
              ? h(T.el)
              : m
        O(T, E, D, null, x, y, v, R, !0)
      }
    },
    P = (a, d, m, x, y) => {
      if (d !== m) {
        if (d !== Z)
          for (const v in d) !Et(v) && !(v in m) && i(a, v, d[v], null, y, x)
        for (const v in m) {
          if (Et(v)) continue
          const R = m[v],
            C = d[v]
          R !== C && v !== 'value' && i(a, v, C, R, y, x)
        }
        'value' in m && i(a, 'value', d.value, m.value, y)
      }
    },
    w = (a, d, m, x, y, v, R, C, T) => {
      const E = (d.el = a ? a.el : l('')),
        D = (d.anchor = a ? a.anchor : l(''))
      let { patchFlag: M, dynamicChildren: N, slotScopeIds: B } = d
      B && (C = C ? C.concat(B) : B),
        a == null
          ? (s(E, m, x), s(D, m, x), K(d.children || [], m, D, y, v, R, C, T))
          : M > 0 && M & 64 && N && a.dynamicChildren
            ? (b(a.dynamicChildren, N, m, y, v, R, C),
              (d.key != null || (y && d === y.subTree)) && Ui(a, d, !0))
            : F(a, d, m, D, y, v, R, C, T)
    },
    V = (a, d, m, x, y, v, R, C, T) => {
      ;(d.slotScopeIds = C),
        a == null
          ? d.shapeFlag & 512
            ? y.ctx.activate(d, m, x, R, T)
            : se(d, m, x, y, v, R, T)
          : ie(a, d, T)
    },
    se = (a, d, m, x, y, v, R) => {
      const C = (a.component = _c(a, x, y))
      if ((Hn(a) && (C.ctx.renderer = _t), bc(C, !1, R), C.asyncDep)) {
        if ((y && y.registerDep(C, H, R), !a.el)) {
          const T = (C.subTree = he(_e))
          U(null, T, d, m)
        }
      } else H(C, a, d, m, y, v, R)
    },
    ie = (a, d, m) => {
      const x = (d.component = a.component)
      if (uc(a, d, m))
        if (x.asyncDep && !x.asyncResolved) {
          Y(x, d, m)
          return
        } else (x.next = d), x.update()
      else (d.el = a.el), (x.vnode = d)
    },
    H = (a, d, m, x, y, v, R) => {
      const C = () => {
        if (a.isMounted) {
          let { next: M, bu: N, u: B, parent: X, vnode: ee } = a
          {
            const Ee = ki(a)
            if (Ee) {
              M && ((M.el = ee.el), Y(a, M, R)),
                Ee.asyncDep.then(() => {
                  a.isUnmounted || C()
                })
              return
            }
          }
          let Q = M,
            xe
          lt(a, !1),
            M ? ((M.el = ee.el), Y(a, M, R)) : (M = ee),
            N && qn(N),
            (xe = M.props && M.props.onVnodeBeforeUpdate) && Oe(xe, X, M, ee),
            lt(a, !0)
          const pe = es(a),
            Pe = a.subTree
          ;(a.subTree = pe),
            O(Pe, pe, h(Pe.el), en(Pe), a, y, v),
            (M.el = pe.el),
            Q === null && qi(a, pe.el),
            B && Ce(B, y),
            (xe = M.props && M.props.onVnodeUpdated) &&
              Ce(() => Oe(xe, X, M, ee), y)
        } else {
          let M
          const { el: N, props: B } = d,
            { bm: X, m: ee, parent: Q, root: xe, type: pe } = a,
            Pe = pt(d)
          if (
            (lt(a, !1),
            X && qn(X),
            !Pe && (M = B && B.onVnodeBeforeMount) && Oe(M, Q, d),
            lt(a, !0),
            N && Kn)
          ) {
            const Ee = () => {
              ;(a.subTree = es(a)), Kn(N, a.subTree, a, y, null)
            }
            Pe && pe.__asyncHydrate ? pe.__asyncHydrate(N, a, Ee) : Ee()
          } else {
            xe.ce && xe.ce._injectChildStyle(pe)
            const Ee = (a.subTree = es(a))
            O(null, Ee, m, x, a, y, v), (d.el = Ee.el)
          }
          if ((ee && Ce(ee, y), !Pe && (M = B && B.onVnodeMounted))) {
            const Ee = d
            Ce(() => Oe(M, Q, Ee), y)
          }
          ;(d.shapeFlag & 256 ||
            (Q && pt(Q.vnode) && Q.vnode.shapeFlag & 256)) &&
            a.a &&
            Ce(a.a, y),
            (a.isMounted = !0),
            (d = m = x = null)
        }
      }
      a.scope.on()
      const T = (a.effect = new qr(C))
      a.scope.off()
      const E = (a.update = T.run.bind(T)),
        D = (a.job = T.runIfDirty.bind(T))
      ;(D.i = a), (D.id = a.uid), (T.scheduler = () => js(D)), lt(a, !0), E()
    },
    Y = (a, d, m) => {
      d.component = a
      const x = a.vnode.props
      ;(a.vnode = d),
        (a.next = null),
        Jl(a, d.props, x, m),
        ec(a, d.children, m),
        rt(),
        Qs(a),
        it()
    },
    F = (a, d, m, x, y, v, R, C, T = !1) => {
      const E = a && a.children,
        D = a ? a.shapeFlag : 0,
        M = d.children,
        { patchFlag: N, shapeFlag: B } = d
      if (N > 0) {
        if (N & 128) {
          Zt(E, M, m, x, y, v, R, C, T)
          return
        } else if (N & 256) {
          ae(E, M, m, x, y, v, R, C, T)
          return
        }
      }
      B & 8
        ? (D & 16 && Mt(E, y, v), M !== E && f(m, M))
        : D & 16
          ? B & 16
            ? Zt(E, M, m, x, y, v, R, C, T)
            : Mt(E, y, v, !0)
          : (D & 8 && f(m, ''), B & 16 && K(M, m, x, y, v, R, C, T))
    },
    ae = (a, d, m, x, y, v, R, C, T) => {
      ;(a = a || St), (d = d || St)
      const E = a.length,
        D = d.length,
        M = Math.min(E, D)
      let N
      for (N = 0; N < M; N++) {
        const B = (d[N] = T ? Ze(d[N]) : Me(d[N]))
        O(a[N], B, m, null, y, v, R, C, T)
      }
      E > D ? Mt(a, y, v, !0, !1, M) : K(d, m, x, y, v, R, C, T, M)
    },
    Zt = (a, d, m, x, y, v, R, C, T) => {
      let E = 0
      const D = d.length
      let M = a.length - 1,
        N = D - 1
      for (; E <= M && E <= N; ) {
        const B = a[E],
          X = (d[E] = T ? Ze(d[E]) : Me(d[E]))
        if (ut(B, X)) O(B, X, m, null, y, v, R, C, T)
        else break
        E++
      }
      for (; E <= M && E <= N; ) {
        const B = a[M],
          X = (d[N] = T ? Ze(d[N]) : Me(d[N]))
        if (ut(B, X)) O(B, X, m, null, y, v, R, C, T)
        else break
        M--, N--
      }
      if (E > M) {
        if (E <= N) {
          const B = N + 1,
            X = B < D ? d[B].el : x
          for (; E <= N; )
            O(null, (d[E] = T ? Ze(d[E]) : Me(d[E])), m, X, y, v, R, C, T), E++
        }
      } else if (E > N) for (; E <= M; ) De(a[E], y, v, !0), E++
      else {
        const B = E,
          X = E,
          ee = new Map()
        for (E = X; E <= N; E++) {
          const Te = (d[E] = T ? Ze(d[E]) : Me(d[E]))
          Te.key != null && ee.set(Te.key, E)
        }
        let Q,
          xe = 0
        const pe = N - X + 1
        let Pe = !1,
          Ee = 0
        const It = new Array(pe)
        for (E = 0; E < pe; E++) It[E] = 0
        for (E = B; E <= M; E++) {
          const Te = a[E]
          if (xe >= pe) {
            De(Te, y, v, !0)
            continue
          }
          let $e
          if (Te.key != null) $e = ee.get(Te.key)
          else
            for (Q = X; Q <= N; Q++)
              if (It[Q - X] === 0 && ut(Te, d[Q])) {
                $e = Q
                break
              }
          $e === void 0
            ? De(Te, y, v, !0)
            : ((It[$e - X] = E + 1),
              $e >= Ee ? (Ee = $e) : (Pe = !0),
              O(Te, d[$e], m, null, y, v, R, C, T),
              xe++)
        }
        const Gs = Pe ? sc(It) : St
        for (Q = Gs.length - 1, E = pe - 1; E >= 0; E--) {
          const Te = X + E,
            $e = d[Te],
            Ys = Te + 1 < D ? d[Te + 1].el : x
          It[E] === 0
            ? O(null, $e, m, Ys, y, v, R, C, T)
            : Pe && (Q < 0 || E !== Gs[Q] ? ot($e, m, Ys, 2) : Q--)
        }
      }
    },
    ot = (a, d, m, x, y = null) => {
      const { el: v, type: R, transition: C, children: T, shapeFlag: E } = a
      if (E & 6) {
        ot(a.component.subTree, d, m, x)
        return
      }
      if (E & 128) {
        a.suspense.move(d, m, x)
        return
      }
      if (E & 64) {
        R.move(a, d, m, _t)
        return
      }
      if (R === Se) {
        s(v, d, m)
        for (let M = 0; M < T.length; M++) ot(T[M], d, m, x)
        s(a.anchor, d, m)
        return
      }
      if (R === jt) {
        g(a, d, m)
        return
      }
      if (x !== 2 && E & 1 && C)
        if (x === 0) C.beforeEnter(v), s(v, d, m), Ce(() => C.enter(v), y)
        else {
          const { leave: M, delayLeave: N, afterLeave: B } = C,
            X = () => s(v, d, m),
            ee = () => {
              M(v, () => {
                X(), B && B()
              })
            }
          N ? N(v, X, ee) : ee()
        }
      else s(v, d, m)
    },
    De = (a, d, m, x = !1, y = !1) => {
      const {
        type: v,
        props: R,
        ref: C,
        children: T,
        dynamicChildren: E,
        shapeFlag: D,
        patchFlag: M,
        dirs: N,
        cacheIndex: B,
      } = a
      if (
        (M === -2 && (y = !1),
        C != null && Kt(C, null, m, a, !0),
        B != null && (d.renderCache[B] = void 0),
        D & 256)
      ) {
        d.ctx.deactivate(a)
        return
      }
      const X = D & 1 && N,
        ee = !pt(a)
      let Q
      if ((ee && (Q = R && R.onVnodeBeforeUnmount) && Oe(Q, d, a), D & 6))
        So(a.component, m, x)
      else {
        if (D & 128) {
          a.suspense.unmount(m, x)
          return
        }
        X && Ve(a, null, d, 'beforeUnmount'),
          D & 64
            ? a.type.remove(a, d, m, _t, x)
            : E && !E.hasOnce && (v !== Se || (M > 0 && M & 64))
              ? Mt(E, d, m, !1, !0)
              : ((v === Se && M & 384) || (!y && D & 16)) && Mt(T, d, m),
          x && Ks(a)
      }
      ;((ee && (Q = R && R.onVnodeUnmounted)) || X) &&
        Ce(() => {
          Q && Oe(Q, d, a), X && Ve(a, null, d, 'unmounted')
        }, m)
    },
    Ks = (a) => {
      const { type: d, el: m, anchor: x, transition: y } = a
      if (d === Se) {
        vo(m, x)
        return
      }
      if (d === jt) {
        p(a)
        return
      }
      const v = () => {
        r(m), y && !y.persisted && y.afterLeave && y.afterLeave()
      }
      if (a.shapeFlag & 1 && y && !y.persisted) {
        const { leave: R, delayLeave: C } = y,
          T = () => R(m, v)
        C ? C(a.el, v, T) : T()
      } else v()
    },
    vo = (a, d) => {
      let m
      for (; a !== d; ) (m = _(a)), r(a), (a = m)
      r(d)
    },
    So = (a, d, m) => {
      const { bum: x, scope: y, job: v, subTree: R, um: C, m: T, a: E } = a
      cr(T),
        cr(E),
        x && qn(x),
        y.stop(),
        v && ((v.flags |= 8), De(R, a, d, m)),
        C && Ce(C, d),
        Ce(() => {
          a.isUnmounted = !0
        }, d),
        d &&
          d.pendingBranch &&
          !d.isUnmounted &&
          a.asyncDep &&
          !a.asyncResolved &&
          a.suspenseId === d.pendingId &&
          (d.deps--, d.deps === 0 && d.resolve())
    },
    Mt = (a, d, m, x = !1, y = !1, v = 0) => {
      for (let R = v; R < a.length; R++) De(a[R], d, m, x, y)
    },
    en = (a) => {
      if (a.shapeFlag & 6) return en(a.component.subTree)
      if (a.shapeFlag & 128) return a.suspense.next()
      const d = _(a.anchor || a.el),
        m = d && d[vl]
      return m ? _(m) : d
    }
  let Bn = !1
  const qs = (a, d, m) => {
      a == null
        ? d._vnode && De(d._vnode, null, null, !0)
        : O(d._vnode || null, a, d, null, null, null, m),
        (d._vnode = a),
        Bn || ((Bn = !0), Qs(), vn(), (Bn = !1))
    },
    _t = {
      p: O,
      um: De,
      m: ot,
      r: Ks,
      mt: se,
      mc: K,
      pc: F,
      pbc: b,
      n: en,
      o: e,
    }
  let Wn, Kn
  return ([Wn, Kn] = t(_t)), { render: qs, hydrate: Wn, createApp: Gl(qs, Wn) }
}
function Zn({ type: e, props: t }, n) {
  return (n === 'svg' && e === 'foreignObject') ||
    (n === 'mathml' &&
      e === 'annotation-xml' &&
      t &&
      t.encoding &&
      t.encoding.includes('html'))
    ? void 0
    : n
}
function lt({ effect: e, job: t }, n) {
  n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5))
}
function Vi(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted
}
function Ui(e, t, n = !1) {
  const s = e.children,
    r = t.children
  if (k(s) && k(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i]
      let l = r[i]
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[i] = Ze(r[i])), (l.el = o.el)),
        !n && l.patchFlag !== -2 && Ui(o, l)),
        l.type === gt && (l.el = o.el)
    }
}
function sc(e) {
  const t = e.slice(),
    n = [0]
  let s, r, i, o, l
  const c = e.length
  for (s = 0; s < c; s++) {
    const u = e[s]
    if (u !== 0) {
      if (((r = n[n.length - 1]), e[r] < u)) {
        ;(t[s] = r), n.push(s)
        continue
      }
      for (i = 0, o = n.length - 1; i < o; )
        (l = (i + o) >> 1), e[n[l]] < u ? (i = l + 1) : (o = l)
      u < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), (n[i] = s))
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; ) (n[i] = o), (o = t[o])
  return n
}
function ki(e) {
  const t = e.subTree.component
  if (t) return t.asyncDep && !t.asyncResolved ? t : ki(t)
}
function cr(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8
}
const rc = Symbol.for('v-scx'),
  ic = () => At(rc)
function Bi(e, t) {
  return jn(e, null, t)
}
function ra(e, t) {
  return jn(e, null, { flush: 'post' })
}
function Fe(e, t, n) {
  return jn(e, t, n)
}
function jn(e, t, n = Z) {
  const { immediate: s, deep: r, flush: i, once: o } = n,
    l = fe({}, n),
    c = (t && s) || (!t && i !== 'post')
  let u
  if (Yt) {
    if (i === 'sync') {
      const S = ic()
      u = S.__watcherHandles || (S.__watcherHandles = [])
    } else if (!c) {
      const S = () => {}
      return (S.stop = Ue), (S.resume = Ue), (S.pause = Ue), S
    }
  }
  const f = ue
  l.call = (S, L, O) => He(S, f, L, O)
  let h = !1
  i === 'post'
    ? (l.scheduler = (S) => {
        Ce(S, f && f.suspense)
      })
    : i !== 'sync' &&
      ((h = !0),
      (l.scheduler = (S, L) => {
        L ? S() : js(S)
      })),
    (l.augmentJob = (S) => {
      t && (S.flags |= 4),
        h && ((S.flags |= 2), f && ((S.id = f.uid), (S.i = f)))
    })
  const _ = ml(e, t, l)
  return Yt && (u ? u.push(_) : c && _()), _
}
function oc(e, t, n) {
  const s = this.proxy,
    r = re(e) ? (e.includes('.') ? Wi(s, e) : () => s[e]) : e.bind(s, s)
  let i
  q(t) ? (i = t) : ((i = t.handler), (n = t))
  const o = Qt(this),
    l = jn(r, i.bind(s), n)
  return o(), l
}
function Wi(e, t) {
  const n = t.split('.')
  return () => {
    let s = e
    for (let r = 0; r < n.length && s; r++) s = s[n[r]]
    return s
  }
}
const lc = (e, t) =>
  t === 'modelValue' || t === 'model-value'
    ? e.modelModifiers
    : e[`${t}Modifiers`] || e[`${Le(t)}Modifiers`] || e[`${st(t)}Modifiers`]
function cc(e, t, ...n) {
  if (e.isUnmounted) return
  const s = e.vnode.props || Z
  let r = n
  const i = t.startsWith('update:'),
    o = i && lc(s, t.slice(7))
  o &&
    (o.trim && (r = n.map((f) => (re(f) ? f.trim() : f))),
    o.number && (r = n.map(Ro)))
  let l,
    c = s[(l = hn(t))] || s[(l = hn(Le(t)))]
  !c && i && (c = s[(l = hn(st(t)))]), c && He(c, e, 6, r)
  const u = s[l + 'Once']
  if (u) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[l]) return
    ;(e.emitted[l] = !0), He(u, e, 6, r)
  }
}
function Ki(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e)
  if (r !== void 0) return r
  const i = e.emits
  let o = {},
    l = !1
  if (!q(e)) {
    const c = (u) => {
      const f = Ki(u, t, !0)
      f && ((l = !0), fe(o, f))
    }
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c)
  }
  return !i && !l
    ? (ne(e) && s.set(e, null), null)
    : (k(i) ? i.forEach((c) => (o[c] = null)) : fe(o, i),
      ne(e) && s.set(e, o),
      o)
}
function Vn(e, t) {
  return !e || !Jt(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      z(e, t[0].toLowerCase() + t.slice(1)) || z(e, st(t)) || z(e, t))
}
function es(e) {
  const {
      type: t,
      vnode: n,
      proxy: s,
      withProxy: r,
      propsOptions: [i],
      slots: o,
      attrs: l,
      emit: c,
      render: u,
      renderCache: f,
      props: h,
      data: _,
      setupState: S,
      ctx: L,
      inheritAttrs: O,
    } = e,
    G = Sn(e)
  let U, W
  try {
    if (n.shapeFlag & 4) {
      const p = r || s,
        A = p
      ;(U = Me(u.call(A, p, f, h, S, _, L))), (W = l)
    } else {
      const p = t
      ;(U = Me(
        p.length > 1 ? p(h, { attrs: l, slots: o, emit: c }) : p(h, null),
      )),
        (W = t.props ? l : fc(l))
    }
  } catch (p) {
    ;(Vt.length = 0), Nn(p, e, 1), (U = he(_e))
  }
  let g = U
  if (W && O !== !1) {
    const p = Object.keys(W),
      { shapeFlag: A } = g
    p.length &&
      A & 7 &&
      (i && p.some(Rs) && (W = ac(W, i)), (g = nt(g, W, !1, !0)))
  }
  return (
    n.dirs &&
      ((g = nt(g, null, !1, !0)),
      (g.dirs = g.dirs ? g.dirs.concat(n.dirs) : n.dirs)),
    n.transition && Wt(g, n.transition),
    (U = g),
    Sn(G),
    U
  )
}
const fc = (e) => {
    let t
    for (const n in e)
      (n === 'class' || n === 'style' || Jt(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  ac = (e, t) => {
    const n = {}
    for (const s in e) (!Rs(s) || !(s.slice(9) in t)) && (n[s] = e[s])
    return n
  }
function uc(e, t, n) {
  const { props: s, children: r, component: i } = e,
    { props: o, children: l, patchFlag: c } = t,
    u = i.emitsOptions
  if (t.dirs || t.transition) return !0
  if (n && c >= 0) {
    if (c & 1024) return !0
    if (c & 16) return s ? fr(s, o, u) : !!o
    if (c & 8) {
      const f = t.dynamicProps
      for (let h = 0; h < f.length; h++) {
        const _ = f[h]
        if (o[_] !== s[_] && !Vn(u, _)) return !0
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : s === o
        ? !1
        : s
          ? o
            ? fr(s, o, u)
            : !0
          : !!o
  return !1
}
function fr(e, t, n) {
  const s = Object.keys(t)
  if (s.length !== Object.keys(e).length) return !0
  for (let r = 0; r < s.length; r++) {
    const i = s[r]
    if (t[i] !== e[i] && !Vn(n, i)) return !0
  }
  return !1
}
function qi({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree
    if ((s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e))
      ((e = t.vnode).el = n), (t = t.parent)
    else break
  }
}
const Gi = (e) => e.__isSuspense
function Yi(e, t) {
  t && t.pendingBranch
    ? k(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : bl(e)
}
const Se = Symbol.for('v-fgt'),
  gt = Symbol.for('v-txt'),
  _e = Symbol.for('v-cmt'),
  jt = Symbol.for('v-stc'),
  Vt = []
let Ae = null
function Ss(e = !1) {
  Vt.push((Ae = e ? null : []))
}
function dc() {
  Vt.pop(), (Ae = Vt[Vt.length - 1] || null)
}
let qt = 1
function ar(e, t = !1) {
  ;(qt += e), e < 0 && Ae && t && (Ae.hasOnce = !0)
}
function Xi(e) {
  return (
    (e.dynamicChildren = qt > 0 ? Ae || St : null),
    dc(),
    qt > 0 && Ae && Ae.push(e),
    e
  )
}
function ia(e, t, n, s, r, i) {
  return Xi(zi(e, t, n, s, r, i, !0))
}
function xs(e, t, n, s, r) {
  return Xi(he(e, t, n, s, r, !0))
}
function Gt(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function ut(e, t) {
  return e.type === t.type && e.key === t.key
}
const Ji = ({ key: e }) => e ?? null,
  gn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null
      ? re(e) || ce(e) || q(e)
        ? { i: le, r: e, k: t, f: !!n }
        : e
      : null
  )
function zi(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  i = e === Se ? 0 : 1,
  o = !1,
  l = !1,
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ji(t),
    ref: t && gn(t),
    scopeId: hi,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: le,
  }
  return (
    l
      ? (Us(c, n), i & 128 && e.normalize(c))
      : n && (c.shapeFlag |= re(n) ? 8 : 16),
    qt > 0 &&
      !o &&
      Ae &&
      (c.patchFlag > 0 || i & 6) &&
      c.patchFlag !== 32 &&
      Ae.push(c),
    c
  )
}
const he = hc
function hc(e, t = null, n = null, s = 0, r = null, i = !1) {
  if (((!e || e === Ti) && (e = _e), Gt(e))) {
    const l = nt(e, t, !0)
    return (
      n && Us(l, n),
      qt > 0 &&
        !i &&
        Ae &&
        (l.shapeFlag & 6 ? (Ae[Ae.indexOf(e)] = l) : Ae.push(l)),
      (l.patchFlag = -2),
      l
    )
  }
  if ((xc(e) && (e = e.__vccOpts), t)) {
    t = pc(t)
    let { class: l, style: c } = t
    l && !re(l) && (t.class = Ls(l)),
      ne(c) && ($s(c) && !k(c) && (c = fe({}, c)), (t.style = Is(c)))
  }
  const o = re(e) ? 1 : Gi(e) ? 128 : pi(e) ? 64 : ne(e) ? 4 : q(e) ? 2 : 0
  return zi(e, t, n, s, r, o, i, !0)
}
function pc(e) {
  return e ? ($s(e) || Pi(e) ? fe({}, e) : e) : null
}
function nt(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: c } = e,
    u = t ? gc(r || {}, t) : r,
    f = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: u,
      key: u && Ji(u),
      ref:
        t && t.ref
          ? n && i
            ? k(i)
              ? i.concat(gn(t))
              : [i, gn(t)]
            : gn(t)
          : i,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: l,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Se ? (o === -1 ? 16 : o | 16) : o,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: c,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && nt(e.ssContent),
      ssFallback: e.ssFallback && nt(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
    }
  return c && s && Wt(f, c.clone(f)), f
}
function Qi(e = ' ', t = 0) {
  return he(gt, null, e, t)
}
function oa(e, t) {
  const n = he(jt, null, e)
  return (n.staticCount = t), n
}
function la(e = '', t = !1) {
  return t ? (Ss(), xs(_e, null, e)) : he(_e, null, e)
}
function Me(e) {
  return e == null || typeof e == 'boolean'
    ? he(_e)
    : k(e)
      ? he(Se, null, e.slice())
      : Gt(e)
        ? Ze(e)
        : he(gt, null, String(e))
}
function Ze(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : nt(e)
}
function Us(e, t) {
  let n = 0
  const { shapeFlag: s } = e
  if (t == null) t = null
  else if (k(t)) n = 16
  else if (typeof t == 'object')
    if (s & 65) {
      const r = t.default
      r && (r._c && (r._d = !1), Us(e, r()), r._c && (r._d = !0))
      return
    } else {
      n = 32
      const r = t._
      !r && !Pi(t)
        ? (t._ctx = le)
        : r === 3 &&
          le &&
          (le.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    q(t)
      ? ((t = { default: t, _ctx: le }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [Qi(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function gc(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const s = e[n]
    for (const r in s)
      if (r === 'class')
        t.class !== s.class && (t.class = Ls([t.class, s.class]))
      else if (r === 'style') t.style = Is([t.style, s.style])
      else if (Jt(r)) {
        const i = t[r],
          o = s[r]
        o &&
          i !== o &&
          !(k(i) && i.includes(o)) &&
          (t[r] = i ? [].concat(i, o) : o)
      } else r !== '' && (t[r] = s[r])
  }
  return t
}
function Oe(e, t, n, s = null) {
  He(e, t, 7, [n, s])
}
const mc = Mi()
let yc = 0
function _c(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || mc,
    i = {
      uid: yc++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new Do(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      ids: t ? t.ids : ['', 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Fi(s, r),
      emitsOptions: Ki(s, r),
      emit: null,
      emitted: null,
      propsDefaults: Z,
      inheritAttrs: s.inheritAttrs,
      ctx: Z,
      data: Z,
      props: Z,
      attrs: Z,
      slots: Z,
      refs: Z,
      setupState: Z,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    }
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = cc.bind(null, i)),
    e.ce && e.ce(i),
    i
  )
}
let ue = null
const Un = () => ue || le
let En, Es
{
  const e = On(),
    t = (n, s) => {
      let r
      return (
        (r = e[n]) || (r = e[n] = []),
        r.push(s),
        (i) => {
          r.length > 1 ? r.forEach((o) => o(i)) : r[0](i)
        }
      )
    }
  ;(En = t('__VUE_INSTANCE_SETTERS__', (n) => (ue = n))),
    (Es = t('__VUE_SSR_SETTERS__', (n) => (Yt = n)))
}
const Qt = (e) => {
    const t = ue
    return (
      En(e),
      e.scope.on(),
      () => {
        e.scope.off(), En(t)
      }
    )
  },
  ur = () => {
    ue && ue.scope.off(), En(null)
  }
function Zi(e) {
  return e.vnode.shapeFlag & 4
}
let Yt = !1
function bc(e, t = !1, n = !1) {
  t && Es(t)
  const { props: s, children: r } = e.vnode,
    i = Zi(e)
  Xl(e, s, i, t), Zl(e, r, n)
  const o = i ? wc(e, t) : void 0
  return t && Es(!1), o
}
function wc(e, t) {
  const n = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, jl))
  const { setup: s } = n
  if (s) {
    rt()
    const r = (e.setupContext = s.length > 1 ? to(e) : null),
      i = Qt(e),
      o = zt(s, e, 0, [e.props, r]),
      l = $r(o)
    if ((it(), i(), (l || e.sp) && !pt(e) && vi(e), l)) {
      if ((o.then(ur, ur), t))
        return o
          .then((c) => {
            dr(e, c)
          })
          .catch((c) => {
            Nn(c, e, 0)
          })
      e.asyncDep = o
    } else dr(e, o)
  } else eo(e)
}
function dr(e, t, n) {
  q(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ne(t) && (e.setupState = fi(t)),
    eo(e)
}
function eo(e, t, n) {
  const s = e.type
  e.render || (e.render = s.render || Ue)
  {
    const r = Qt(e)
    rt()
    try {
      Ul(e)
    } finally {
      it(), r()
    }
  }
}
const vc = {
  get(e, t) {
    return me(e, 'get', ''), e[t]
  },
}
function to(e) {
  const t = (n) => {
    e.exposed = n || {}
  }
  return {
    attrs: new Proxy(e.attrs, vc),
    slots: e.slots,
    emit: e.emit,
    expose: t,
  }
}
function kn(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(fi(pn(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n]
            if (n in $t) return $t[n](e)
          },
          has(t, n) {
            return n in t || n in $t
          },
        }))
    : e.proxy
}
function Sc(e, t = !0) {
  return q(e) ? e.displayName || e.name : e.name || (t && e.__name)
}
function xc(e) {
  return q(e) && '__vccOpts' in e
}
const oe = (e, t) => pl(e, t, Yt)
function Ts(e, t, n) {
  const s = arguments.length
  return s === 2
    ? ne(t) && !k(t)
      ? Gt(t)
        ? he(e, null, [t])
        : he(e, t)
      : he(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && Gt(n) && (n = [n]),
      he(e, t, n))
}
const Ec = '3.5.13'
/**
 * @vue/runtime-dom v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Cs
const hr = typeof window < 'u' && window.trustedTypes
if (hr)
  try {
    Cs = hr.createPolicy('vue', { createHTML: (e) => e })
  } catch {}
const no = Cs ? (e) => Cs.createHTML(e) : (e) => e,
  Tc = 'http://www.w3.org/2000/svg',
  Cc = 'http://www.w3.org/1998/Math/MathML',
  We = typeof document < 'u' ? document : null,
  pr = We && We.createElement('template'),
  Ac = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, s) => {
      const r =
        t === 'svg'
          ? We.createElementNS(Tc, e)
          : t === 'mathml'
            ? We.createElementNS(Cc, e)
            : n
              ? We.createElement(e, { is: n })
              : We.createElement(e)
      return (
        e === 'select' &&
          s &&
          s.multiple != null &&
          r.setAttribute('multiple', s.multiple),
        r
      )
    },
    createText: (e) => We.createTextNode(e),
    createComment: (e) => We.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => We.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    insertStaticContent(e, t, n, s, r, i) {
      const o = n ? n.previousSibling : t.lastChild
      if (r && (r === i || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === i || !(r = r.nextSibling));

        );
      else {
        pr.innerHTML = no(
          s === 'svg'
            ? `<svg>${e}</svg>`
            : s === 'mathml'
              ? `<math>${e}</math>`
              : e,
        )
        const l = pr.content
        if (s === 'svg' || s === 'mathml') {
          const c = l.firstChild
          for (; c.firstChild; ) l.appendChild(c.firstChild)
          l.removeChild(c)
        }
        t.insertBefore(l, n)
      }
      return [
        o ? o.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ]
    },
  },
  Je = 'transition',
  Pt = 'animation',
  Xt = Symbol('_vtc'),
  so = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  Rc = fe({}, gi, so),
  Oc = (e) => ((e.displayName = 'Transition'), (e.props = Rc), e),
  ca = Oc((e, { slots: t }) => Ts(El, Mc(e), t)),
  ct = (e, t = []) => {
    k(e) ? e.forEach((n) => n(...t)) : e && e(...t)
  },
  gr = (e) => (e ? (k(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1)
function Mc(e) {
  const t = {}
  for (const w in e) w in so || (t[w] = e[w])
  if (e.css === !1) return t
  const {
      name: n = 'v',
      type: s,
      duration: r,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: o = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: c = i,
      appearActiveClass: u = o,
      appearToClass: f = l,
      leaveFromClass: h = `${n}-leave-from`,
      leaveActiveClass: _ = `${n}-leave-active`,
      leaveToClass: S = `${n}-leave-to`,
    } = e,
    L = Ic(r),
    O = L && L[0],
    G = L && L[1],
    {
      onBeforeEnter: U,
      onEnter: W,
      onEnterCancelled: g,
      onLeave: p,
      onLeaveCancelled: A,
      onBeforeAppear: $ = U,
      onAppear: j = W,
      onAppearCancelled: K = g,
    } = t,
    I = (w, V, se, ie) => {
      ;(w._enterCancelled = ie), ft(w, V ? f : l), ft(w, V ? u : o), se && se()
    },
    b = (w, V) => {
      ;(w._isLeaving = !1), ft(w, h), ft(w, S), ft(w, _), V && V()
    },
    P = (w) => (V, se) => {
      const ie = w ? j : W,
        H = () => I(V, w, se)
      ct(ie, [V, H]),
        mr(() => {
          ft(V, w ? c : i), Be(V, w ? f : l), gr(ie) || yr(V, s, O, H)
        })
    }
  return fe(t, {
    onBeforeEnter(w) {
      ct(U, [w]), Be(w, i), Be(w, o)
    },
    onBeforeAppear(w) {
      ct($, [w]), Be(w, c), Be(w, u)
    },
    onEnter: P(!1),
    onAppear: P(!0),
    onLeave(w, V) {
      w._isLeaving = !0
      const se = () => b(w, V)
      Be(w, h),
        w._enterCancelled ? (Be(w, _), wr()) : (wr(), Be(w, _)),
        mr(() => {
          w._isLeaving && (ft(w, h), Be(w, S), gr(p) || yr(w, s, G, se))
        }),
        ct(p, [w, se])
    },
    onEnterCancelled(w) {
      I(w, !1, void 0, !0), ct(g, [w])
    },
    onAppearCancelled(w) {
      I(w, !0, void 0, !0), ct(K, [w])
    },
    onLeaveCancelled(w) {
      b(w), ct(A, [w])
    },
  })
}
function Ic(e) {
  if (e == null) return null
  if (ne(e)) return [ts(e.enter), ts(e.leave)]
  {
    const t = ts(e)
    return [t, t]
  }
}
function ts(e) {
  return Oo(e)
}
function Be(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e[Xt] || (e[Xt] = new Set())).add(t)
}
function ft(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s))
  const n = e[Xt]
  n && (n.delete(t), n.size || (e[Xt] = void 0))
}
function mr(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e)
  })
}
let Lc = 0
function yr(e, t, n, s) {
  const r = (e._endId = ++Lc),
    i = () => {
      r === e._endId && s()
    }
  if (n != null) return setTimeout(i, n)
  const { type: o, timeout: l, propCount: c } = Pc(e, t)
  if (!o) return s()
  const u = o + 'end'
  let f = 0
  const h = () => {
      e.removeEventListener(u, _), i()
    },
    _ = (S) => {
      S.target === e && ++f >= c && h()
    }
  setTimeout(() => {
    f < c && h()
  }, l + 1),
    e.addEventListener(u, _)
}
function Pc(e, t) {
  const n = window.getComputedStyle(e),
    s = (L) => (n[L] || '').split(', '),
    r = s(`${Je}Delay`),
    i = s(`${Je}Duration`),
    o = _r(r, i),
    l = s(`${Pt}Delay`),
    c = s(`${Pt}Duration`),
    u = _r(l, c)
  let f = null,
    h = 0,
    _ = 0
  t === Je
    ? o > 0 && ((f = Je), (h = o), (_ = i.length))
    : t === Pt
      ? u > 0 && ((f = Pt), (h = u), (_ = c.length))
      : ((h = Math.max(o, u)),
        (f = h > 0 ? (o > u ? Je : Pt) : null),
        (_ = f ? (f === Je ? i.length : c.length) : 0))
  const S =
    f === Je && /\b(transform|all)(,|$)/.test(s(`${Je}Property`).toString())
  return { type: f, timeout: h, propCount: _, hasTransform: S }
}
function _r(e, t) {
  for (; e.length < t.length; ) e = e.concat(e)
  return Math.max(...t.map((n, s) => br(n) + br(e[s])))
}
function br(e) {
  return e === 'auto' ? 0 : Number(e.slice(0, -1).replace(',', '.')) * 1e3
}
function wr() {
  return document.body.offsetHeight
}
function Nc(e, t, n) {
  const s = e[Xt]
  s && (t = (t ? [t, ...s] : [...s]).join(' ')),
    t == null
      ? e.removeAttribute('class')
      : n
        ? e.setAttribute('class', t)
        : (e.className = t)
}
const Tn = Symbol('_vod'),
  ro = Symbol('_vsh'),
  fa = {
    beforeMount(e, { value: t }, { transition: n }) {
      ;(e[Tn] = e.style.display === 'none' ? '' : e.style.display),
        n && t ? n.beforeEnter(e) : Nt(e, t)
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e)
    },
    updated(e, { value: t, oldValue: n }, { transition: s }) {
      !t != !n &&
        (s
          ? t
            ? (s.beforeEnter(e), Nt(e, !0), s.enter(e))
            : s.leave(e, () => {
                Nt(e, !1)
              })
          : Nt(e, t))
    },
    beforeUnmount(e, { value: t }) {
      Nt(e, t)
    },
  }
function Nt(e, t) {
  ;(e.style.display = t ? e[Tn] : 'none'), (e[ro] = !t)
}
const Fc = Symbol(''),
  Hc = /(^|;)\s*display\s*:/
function Dc(e, t, n) {
  const s = e.style,
    r = re(n)
  let i = !1
  if (n && !r) {
    if (t)
      if (re(t))
        for (const o of t.split(';')) {
          const l = o.slice(0, o.indexOf(':')).trim()
          n[l] == null && mn(s, l, '')
        }
      else for (const o in t) n[o] == null && mn(s, o, '')
    for (const o in n) o === 'display' && (i = !0), mn(s, o, n[o])
  } else if (r) {
    if (t !== n) {
      const o = s[Fc]
      o && (n += ';' + o), (s.cssText = n), (i = Hc.test(n))
    }
  } else t && e.removeAttribute('style')
  Tn in e && ((e[Tn] = i ? s.display : ''), e[ro] && (s.display = 'none'))
}
const vr = /\s*!important$/
function mn(e, t, n) {
  if (k(n)) n.forEach((s) => mn(e, t, s))
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n)
  else {
    const s = $c(e, t)
    vr.test(n)
      ? e.setProperty(st(s), n.replace(vr, ''), 'important')
      : (e[s] = n)
  }
}
const Sr = ['Webkit', 'Moz', 'ms'],
  ns = {}
function $c(e, t) {
  const n = ns[t]
  if (n) return n
  let s = Le(t)
  if (s !== 'filter' && s in e) return (ns[t] = s)
  s = Rn(s)
  for (let r = 0; r < Sr.length; r++) {
    const i = Sr[r] + s
    if (i in e) return (ns[t] = i)
  }
  return t
}
const xr = 'http://www.w3.org/1999/xlink'
function Er(e, t, n, s, r, i = Fo(t)) {
  s && t.startsWith('xlink:')
    ? n == null
      ? e.removeAttributeNS(xr, t.slice(6, t.length))
      : e.setAttributeNS(xr, t, n)
    : n == null || (i && !kr(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? '' : Ye(n) ? String(n) : n)
}
function Tr(e, t, n, s, r) {
  if (t === 'innerHTML' || t === 'textContent') {
    n != null && (e[t] = t === 'innerHTML' ? no(n) : n)
    return
  }
  const i = e.tagName
  if (t === 'value' && i !== 'PROGRESS' && !i.includes('-')) {
    const l = i === 'OPTION' ? e.getAttribute('value') || '' : e.value,
      c = n == null ? (e.type === 'checkbox' ? 'on' : '') : String(n)
    ;(l !== c || !('_value' in e)) && (e.value = c),
      n == null && e.removeAttribute(t),
      (e._value = n)
    return
  }
  let o = !1
  if (n === '' || n == null) {
    const l = typeof e[t]
    l === 'boolean'
      ? (n = kr(n))
      : n == null && l === 'string'
        ? ((n = ''), (o = !0))
        : l === 'number' && ((n = 0), (o = !0))
  }
  try {
    e[t] = n
  } catch {}
  o && e.removeAttribute(r || t)
}
function jc(e, t, n, s) {
  e.addEventListener(t, n, s)
}
function Vc(e, t, n, s) {
  e.removeEventListener(t, n, s)
}
const Cr = Symbol('_vei')
function Uc(e, t, n, s, r = null) {
  const i = e[Cr] || (e[Cr] = {}),
    o = i[t]
  if (s && o) o.value = s
  else {
    const [l, c] = kc(t)
    if (s) {
      const u = (i[t] = Kc(s, r))
      jc(e, l, u, c)
    } else o && (Vc(e, l, o, c), (i[t] = void 0))
  }
}
const Ar = /(?:Once|Passive|Capture)$/
function kc(e) {
  let t
  if (Ar.test(e)) {
    t = {}
    let s
    for (; (s = e.match(Ar)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0)
  }
  return [e[2] === ':' ? e.slice(3) : st(e.slice(2)), t]
}
let ss = 0
const Bc = Promise.resolve(),
  Wc = () => ss || (Bc.then(() => (ss = 0)), (ss = Date.now()))
function Kc(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now()
    else if (s._vts <= n.attached) return
    He(qc(s, n.value), t, 5, [s])
  }
  return (n.value = e), (n.attached = Wc()), n
}
function qc(e, t) {
  if (k(t)) {
    const n = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0)
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    )
  } else return t
}
const Rr = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  Gc = (e, t, n, s, r, i) => {
    const o = r === 'svg'
    t === 'class'
      ? Nc(e, s, o)
      : t === 'style'
        ? Dc(e, n, s)
        : Jt(t)
          ? Rs(t) || Uc(e, t, n, s, i)
          : (
                t[0] === '.'
                  ? ((t = t.slice(1)), !0)
                  : t[0] === '^'
                    ? ((t = t.slice(1)), !1)
                    : Yc(e, t, s, o)
              )
            ? (Tr(e, t, s),
              !e.tagName.includes('-') &&
                (t === 'value' || t === 'checked' || t === 'selected') &&
                Er(e, t, s, o, i, t !== 'value'))
            : e._isVueCE && (/[A-Z]/.test(t) || !re(s))
              ? Tr(e, Le(t), s, i, t)
              : (t === 'true-value'
                  ? (e._trueValue = s)
                  : t === 'false-value' && (e._falseValue = s),
                Er(e, t, s, o))
  }
function Yc(e, t, n, s) {
  if (s)
    return !!(
      t === 'innerHTML' ||
      t === 'textContent' ||
      (t in e && Rr(t) && q(n))
    )
  if (
    t === 'spellcheck' ||
    t === 'draggable' ||
    t === 'translate' ||
    t === 'form' ||
    (t === 'list' && e.tagName === 'INPUT') ||
    (t === 'type' && e.tagName === 'TEXTAREA')
  )
    return !1
  if (t === 'width' || t === 'height') {
    const r = e.tagName
    if (r === 'IMG' || r === 'VIDEO' || r === 'CANVAS' || r === 'SOURCE')
      return !1
  }
  return Rr(t) && re(n) ? !1 : t in e
}
const Xc = ['ctrl', 'shift', 'alt', 'meta'],
  Jc = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => 'button' in e && e.button !== 0,
    middle: (e) => 'button' in e && e.button !== 1,
    right: (e) => 'button' in e && e.button !== 2,
    exact: (e, t) => Xc.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  aa = (e, t) => {
    const n = e._withMods || (e._withMods = {}),
      s = t.join('.')
    return (
      n[s] ||
      (n[s] = (r, ...i) => {
        for (let o = 0; o < t.length; o++) {
          const l = Jc[t[o]]
          if (l && l(r, t)) return
        }
        return e(r, ...i)
      })
    )
  },
  zc = {
    esc: 'escape',
    space: ' ',
    up: 'arrow-up',
    left: 'arrow-left',
    right: 'arrow-right',
    down: 'arrow-down',
    delete: 'backspace',
  },
  ua = (e, t) => {
    const n = e._withKeys || (e._withKeys = {}),
      s = t.join('.')
    return (
      n[s] ||
      (n[s] = (r) => {
        if (!('key' in r)) return
        const i = st(r.key)
        if (t.some((o) => o === i || zc[o] === i)) return e(r)
      })
    )
  },
  Qc = fe({ patchProp: Gc }, Ac)
let rs,
  Or = !1
function Zc() {
  return (rs = Or ? rs : tc(Qc)), (Or = !0), rs
}
const da = (...e) => {
  const t = Zc().createApp(...e),
    { mount: n } = t
  return (
    (t.mount = (s) => {
      const r = tf(s)
      if (r) return n(r, !0, ef(r))
    }),
    t
  )
}
function ef(e) {
  if (e instanceof SVGElement) return 'svg'
  if (typeof MathMLElement == 'function' && e instanceof MathMLElement)
    return 'mathml'
}
function tf(e) {
  return re(e) ? document.querySelector(e) : e
}
const ha = (e, t) => {
    const n = e.__vccOpts || e
    for (const [s, r] of t) n[s] = r
    return n
  },
  nf = window.__VP_SITE_DATA__
function ks(e) {
  return Kr() ? ($o(e), !0) : !1
}
function tt(e) {
  return typeof e == 'function' ? e() : ci(e)
}
const io = typeof window < 'u' && typeof document < 'u'
typeof WorkerGlobalScope < 'u' && globalThis instanceof WorkerGlobalScope
const sf = Object.prototype.toString,
  rf = (e) => sf.call(e) === '[object Object]',
  oo = () => {},
  Mr = of()
function of() {
  var e, t
  return (
    io &&
    ((e = window == null ? void 0 : window.navigator) == null
      ? void 0
      : e.userAgent) &&
    (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) ||
      (((t = window == null ? void 0 : window.navigator) == null
        ? void 0
        : t.maxTouchPoints) > 2 &&
        /iPad|Macintosh/.test(
          window == null ? void 0 : window.navigator.userAgent,
        )))
  )
}
function lf(e, t) {
  function n(...s) {
    return new Promise((r, i) => {
      Promise.resolve(
        e(() => t.apply(this, s), { fn: t, thisArg: this, args: s }),
      )
        .then(r)
        .catch(i)
    })
  }
  return n
}
const lo = (e) => e()
function cf(e = lo) {
  const t = de(!0)
  function n() {
    t.value = !1
  }
  function s() {
    t.value = !0
  }
  const r = (...i) => {
    t.value && e(...i)
  }
  return { isActive: Pn(t), pause: n, resume: s, eventFilter: r }
}
function ff(e) {
  return Un()
}
function co(...e) {
  if (e.length !== 1) return ul(...e)
  const t = e[0]
  return typeof t == 'function' ? Pn(cl(() => ({ get: t, set: oo }))) : de(t)
}
function af(e, t, n = {}) {
  const { eventFilter: s = lo, ...r } = n
  return Fe(e, lf(s, t), r)
}
function uf(e, t, n = {}) {
  const { eventFilter: s, ...r } = n,
    { eventFilter: i, pause: o, resume: l, isActive: c } = cf(s)
  return {
    stop: af(e, t, { ...r, eventFilter: i }),
    pause: o,
    resume: l,
    isActive: c,
  }
}
function Bs(e, t = !0, n) {
  ff() ? Ot(e, n) : t ? e() : Fn(e)
}
const Ge = io ? window : void 0
function fo(e) {
  var t
  const n = tt(e)
  return (t = n == null ? void 0 : n.$el) != null ? t : n
}
function Rt(...e) {
  let t, n, s, r
  if (
    (typeof e[0] == 'string' || Array.isArray(e[0])
      ? (([n, s, r] = e), (t = Ge))
      : ([t, n, s, r] = e),
    !t)
  )
    return oo
  Array.isArray(n) || (n = [n]), Array.isArray(s) || (s = [s])
  const i = [],
    o = () => {
      i.forEach((f) => f()), (i.length = 0)
    },
    l = (f, h, _, S) => (
      f.addEventListener(h, _, S), () => f.removeEventListener(h, _, S)
    ),
    c = Fe(
      () => [fo(t), tt(r)],
      ([f, h]) => {
        if ((o(), !f)) return
        const _ = rf(h) ? { ...h } : h
        i.push(...n.flatMap((S) => s.map((L) => l(f, S, L, _))))
      },
      { immediate: !0, flush: 'post' },
    ),
    u = () => {
      c(), o()
    }
  return ks(u), u
}
function df(e) {
  return typeof e == 'function'
    ? e
    : typeof e == 'string'
      ? (t) => t.key === e
      : Array.isArray(e)
        ? (t) => e.includes(t.key)
        : () => !0
}
function pa(...e) {
  let t,
    n,
    s = {}
  e.length === 3
    ? ((t = e[0]), (n = e[1]), (s = e[2]))
    : e.length === 2
      ? typeof e[1] == 'object'
        ? ((t = !0), (n = e[0]), (s = e[1]))
        : ((t = e[0]), (n = e[1]))
      : ((t = !0), (n = e[0]))
  const {
      target: r = Ge,
      eventName: i = 'keydown',
      passive: o = !1,
      dedupe: l = !1,
    } = s,
    c = df(t)
  return Rt(
    r,
    i,
    (f) => {
      ;(f.repeat && tt(l)) || (c(f) && n(f))
    },
    o,
  )
}
function hf() {
  const e = de(!1),
    t = Un()
  return (
    t &&
      Ot(() => {
        e.value = !0
      }, t),
    e
  )
}
function pf(e) {
  const t = hf()
  return oe(() => (t.value, !!e()))
}
function ao(e, t = {}) {
  const { window: n = Ge } = t,
    s = pf(() => n && 'matchMedia' in n && typeof n.matchMedia == 'function')
  let r
  const i = de(!1),
    o = (u) => {
      i.value = u.matches
    },
    l = () => {
      r &&
        ('removeEventListener' in r
          ? r.removeEventListener('change', o)
          : r.removeListener(o))
    },
    c = Bi(() => {
      s.value &&
        (l(),
        (r = n.matchMedia(tt(e))),
        'addEventListener' in r
          ? r.addEventListener('change', o)
          : r.addListener(o),
        (i.value = r.matches))
    })
  return (
    ks(() => {
      c(), l(), (r = void 0)
    }),
    i
  )
}
const fn =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
        ? window
        : typeof global < 'u'
          ? global
          : typeof self < 'u'
            ? self
            : {},
  an = '__vueuse_ssr_handlers__',
  gf = mf()
function mf() {
  return an in fn || (fn[an] = fn[an] || {}), fn[an]
}
function uo(e, t) {
  return gf[e] || t
}
function Ws(e) {
  return ao('(prefers-color-scheme: dark)', e)
}
function yf(e) {
  return e == null
    ? 'any'
    : e instanceof Set
      ? 'set'
      : e instanceof Map
        ? 'map'
        : e instanceof Date
          ? 'date'
          : typeof e == 'boolean'
            ? 'boolean'
            : typeof e == 'string'
              ? 'string'
              : typeof e == 'object'
                ? 'object'
                : Number.isNaN(e)
                  ? 'any'
                  : 'number'
}
const _f = {
    boolean: { read: (e) => e === 'true', write: (e) => String(e) },
    object: { read: (e) => JSON.parse(e), write: (e) => JSON.stringify(e) },
    number: { read: (e) => Number.parseFloat(e), write: (e) => String(e) },
    any: { read: (e) => e, write: (e) => String(e) },
    string: { read: (e) => e, write: (e) => String(e) },
    map: {
      read: (e) => new Map(JSON.parse(e)),
      write: (e) => JSON.stringify(Array.from(e.entries())),
    },
    set: {
      read: (e) => new Set(JSON.parse(e)),
      write: (e) => JSON.stringify(Array.from(e)),
    },
    date: { read: (e) => new Date(e), write: (e) => e.toISOString() },
  },
  Ir = 'vueuse-storage'
function bf(e, t, n, s = {}) {
  var r
  const {
      flush: i = 'pre',
      deep: o = !0,
      listenToStorageChanges: l = !0,
      writeDefaults: c = !0,
      mergeDefaults: u = !1,
      shallow: f,
      window: h = Ge,
      eventFilter: _,
      onError: S = (b) => {
        console.error(b)
      },
      initOnMounted: L,
    } = s,
    O = (f ? oi : de)(typeof t == 'function' ? t() : t)
  if (!n)
    try {
      n = uo('getDefaultStorage', () => {
        var b
        return (b = Ge) == null ? void 0 : b.localStorage
      })()
    } catch (b) {
      S(b)
    }
  if (!n) return O
  const G = tt(t),
    U = yf(G),
    W = (r = s.serializer) != null ? r : _f[U],
    { pause: g, resume: p } = uf(O, () => $(O.value), {
      flush: i,
      deep: o,
      eventFilter: _,
    })
  h &&
    l &&
    Bs(() => {
      n instanceof Storage ? Rt(h, 'storage', K) : Rt(h, Ir, I), L && K()
    }),
    L || K()
  function A(b, P) {
    if (h) {
      const w = { key: e, oldValue: b, newValue: P, storageArea: n }
      h.dispatchEvent(
        n instanceof Storage
          ? new StorageEvent('storage', w)
          : new CustomEvent(Ir, { detail: w }),
      )
    }
  }
  function $(b) {
    try {
      const P = n.getItem(e)
      if (b == null) A(P, null), n.removeItem(e)
      else {
        const w = W.write(b)
        P !== w && (n.setItem(e, w), A(P, w))
      }
    } catch (P) {
      S(P)
    }
  }
  function j(b) {
    const P = b ? b.newValue : n.getItem(e)
    if (P == null) return c && G != null && n.setItem(e, W.write(G)), G
    if (!b && u) {
      const w = W.read(P)
      return typeof u == 'function'
        ? u(w, G)
        : U === 'object' && !Array.isArray(w)
          ? { ...G, ...w }
          : w
    } else return typeof P != 'string' ? P : W.read(P)
  }
  function K(b) {
    if (!(b && b.storageArea !== n)) {
      if (b && b.key == null) {
        O.value = G
        return
      }
      if (!(b && b.key !== e)) {
        g()
        try {
          ;(b == null ? void 0 : b.newValue) !== W.write(O.value) &&
            (O.value = j(b))
        } catch (P) {
          S(P)
        } finally {
          b ? Fn(p) : p()
        }
      }
    }
  }
  function I(b) {
    K(b.detail)
  }
  return O
}
const wf =
  '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}'
function vf(e = {}) {
  const {
      selector: t = 'html',
      attribute: n = 'class',
      initialValue: s = 'auto',
      window: r = Ge,
      storage: i,
      storageKey: o = 'vueuse-color-scheme',
      listenToStorageChanges: l = !0,
      storageRef: c,
      emitAuto: u,
      disableTransition: f = !0,
    } = e,
    h = { auto: '', light: 'light', dark: 'dark', ...(e.modes || {}) },
    _ = Ws({ window: r }),
    S = oe(() => (_.value ? 'dark' : 'light')),
    L =
      c ||
      (o == null
        ? co(s)
        : bf(o, s, i, { window: r, listenToStorageChanges: l })),
    O = oe(() => (L.value === 'auto' ? S.value : L.value)),
    G = uo('updateHTMLAttrs', (p, A, $) => {
      const j =
        typeof p == 'string'
          ? r == null
            ? void 0
            : r.document.querySelector(p)
          : fo(p)
      if (!j) return
      const K = new Set(),
        I = new Set()
      let b = null
      if (A === 'class') {
        const w = $.split(/\s/g)
        Object.values(h)
          .flatMap((V) => (V || '').split(/\s/g))
          .filter(Boolean)
          .forEach((V) => {
            w.includes(V) ? K.add(V) : I.add(V)
          })
      } else b = { key: A, value: $ }
      if (K.size === 0 && I.size === 0 && b === null) return
      let P
      f &&
        ((P = r.document.createElement('style')),
        P.appendChild(document.createTextNode(wf)),
        r.document.head.appendChild(P))
      for (const w of K) j.classList.add(w)
      for (const w of I) j.classList.remove(w)
      b && j.setAttribute(b.key, b.value),
        f && (r.getComputedStyle(P).opacity, document.head.removeChild(P))
    })
  function U(p) {
    var A
    G(t, n, (A = h[p]) != null ? A : p)
  }
  function W(p) {
    e.onChanged ? e.onChanged(p, U) : U(p)
  }
  Fe(O, W, { flush: 'post', immediate: !0 }), Bs(() => W(O.value))
  const g = oe({
    get() {
      return u ? L.value : O.value
    },
    set(p) {
      L.value = p
    },
  })
  try {
    return Object.assign(g, { store: L, system: S, state: O })
  } catch {
    return g
  }
}
function Sf(e = {}) {
  const { valueDark: t = 'dark', valueLight: n = '', window: s = Ge } = e,
    r = vf({
      ...e,
      onChanged: (l, c) => {
        var u
        e.onChanged
          ? (u = e.onChanged) == null || u.call(e, l === 'dark', c, l)
          : c(l)
      },
      modes: { dark: t, light: n },
    }),
    i = oe(() =>
      r.system ? r.system.value : Ws({ window: s }).value ? 'dark' : 'light',
    )
  return oe({
    get() {
      return r.value === 'dark'
    },
    set(l) {
      const c = l ? 'dark' : 'light'
      i.value === c ? (r.value = 'auto') : (r.value = c)
    },
  })
}
function is(e) {
  return typeof Window < 'u' && e instanceof Window
    ? e.document.documentElement
    : typeof Document < 'u' && e instanceof Document
      ? e.documentElement
      : e
}
function ho(e) {
  const t = window.getComputedStyle(e)
  if (
    t.overflowX === 'scroll' ||
    t.overflowY === 'scroll' ||
    (t.overflowX === 'auto' && e.clientWidth < e.scrollWidth) ||
    (t.overflowY === 'auto' && e.clientHeight < e.scrollHeight)
  )
    return !0
  {
    const n = e.parentNode
    return !n || n.tagName === 'BODY' ? !1 : ho(n)
  }
}
function xf(e) {
  const t = e || window.event,
    n = t.target
  return ho(n)
    ? !1
    : t.touches.length > 1
      ? !0
      : (t.preventDefault && t.preventDefault(), !1)
}
const os = new WeakMap()
function ga(e, t = !1) {
  const n = de(t)
  let s = null,
    r = ''
  Fe(
    co(e),
    (l) => {
      const c = is(tt(l))
      if (c) {
        const u = c
        if (
          (os.get(u) || os.set(u, u.style.overflow),
          u.style.overflow !== 'hidden' && (r = u.style.overflow),
          u.style.overflow === 'hidden')
        )
          return (n.value = !0)
        if (n.value) return (u.style.overflow = 'hidden')
      }
    },
    { immediate: !0 },
  )
  const i = () => {
      const l = is(tt(e))
      !l ||
        n.value ||
        (Mr &&
          (s = Rt(
            l,
            'touchmove',
            (c) => {
              xf(c)
            },
            { passive: !1 },
          )),
        (l.style.overflow = 'hidden'),
        (n.value = !0))
    },
    o = () => {
      const l = is(tt(e))
      !l ||
        !n.value ||
        (Mr && (s == null || s()),
        (l.style.overflow = r),
        os.delete(l),
        (n.value = !1))
    }
  return (
    ks(o),
    oe({
      get() {
        return n.value
      },
      set(l) {
        l ? i() : o()
      },
    })
  )
}
function ma(e = {}) {
  const { window: t = Ge, behavior: n = 'auto' } = e
  if (!t) return { x: de(0), y: de(0) }
  const s = de(t.scrollX),
    r = de(t.scrollY),
    i = oe({
      get() {
        return s.value
      },
      set(l) {
        scrollTo({ left: l, behavior: n })
      },
    }),
    o = oe({
      get() {
        return r.value
      },
      set(l) {
        scrollTo({ top: l, behavior: n })
      },
    })
  return (
    Rt(
      t,
      'scroll',
      () => {
        ;(s.value = t.scrollX), (r.value = t.scrollY)
      },
      { capture: !1, passive: !0 },
    ),
    { x: i, y: o }
  )
}
function ya(e = {}) {
  const {
      window: t = Ge,
      initialWidth: n = Number.POSITIVE_INFINITY,
      initialHeight: s = Number.POSITIVE_INFINITY,
      listenOrientation: r = !0,
      includeScrollbar: i = !0,
      type: o = 'inner',
    } = e,
    l = de(n),
    c = de(s),
    u = () => {
      t &&
        (o === 'outer'
          ? ((l.value = t.outerWidth), (c.value = t.outerHeight))
          : i
            ? ((l.value = t.innerWidth), (c.value = t.innerHeight))
            : ((l.value = t.document.documentElement.clientWidth),
              (c.value = t.document.documentElement.clientHeight)))
    }
  if ((u(), Bs(u), Rt('resize', u, { passive: !0 }), r)) {
    const f = ao('(orientation: portrait)')
    Fe(f, () => u())
  }
  return { width: l, height: c }
}
const ls = {
  BASE_URL: '/Versakit-markdown/',
  DEV: !1,
  MODE: 'production',
  PROD: !0,
  SSR: !1,
}
var cs = {}
const po = /^(?:[a-z]+:|\/\/)/i,
  Ef = 'vitepress-theme-appearance',
  Tf = /#.*$/,
  Cf = /[?#].*$/,
  Af = /(?:(^|\/)index)?\.(?:md|html)$/,
  ge = typeof document < 'u',
  go = {
    relativePath: '404.md',
    filePath: '',
    title: '404',
    description: 'Not Found',
    headers: [],
    frontmatter: { sidebar: !1, layout: 'page' },
    lastUpdated: 0,
    isNotFound: !0,
  }
function Rf(e, t, n = !1) {
  if (t === void 0) return !1
  if (((e = Lr(`/${e}`)), n)) return new RegExp(t).test(e)
  if (Lr(t) !== e) return !1
  const s = t.match(Tf)
  return s ? (ge ? location.hash : '') === s[0] : !0
}
function Lr(e) {
  return decodeURI(e).replace(Cf, '').replace(Af, '$1')
}
function Of(e) {
  return po.test(e)
}
function Mf(e, t) {
  return (
    Object.keys((e == null ? void 0 : e.locales) || {}).find(
      (n) => n !== 'root' && !Of(n) && Rf(t, `/${n}/`, !0),
    ) || 'root'
  )
}
function If(e, t) {
  var s, r, i, o, l, c, u
  const n = Mf(e, t)
  return Object.assign({}, e, {
    localeIndex: n,
    lang: ((s = e.locales[n]) == null ? void 0 : s.lang) ?? e.lang,
    dir: ((r = e.locales[n]) == null ? void 0 : r.dir) ?? e.dir,
    title: ((i = e.locales[n]) == null ? void 0 : i.title) ?? e.title,
    titleTemplate:
      ((o = e.locales[n]) == null ? void 0 : o.titleTemplate) ??
      e.titleTemplate,
    description:
      ((l = e.locales[n]) == null ? void 0 : l.description) ?? e.description,
    head: yo(e.head, ((c = e.locales[n]) == null ? void 0 : c.head) ?? []),
    themeConfig: {
      ...e.themeConfig,
      ...((u = e.locales[n]) == null ? void 0 : u.themeConfig),
    },
  })
}
function mo(e, t) {
  const n = t.title || e.title,
    s = t.titleTemplate ?? e.titleTemplate
  if (typeof s == 'string' && s.includes(':title'))
    return s.replace(/:title/g, n)
  const r = Lf(e.title, s)
  return n === r.slice(3) ? n : `${n}${r}`
}
function Lf(e, t) {
  return t === !1
    ? ''
    : t === !0 || t === void 0
      ? ` | ${e}`
      : e === t
        ? ''
        : ` | ${t}`
}
function Pf(e, t) {
  const [n, s] = t
  if (n !== 'meta') return !1
  const r = Object.entries(s)[0]
  return r == null ? !1 : e.some(([i, o]) => i === n && o[r[0]] === r[1])
}
function yo(e, t) {
  return [...e.filter((n) => !Pf(t, n)), ...t]
}
const Nf = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g,
  Ff = /^[a-z]:/i
function Pr(e) {
  const t = Ff.exec(e),
    n = t ? t[0] : ''
  return (
    n +
    e
      .slice(n.length)
      .replace(Nf, '_')
      .replace(/(^|\/)_+(?=[^/]*$)/, '$1')
  )
}
const fs = new Set()
function Hf(e) {
  if (fs.size === 0) {
    const n =
      (typeof process == 'object' &&
        (cs == null ? void 0 : cs.VITE_EXTRA_EXTENSIONS)) ||
      (ls == null ? void 0 : ls.VITE_EXTRA_EXTENSIONS) ||
      ''
    ;(
      '3g2,3gp,aac,ai,apng,au,avif,bin,bmp,cer,class,conf,crl,css,csv,dll,doc,eps,epub,exe,gif,gz,ics,ief,jar,jpe,jpeg,jpg,js,json,jsonld,m4a,man,mid,midi,mjs,mov,mp2,mp3,mp4,mpe,mpeg,mpg,mpp,oga,ogg,ogv,ogx,opus,otf,p10,p7c,p7m,p7s,pdf,png,ps,qt,roff,rtf,rtx,ser,svg,t,tif,tiff,tr,ts,tsv,ttf,txt,vtt,wav,weba,webm,webp,woff,woff2,xhtml,xml,yaml,yml,zip' +
      (n && typeof n == 'string' ? ',' + n : '')
    )
      .split(',')
      .forEach((s) => fs.add(s))
  }
  const t = e.split('.').pop()
  return t == null || !fs.has(t.toLowerCase())
}
const Df = Symbol(),
  mt = oi(nf)
function _a(e) {
  const t = oe(() => If(mt.value, e.data.relativePath)),
    n = t.value.appearance,
    s =
      n === 'force-dark'
        ? de(!0)
        : n === 'force-auto'
          ? Ws()
          : n
            ? Sf({
                storageKey: Ef,
                initialValue: () => (n === 'dark' ? 'dark' : 'auto'),
                ...(typeof n == 'object' ? n : {}),
              })
            : de(!1),
    r = de(ge ? location.hash : '')
  return (
    ge &&
      window.addEventListener('hashchange', () => {
        r.value = location.hash
      }),
    Fe(
      () => e.data,
      () => {
        r.value = ge ? location.hash : ''
      },
    ),
    {
      site: t,
      theme: oe(() => t.value.themeConfig),
      page: oe(() => e.data),
      frontmatter: oe(() => e.data.frontmatter),
      params: oe(() => e.data.params),
      lang: oe(() => t.value.lang),
      dir: oe(() => e.data.frontmatter.dir || t.value.dir),
      localeIndex: oe(() => t.value.localeIndex || 'root'),
      title: oe(() => mo(t.value, e.data)),
      description: oe(() => e.data.description || t.value.description),
      isDark: s,
      hash: oe(() => r.value),
    }
  )
}
function $f() {
  const e = At(Df)
  if (!e) throw new Error('vitepress data not properly injected in app')
  return e
}
function jf(e, t) {
  return `${e}${t}`.replace(/\/+/g, '/')
}
function Nr(e) {
  return po.test(e) || !e.startsWith('/') ? e : jf(mt.value.base, e)
}
function Vf(e) {
  let t = e.replace(/\.html$/, '')
  if (((t = decodeURIComponent(t)), (t = t.replace(/\/$/, '/index')), ge)) {
    const n = '/Versakit-markdown/'
    t = Pr(t.slice(n.length).replace(/\//g, '_') || 'index') + '.md'
    let s = __VP_HASH_MAP__[t.toLowerCase()]
    if (
      (s ||
        ((t = t.endsWith('_index.md')
          ? t.slice(0, -9) + '.md'
          : t.slice(0, -3) + '_index.md'),
        (s = __VP_HASH_MAP__[t.toLowerCase()])),
      !s)
    )
      return null
    t = `${n}assets/${t}.${s}.js`
  } else t = `./${Pr(t.slice(1).replace(/\//g, '_'))}.md.js`
  return t
}
let yn = []
function ba(e) {
  yn.push(e),
    $n(() => {
      yn = yn.filter((t) => t !== e)
    })
}
function Uf() {
  let e = mt.value.scrollOffset,
    t = 0,
    n = 24
  if (
    (typeof e == 'object' &&
      'padding' in e &&
      ((n = e.padding), (e = e.selector)),
    typeof e == 'number')
  )
    t = e
  else if (typeof e == 'string') t = Fr(e, n)
  else if (Array.isArray(e))
    for (const s of e) {
      const r = Fr(s, n)
      if (r) {
        t = r
        break
      }
    }
  return t
}
function Fr(e, t) {
  const n = document.querySelector(e)
  if (!n) return 0
  const s = n.getBoundingClientRect().bottom
  return s < 0 ? 0 : s + t
}
const kf = Symbol(),
  _o = 'http://a.com',
  Bf = () => ({ path: '/', component: null, data: go })
function wa(e, t) {
  const n = Ln(Bf()),
    s = { route: n, go: r }
  async function r(l = ge ? location.href : '/') {
    var c, u
    ;(l = as(l)),
      (await ((c = s.onBeforeRouteChange) == null ? void 0 : c.call(s, l))) !==
        !1 &&
        (ge &&
          l !== as(location.href) &&
          (history.replaceState({ scrollPosition: window.scrollY }, ''),
          history.pushState({}, '', l)),
        await o(l),
        await ((u = s.onAfterRouteChanged) == null ? void 0 : u.call(s, l)))
  }
  let i = null
  async function o(l, c = 0, u = !1) {
    var _, S
    if (
      (await ((_ = s.onBeforePageLoad) == null ? void 0 : _.call(s, l))) === !1
    )
      return
    const f = new URL(l, _o),
      h = (i = f.pathname)
    try {
      let L = await e(h)
      if (!L) throw new Error(`Page not found: ${h}`)
      if (i === h) {
        i = null
        const { default: O, __pageData: G } = L
        if (!O) throw new Error(`Invalid route component: ${O}`)
        await ((S = s.onAfterPageLoad) == null ? void 0 : S.call(s, l)),
          (n.path = ge ? h : Nr(h)),
          (n.component = pn(O)),
          (n.data = pn(G)),
          ge &&
            Fn(() => {
              let U =
                mt.value.base +
                G.relativePath.replace(/(?:(^|\/)index)?\.md$/, '$1')
              if (
                (!mt.value.cleanUrls && !U.endsWith('/') && (U += '.html'),
                U !== f.pathname &&
                  ((f.pathname = U),
                  (l = U + f.search + f.hash),
                  history.replaceState({}, '', l)),
                f.hash && !c)
              ) {
                let W = null
                try {
                  W = document.getElementById(
                    decodeURIComponent(f.hash).slice(1),
                  )
                } catch (g) {
                  console.warn(g)
                }
                if (W) {
                  Hr(W, f.hash)
                  return
                }
              }
              window.scrollTo(0, c)
            })
      }
    } catch (L) {
      if (
        (!/fetch|Page not found/.test(L.message) &&
          !/^\/404(\.html|\/)?$/.test(l) &&
          console.error(L),
        !u)
      )
        try {
          const O = await fetch(mt.value.base + 'hashmap.json')
          ;(window.__VP_HASH_MAP__ = await O.json()), await o(l, c, !0)
          return
        } catch {}
      if (i === h) {
        ;(i = null), (n.path = ge ? h : Nr(h)), (n.component = t ? pn(t) : null)
        const O = ge
          ? h
              .replace(/(^|\/)$/, '$1index')
              .replace(/(\.html)?$/, '.md')
              .replace(/^\//, '')
          : '404.md'
        n.data = { ...go, relativePath: O }
      }
    }
  }
  return (
    ge &&
      (history.state === null && history.replaceState({}, ''),
      window.addEventListener(
        'click',
        (l) => {
          if (
            l.defaultPrevented ||
            !(l.target instanceof Element) ||
            l.target.closest('button') ||
            l.button !== 0 ||
            l.ctrlKey ||
            l.shiftKey ||
            l.altKey ||
            l.metaKey
          )
            return
          const c = l.target.closest('a')
          if (
            !c ||
            c.closest('.vp-raw') ||
            c.hasAttribute('download') ||
            c.hasAttribute('target')
          )
            return
          const u =
            c.getAttribute('href') ??
            (c instanceof SVGAElement ? c.getAttribute('xlink:href') : null)
          if (u == null) return
          const {
              href: f,
              origin: h,
              pathname: _,
              hash: S,
              search: L,
            } = new URL(u, c.baseURI),
            O = new URL(location.href)
          h === O.origin &&
            Hf(_) &&
            (l.preventDefault(),
            _ === O.pathname && L === O.search
              ? (S !== O.hash &&
                  (history.pushState({}, '', f),
                  window.dispatchEvent(
                    new HashChangeEvent('hashchange', {
                      oldURL: O.href,
                      newURL: f,
                    }),
                  )),
                S
                  ? Hr(c, S, c.classList.contains('header-anchor'))
                  : window.scrollTo(0, 0))
              : r(f))
        },
        { capture: !0 },
      ),
      window.addEventListener('popstate', async (l) => {
        var c
        l.state !== null &&
          (await o(as(location.href), (l.state && l.state.scrollPosition) || 0),
          (c = s.onAfterRouteChanged) == null || c.call(s, location.href))
      }),
      window.addEventListener('hashchange', (l) => {
        l.preventDefault()
      })),
    s
  )
}
function Wf() {
  const e = At(kf)
  if (!e) throw new Error('useRouter() is called without provider.')
  return e
}
function bo() {
  return Wf().route
}
function Hr(e, t, n = !1) {
  let s = null
  try {
    s = e.classList.contains('header-anchor')
      ? e
      : document.getElementById(decodeURIComponent(t).slice(1))
  } catch (r) {
    console.warn(r)
  }
  if (s) {
    let r = function () {
      !n || Math.abs(o - window.scrollY) > window.innerHeight
        ? window.scrollTo(0, o)
        : window.scrollTo({ left: 0, top: o, behavior: 'smooth' })
    }
    const i = parseInt(window.getComputedStyle(s).paddingTop, 10),
      o = window.scrollY + s.getBoundingClientRect().top - Uf() + i
    requestAnimationFrame(r)
  }
}
function as(e) {
  const t = new URL(e, _o)
  return (
    (t.pathname = t.pathname.replace(/(^|\/)index(\.html)?$/, '$1')),
    mt.value.cleanUrls
      ? (t.pathname = t.pathname.replace(/\.html$/, ''))
      : !t.pathname.endsWith('/') &&
        !t.pathname.endsWith('.html') &&
        (t.pathname += '.html'),
    t.pathname + t.search + t.hash
  )
}
const un = () => yn.forEach((e) => e()),
  va = wi({
    name: 'VitePressContent',
    props: { as: { type: [Object, String], default: 'div' } },
    setup(e) {
      const t = bo(),
        { frontmatter: n, site: s } = $f()
      return (
        Fe(n, un, { deep: !0, flush: 'post' }),
        () =>
          Ts(
            e.as,
            s.value.contentProps ?? { style: { position: 'relative' } },
            [
              t.component
                ? Ts(t.component, {
                    onVnodeMounted: un,
                    onVnodeUpdated: un,
                    onVnodeUnmounted: un,
                  })
                : '404 Page Not Found',
            ],
          )
      )
    },
  }),
  Sa = wi({
    setup(e, { slots: t }) {
      const n = de(!1)
      return (
        Ot(() => {
          n.value = !0
        }),
        () => (n.value && t.default ? t.default() : null)
      )
    },
  })
function xa() {
  ge &&
    window.addEventListener('click', (e) => {
      var n
      const t = e.target
      if (t.matches('.vp-code-group input')) {
        const s = (n = t.parentElement) == null ? void 0 : n.parentElement
        if (!s) return
        const r = Array.from(s.querySelectorAll('input')).indexOf(t)
        if (r < 0) return
        const i = s.querySelector('.blocks')
        if (!i) return
        const o = Array.from(i.children).find((u) =>
          u.classList.contains('active'),
        )
        if (!o) return
        const l = i.children[r]
        if (!l || o === l) return
        o.classList.remove('active'), l.classList.add('active')
        const c = s == null ? void 0 : s.querySelector(`label[for="${t.id}"]`)
        c == null || c.scrollIntoView({ block: 'nearest' })
      }
    })
}
function Ea() {
  if (ge) {
    const e = new WeakMap()
    window.addEventListener('click', (t) => {
      var s
      const n = t.target
      if (n.matches('div[class*="language-"] > button.copy')) {
        const r = n.parentElement,
          i = (s = n.nextElementSibling) == null ? void 0 : s.nextElementSibling
        if (!r || !i) return
        const o = /language-(shellscript|shell|bash|sh|zsh)/.test(r.className),
          l = ['.vp-copy-ignore', '.diff.remove'],
          c = i.cloneNode(!0)
        c.querySelectorAll(l.join(',')).forEach((f) => f.remove())
        let u = c.textContent || ''
        o && (u = u.replace(/^ *(\$|>) /gm, '').trim()),
          Kf(u).then(() => {
            n.classList.add('copied'), clearTimeout(e.get(n))
            const f = setTimeout(() => {
              n.classList.remove('copied'), n.blur(), e.delete(n)
            }, 2e3)
            e.set(n, f)
          })
      }
    })
  }
}
async function Kf(e) {
  try {
    return navigator.clipboard.writeText(e)
  } catch {
    const t = document.createElement('textarea'),
      n = document.activeElement
    ;(t.value = e),
      t.setAttribute('readonly', ''),
      (t.style.contain = 'strict'),
      (t.style.position = 'absolute'),
      (t.style.left = '-9999px'),
      (t.style.fontSize = '12pt')
    const s = document.getSelection(),
      r = s ? s.rangeCount > 0 && s.getRangeAt(0) : null
    document.body.appendChild(t),
      t.select(),
      (t.selectionStart = 0),
      (t.selectionEnd = e.length),
      document.execCommand('copy'),
      document.body.removeChild(t),
      r && (s.removeAllRanges(), s.addRange(r)),
      n && n.focus()
  }
}
function Ta(e, t) {
  let n = !0,
    s = []
  const r = (i) => {
    if (n) {
      ;(n = !1),
        i.forEach((l) => {
          const c = us(l)
          for (const u of document.head.children)
            if (u.isEqualNode(c)) {
              s.push(u)
              return
            }
        })
      return
    }
    const o = i.map(us)
    s.forEach((l, c) => {
      const u = o.findIndex((f) =>
        f == null ? void 0 : f.isEqualNode(l ?? null),
      )
      u !== -1 ? delete o[u] : (l == null || l.remove(), delete s[c])
    }),
      o.forEach((l) => l && document.head.appendChild(l)),
      (s = [...s, ...o].filter(Boolean))
  }
  Bi(() => {
    const i = e.data,
      o = t.value,
      l = i && i.description,
      c = (i && i.frontmatter.head) || [],
      u = mo(o, i)
    u !== document.title && (document.title = u)
    const f = l || o.description
    let h = document.querySelector('meta[name=description]')
    h
      ? h.getAttribute('content') !== f && h.setAttribute('content', f)
      : us(['meta', { name: 'description', content: f }]),
      r(yo(o.head, Gf(c)))
  })
}
function us([e, t, n]) {
  const s = document.createElement(e)
  for (const r in t) s.setAttribute(r, t[r])
  return (
    n && (s.innerHTML = n),
    e === 'script' && t.async == null && (s.async = !1),
    s
  )
}
function qf(e) {
  return e[0] === 'meta' && e[1] && e[1].name === 'description'
}
function Gf(e) {
  return e.filter((t) => !qf(t))
}
const ds = new Set(),
  wo = () => document.createElement('link'),
  Yf = (e) => {
    const t = wo()
    ;(t.rel = 'prefetch'), (t.href = e), document.head.appendChild(t)
  },
  Xf = (e) => {
    const t = new XMLHttpRequest()
    t.open('GET', e, (t.withCredentials = !0)), t.send()
  }
let dn
const Jf =
  ge &&
  (dn = wo()) &&
  dn.relList &&
  dn.relList.supports &&
  dn.relList.supports('prefetch')
    ? Yf
    : Xf
function Ca() {
  if (!ge || !window.IntersectionObserver) return
  let e
  if ((e = navigator.connection) && (e.saveData || /2g/.test(e.effectiveType)))
    return
  const t = window.requestIdleCallback || setTimeout
  let n = null
  const s = () => {
    n && n.disconnect(),
      (n = new IntersectionObserver((i) => {
        i.forEach((o) => {
          if (o.isIntersecting) {
            const l = o.target
            n.unobserve(l)
            const { pathname: c } = l
            if (!ds.has(c)) {
              ds.add(c)
              const u = Vf(c)
              u && Jf(u)
            }
          }
        })
      })),
      t(() => {
        document.querySelectorAll('#app a').forEach((i) => {
          const { hostname: o, pathname: l } = new URL(
              i.href instanceof SVGAnimatedString ? i.href.animVal : i.href,
              i.baseURI,
            ),
            c = l.match(/\.\w+$/)
          ;(c && c[0] !== '.html') ||
            (i.target !== '_blank' &&
              o === location.hostname &&
              (l !== location.pathname ? n.observe(i) : ds.add(l)))
        })
      })
  }
  Ot(s)
  const r = bo()
  Fe(() => r.path, s),
    $n(() => {
      n && n.disconnect()
    })
}
export {
  sa as $,
  Uf as A,
  Qf as B,
  ea as C,
  oi as D,
  ba as E,
  Se as F,
  he as G,
  Zf as H,
  po as I,
  bo as J,
  gc as K,
  At as L,
  ya as M,
  Is as N,
  pa as O,
  Fn as P,
  ma as Q,
  ge as R,
  Pn as S,
  ca as T,
  ga as U,
  Yl as V,
  na as W,
  ua as X,
  xi as Y,
  aa as Z,
  ha as _,
  Qi as a,
  zf as a0,
  fa as a1,
  oa as a2,
  Ta as a3,
  kf as a4,
  _a as a5,
  Df as a6,
  va as a7,
  Sa as a8,
  mt as a9,
  da as aa,
  wa as ab,
  Vf as ac,
  Ca as ad,
  Ea as ae,
  xa as af,
  Ts as ag,
  xs as b,
  ia as c,
  wi as d,
  la as e,
  Hf as f,
  Nr as g,
  oe as h,
  Of as i,
  zi as j,
  ci as k,
  Rf as l,
  ao as m,
  Ls as n,
  Ss as o,
  de as p,
  Fe as q,
  ta as r,
  Bi as s,
  Ho as t,
  $f as u,
  Ot as v,
  wl as w,
  $n as x,
  ra as y,
  Nl as z,
}
