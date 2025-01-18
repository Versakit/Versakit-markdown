const parser = require('../dist/index.cjs.js')

// 创建解析器实例 - 使用默认导出中的 Parser 类
const markdownParser = new parser.Parser()

// 测试用例
const markdown = `# Markdown Parser Test

这是一个**粗体**和*斜体*的测试。

## 链接和图片测试
这是一个[链接](https://example.com)
![图片](https://example.com/image.jpg)

> 这是一段引用文本

### 列表测试
- 无序列表项 1
- 无序列表项 2

1. 有序列表项 1
2. 有序列表项 2

### 代码块测试
\`\`\`javascript
console.log('Hello World');
const test = 123;
\`\`\`

这是一段包含\`行内代码\`的文本。

---

## 测试完成`

// 解析 markdown
const ast = markdownParser.parseMarkdown(markdown)

// 格式化输出
console.log('解析结果：')
console.log(JSON.stringify(ast, null, 2))

// 测试特定节点
console.log('\n验证解析结果：')
console.log('文档类型:', ast.type)
console.log('子节点数量:', ast.children?.length)
console.log('第一个标题:', ast.children?.[0])
