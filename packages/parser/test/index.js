import Parser from '@versakit/markdown-parser'

// 测试用例
const markdownText = `
# This is a header

This is a paragraph with **bold text** and *italic text*.

- List item 1
- List item 2
- List item 3

[Link to Google](https://www.google.com)
`

// 创建 Parser 实例
const parser = new Parser()

// 解析 Markdown 文本
const ast = parser.parseMarkdown(markdownText)

// 打印解析结果
console.log(ast)
