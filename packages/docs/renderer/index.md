# Renderer

这是一个用于将Markdown抽象语法树（AST）渲染为HTML的Markdown渲染器。

## 安装

```bash
npm install @versakit/markdown-renderer
```

## 使用

首先需要安装`@versakit/parser`。

### 可用方法

- **Renderer**：这是默认的渲染器，用于将Markdown的抽象语法树（AST）转换为HTML。它还提供了一种差异算法，可以高效处理AST中的变化。
- **RendererText**：该方法将AST转换为纯HTML文本。当你需要生成不进行额外处理的HTML内容时，它非常有用。

### 示例

我们提供了一个简单的示例来展示如何使用渲染器：

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <title>Markdown 编辑器</title>
  </head>
  <body>
    <div class="editor-container">
      <div class="input-section">
        <textarea class="markdown-input" spellcheck="false">
        </textarea>
      </div>
      <div class="preview-section">
        <div id="preview"></div>
      </div>
    </div>

    <script src="./parser.js"></script>
    <script src="./renderer.js"></script>
    <script>
      // 创建 parser 实例
      const parser = new Parser();
      let renderer = null;

      // 获取 textarea
      const textarea = document.querySelector(".markdown-input");

      // 初始 markdown 内容
      const initialMarkdown = textarea.value;
      const initialAst = parser.parseMarkdown(initialMarkdown);

      // 创建 renderer 实例
      renderer = new Renderer({
        ast: initialAst,
        container: "#preview",
      });

      // 监听输入框变化
      textarea.addEventListener("input", (e) => {
        const markdown = e.target.value;
        const ast = parser.parseMarkdown(markdown);
        if (renderer) {
          renderer.update(ast);
        }
      });

      // 检查链接有效性
      function checkLinkValidity(url) {
        try {
          new URL(url);
          return true;
        } catch (error) {
          return false;
        }
      }

      // 为无效链接添加样式并绑定事件监听
      const links = document.querySelectorAll("a");
      links.forEach((link) => {
        const href = link.getAttribute("href");
        if (!checkLinkValidity(href)) {
          link.classList.add("invalid-link");
          link.title = "链接无效，请重新检查";
          link.addEventListener("click", (e) => {
            e.preventDefault();
            alert("链接无效，请重新检查");
          });
        }
      });
    </script>
  </body>
</html>
```

```ts
import { MarkdownParser } from '@versakit/parser'
import { Renderer } from '@versakit/markdown-renderer'

const md = "# Hello World"
const parser = new MarkdownParser.Parser()
const ast = parser.parse(md)

// 使用 Renderer 渲染
const html = Renderer.render(ast)
console.log(html) // 输出: <h1>Hello World</h1>
```

这样，您就可以使用VersakitMarkdown-Renderer来渲染Markdown内容了。
