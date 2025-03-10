import { describe, expect, it } from 'vitest'
import { ParserBlock } from '../src/parser_block'

describe('ParserBlock', () => {
  const parser = new ParserBlock()

  describe('parseBlocks', () => {
    it('should parse paragraphs', () => {
      const input = ['Hello world', '', 'Another paragraph']
      const result = parser.parseBlocks(input)
      expect(result).toEqual([
        {
          type: 'paragraph',
          children: [{ type: 'text', value: 'Hello world' }],
        },
        {
          type: 'paragraph',
          children: [{ type: 'text', value: 'Another paragraph' }],
        },
      ])
    })

    it('should parse headers', () => {
      const input = ['# Header 1', '## Header 2']
      const result = parser.parseBlocks(input)
      expect(result).toEqual([
        {
          type: 'heading',
          depth: 1,
          children: [{ type: 'text', value: 'Header 1' }],
        },
        {
          type: 'heading',
          depth: 2,
          children: [{ type: 'text', value: 'Header 2' }],
        },
      ])
    })

    it('should parse code blocks', () => {
      const input = ['```js', 'const x = 1;', '```']
      const result = parser.parseBlocks(input)
      expect(result).toEqual([
        {
          type: 'code',
          lang: 'js',
          value: 'const x = 1;',
        },
      ])
    })

    it('should parse blockquotes', () => {
      const input = ['> This is a quote']
      const result = parser.parseBlocks(input)
      expect(result).toEqual([
        {
          type: 'blockquote',
          children: [{ type: 'text', value: 'This is a quote' }],
        },
      ])
    })

    it('should parse tables', () => {
      const input = [
        '| Header 1 | Header 2 |',
        '|----------|----------|',
        '| Cell 1   | Cell 2   |',
      ]
      const result = parser.parseBlocks(input)
      expect(result).toEqual([
        {
          type: 'table',
          alignments: ['left', 'left'],
          children: [
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  isHeader: true,
                  children: [{ type: 'text', value: 'Header 1' }],
                },
                {
                  type: 'tableCell',
                  isHeader: true,
                  children: [{ type: 'text', value: 'Header 2' }],
                },
              ],
            },
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  isHeader: false,
                  children: [{ type: 'text', value: 'Cell 1' }],
                },
                {
                  type: 'tableCell',
                  isHeader: false,
                  children: [{ type: 'text', value: 'Cell 2' }],
                },
              ],
            },
          ],
        },
      ])
    })
  })

  describe('parseTable', () => {
    it('should parse table with alignments', () => {
      const input = [
        '| Left | Center | Right |',
        '|:-----|:------:|------:|',
        '| 1    |   2    |     3 |',
      ]
      const result = parser.parseTable(input, 0)
      expect(result).toEqual({
        type: 'table',
        alignments: ['left', 'center', 'right'],
        children: [
          {
            type: 'tableRow',
            children: [
              {
                type: 'tableCell',
                isHeader: true,
                children: [{ type: 'text', value: 'Left' }],
              },
              {
                type: 'tableCell',
                isHeader: true,
                children: [{ type: 'text', value: 'Center' }],
              },
              {
                type: 'tableCell',
                isHeader: true,
                children: [{ type: 'text', value: 'Right' }],
              },
            ],
          },
          {
            type: 'tableRow',
            children: [
              {
                type: 'tableCell',
                isHeader: false,
                children: [{ type: 'text', value: '1' }],
              },
              {
                type: 'tableCell',
                isHeader: false,
                children: [{ type: 'text', value: '2' }],
              },
              {
                type: 'tableCell',
                isHeader: false,
                children: [{ type: 'text', value: '3' }],
              },
            ],
          },
        ],
      })
    })
  })
})
