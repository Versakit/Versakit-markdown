# Parser

这是一个用于将 Markdown 转换为抽象语法树（AST）的解析器。

## 安装

```bash
npm install @versakit/parser
```

## 使用

```TypeScript
import { MarkdownParser } from '@versakit/parser'
const md = "# Hello World"
const parser = new MarkdownParser.Parser()
parser.parse(md)
```
