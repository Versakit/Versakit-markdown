import MarkdownParser from '@versakit/markdown-parser'
const markdownText1 = `
表格

| 标题1 | 标题2 | 标题3 |
| ----- | ----- | ----- |
| 内容1 | 内容2 | 内容3 |
| 内容1 | 内容2 | 内容3 |
----------------
`

// 测试用例
// const markdownText2 = `

// ### 分割线

// ## 测试完成`

const md = new MarkdownParser.Parser()

// 解析 markdown
const ast1 = md.parseMarkdown(markdownText1)
// const ast2 = md.parseMarkdown(markdownText2)
// 格式化输出
console.log('解析结果：')
console.log(JSON.stringify(ast1, null, 2))
// console.log(JSON.stringify(ast2, null, 2))

// 测试特定节点
console.log('\n验证解析结果：')
// console.log('文档类型:', ast.type)
// console.log('子节点数量:', ast.children?.length)
// console.log('第一个标题:', ast.children?.[0])
