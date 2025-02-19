# VersakitMarkdown-Parser

This is a markdown parser which is used to parse markdown to AST.

## Install

```bash
npm install @versakit/parser
```

## Usage

```ts
import { MarkdownParser } from '@versakit/parser'
const md = "# Hello World"
const parser = new MarkdownParser.Parser()
parser.parse(md)
```
