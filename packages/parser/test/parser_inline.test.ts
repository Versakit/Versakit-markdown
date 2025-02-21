import { describe, expect, it } from 'vitest'
import { ParserInline } from '../src/parser_inline'

describe('ParserInline', () => {
  const parser = new ParserInline()

  describe('parseInline', () => {
    it('should parse plain text', () => {
      const result = parser.parseInline('Hello world')
      expect(result).toEqual([{ type: 'text', value: 'Hello world' }])
    })

    it('should parse bold text', () => {
      const result = parser.parseInline('Hello **bold** world')
      expect(result).toEqual([
        { type: 'text', value: 'Hello ' },
        { type: 'bold', children: [{ type: 'text', value: 'bold' }] },
        { type: 'text', value: ' world' },
      ])
    })

    it('should parse italic text', () => {
      const result = parser.parseInline('Hello *italic* world')
      expect(result).toEqual([
        { type: 'text', value: 'Hello ' },
        { type: 'italic', children: [{ type: 'text', value: 'italic' }] },
        { type: 'text', value: ' world' },
      ])
    })

    it('should parse inline code', () => {
      const result = parser.parseInline('Hello `code` world')
      expect(result).toEqual([
        { type: 'text', value: 'Hello ' },
        { type: 'inlineCode', value: 'code' },
        { type: 'text', value: ' world' },
      ])
    })

    it('should parse links', () => {
      const result = parser.parseInline('[link](https://example.com)')
      expect(result).toEqual([
        {
          type: 'link',
          url: 'https://example.com',
          children: [{ type: 'text', value: 'link' }],
        },
      ])
    })

    it('should parse images', () => {
      const result = parser.parseInline('![alt](image.jpg)')
      expect(result).toEqual([
        {
          type: 'image',
          alt: 'alt',
          url: 'image.jpg',
        },
      ])
    })

    it('should parse nested formatting', () => {
      const result = parser.parseInline('**Bold _underline_ text**')
      expect(result).toEqual([
        {
          type: 'bold',
          children: [
            { type: 'text', value: 'Bold ' },
            {
              type: 'underline',
              children: [{ type: 'text', value: 'underline' }],
            },
            { type: 'text', value: ' text' },
          ],
        },
      ])
    })
  })
})
