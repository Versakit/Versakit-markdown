import { describe, expect, it } from 'vitest'
import { Parser } from '../src/parser_core'

describe('Parser', () => {
  const parser = new Parser()

  describe('parseMarkdown', () => {
    it('should parse basic markdown text', () => {
      const input = 'Hello world\n\nThis is a test'
      const result = parser.parseMarkdown(input)
      expect(result).toEqual([
        {
          type: 'paragraph',
          children: [{ type: 'text', value: 'Hello world' }],
        },
        {
          type: 'paragraph',
          children: [{ type: 'text', value: 'This is a test' }],
        },
      ])
    })

    it('should parse mixed markdown elements', () => {
      const input = `# Header

**Bold** and *italic*

\`\`\`js
const code = 'test';
\`\`\``
      const result = parser.parseMarkdown(input)
      expect(result).toEqual([
        {
          type: 'heading',
          depth: 1,
          children: [{ type: 'text', value: 'Header' }],
        },
        {
          type: 'paragraph',
          children: [
            { type: 'bold', children: [{ type: 'text', value: 'Bold' }] },
            { type: 'text', value: ' and ' },
            { type: 'italic', children: [{ type: 'text', value: 'italic' }] },
          ],
        },
        {
          type: 'code',
          lang: 'js',
          value: "const code = 'test';",
        },
      ])
    })
  })
})
