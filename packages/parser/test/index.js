import parser from '@versakit/markdown-parser'

// 创建解析器实例 - 使用默认导出中的 Parser 类
const markdownParser = new parser.Parser()

// 测试用例
const markdown = `# Markdown Parser Test

这是一个**粗体**和*斜体*的测试。

## 链接和图片测试
这是一个[链接](https://example.com)
![图片](https://example.com/image.jpg)

> 这是一段引用文本
> 这是一段引用文本2

### 列表测试
- 无序列表项 1
- 无序列表项 2

1. 有序列表项 1
2. 有序列表项 2

### 多行测试




### 代码块测试
\`\`\`javascript
console.log('Hello World');
const test = 123^5^;
\`\`\`

这是一段包含\`行内代码\`的文本。

### 删除线测试
这是一段包含 ~~单个删除线~~ 的文本。
这里还有 ~~多个删除线~~，~~一个接着一个~~ 。

### 下划线测试
这是一段包含 _下划线_ 测试的文本。还有 _另一个下划线_ 测试

### 下标测试
 H~2~O 表示水。
 C~6~H~12~O~6~ 是葡萄糖的化学式。

### 上标测试
 X^2^ 表示 X 的平方。
 E = mc^2^ 是质能方程。

### 音频测试
这是一个音频链接 !\[音频\](https://example.com/audio1.mp3)。
再添加一个不同的音频链接 !\[音频\](https://example.com/audio2.mp3) 进行测试。

### 复选框测试

- [ ]这是第一个未选复选框

- [ ] 第二个未选复选框用于确认功能

- [x] 第一个已选复选框

- [x] 第二个已选复选框

### 高亮测试
高亮部分可以突出显示重要内容，比如 ==这是一段高亮的文本==。
还可以有多个高亮部分，==一个高亮接着另一个高亮== 来测试效果。

这是一个普通段落

### 分割线

---

### 数学公式

$$ E = mc^2^ $$

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
const multiLineFormula = `$$ 
    E = mc^2^ 
    E = mc^2^
$$`
const isMatch = /^\$\$([\s\S]*?)\$\$$/.test(multiLineFormula)
console.log(isMatch)
