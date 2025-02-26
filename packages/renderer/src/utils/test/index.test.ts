import { describe, it, expect } from 'vitest'
import { escapeHtml } from '../index'

describe('escapeHtml', () => {
  it('应该正确转义 HTML 特殊字符', () => {
    expect(escapeHtml('&<>"\'')).toBe('&amp;&lt;&gt;&quot;&#39;')
  })

  it('应该处理空字符串', () => {
    expect(escapeHtml('')).toBe('')
  })

  it('不应修改普通文本', () => {
    expect(escapeHtml('Hello World')).toBe('Hello World')
  })

  it('应该正确处理混合内容', () => {
    expect(escapeHtml('Hello & <World>')).toBe('Hello &amp; &lt;World&gt;')
  })
})
