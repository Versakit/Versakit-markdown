# VersakitMarkdown-Renderer

This is a markdown renderer which is used to render markdown-ast to html.

## Install

```bash
npm install @versakit/markdown-renderer
```

## Usage

you need to install `@versakit/parser` first.

Available Methods:

- Renderer: This is the default renderer that converts the Markdown Abstract Syntax Tree (AST) to HTML. It also provides a diff algorithm to efficiently handle changes in the AST.
- RendererText: This method converts the AST to plain HTML text. It is useful when you need to generate HTML content without additional processing.

### Example

We provide a simple example to show how to use the renderer.

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <title>Markdown Editer</title>
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
      // create parser instance
      const parser = new Parser();
      let renderer = null;

      // get textarea
      const textarea = document.querySelector(".markdown-input");

      // initial markdown
      const initialMarkdown = textarea.value;
      const initialAst = parser.parseMarkdown(initialMarkdown);

      // create renderer instance
      renderer = new Renderer({
        ast: initialAst,
        container: "#preview",
      });

      // listen for input changes
      textarea.addEventListener("input", (e) => {
        const markdown = e.target.value;
        const ast = parser.parseMarkdown(markdown);
        if (renderer) {
          renderer.update(ast);
        }
      });

      // check link validity
      function checkLinkValidity(url) {
        try {
          new URL(url);
          return true;
        } catch (error) {
          return false;
        }
      }

      // add invalid link class and event listener
      const links = document.querySelectorAll("a");
      links.forEach((link) => {
        const href = link.getAttribute("href");
        if (!checkLinkValidity(href)) {
          link.classList.add("invalid-link");
          link.title = " link invalid is not valid please check again";
          link.addEventListener("click", (e) => {
            e.preventDefault();
            alert("link invalid is not valid please check again");
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

// Render using Renderer
const html = Renderer.render(ast)
console.log(html) // Output: <h1>Hello World</h1>
```
