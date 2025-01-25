export const applyMarkdownSyntax = (cmd: string, selectedText: Node): Node => {
  switch (cmd) {
    case '#':
      return createHeaderNode(selectedText, 1)
    case '##':
      return createHeaderNode(selectedText, 2)
    case '###':
      return createHeaderNode(selectedText, 3)
    case '**':
      return createBoldNode(selectedText)
    case '*':
      return createItalicNode(selectedText)
    case '~~':
      return createStrikethroughNode(selectedText)
    case '<u>':
      return createUnderlineNode(selectedText)
    case '-':
      return createUnorderlistNode(selectedText)
    case '1.':
      return createOrderlistNode(selectedText)
    case '>':
      return createQuoteNode(selectedText)
    case '`':
      return createCodeNode(selectedText)
    default:
      throw new Error(`Unsupported Markdown syntax: ${cmd}`)
  }
}

const createBoldNode = (selectedText: Node): Node => {
  const fragment = document.createDocumentFragment()
  const startNode = document.createTextNode('**')
  const endNode = document.createTextNode('**')
  fragment.appendChild(startNode)
  fragment.appendChild(selectedText)
  fragment.appendChild(endNode)
  return fragment
}

const createItalicNode = (selectedText: Node): Node => {
  const fragment = document.createDocumentFragment()
  const startNode = document.createTextNode('*')
  const endNode = document.createTextNode('*')
  fragment.appendChild(startNode)
  fragment.appendChild(selectedText)
  fragment.appendChild(endNode)
  return fragment
}

const createUnderlineNode = (selectedText: Node): Node => {
  const fragment = document.createDocumentFragment()
  const startNode = document.createTextNode('<u>')
  const endNode = document.createTextNode('</u>')
  fragment.appendChild(startNode)
  fragment.appendChild(selectedText)
  fragment.appendChild(endNode)
  return fragment
}

const createStrikethroughNode = (selectedText: Node): Node => {
  const fragment = document.createDocumentFragment()
  const startNode = document.createTextNode('~~')
  const endNode = document.createTextNode('~~')
  fragment.appendChild(startNode)
  fragment.appendChild(selectedText)
  fragment.appendChild(endNode)
  return fragment
}

const createUnorderlistNode = (selectedText: Node): Node => {
  const fragment = document.createDocumentFragment()
  const startNode = document.createTextNode('- ')
  fragment.appendChild(startNode)
  fragment.appendChild(selectedText)
  return fragment
}

const createOrderlistNode = (selectedText: Node): Node => {
  const fragment = document.createDocumentFragment()
  const startNode = document.createTextNode('1. ')
  fragment.appendChild(startNode)
  fragment.appendChild(selectedText)
  return fragment
}

const createQuoteNode = (selectedText: Node): Node => {
  const fragment = document.createDocumentFragment()
  const startNode = document.createTextNode('> ')
  fragment.appendChild(startNode)
  fragment.appendChild(selectedText)
  return fragment
}

const createCodeNode = (selectedText: Node): Node => {
  const fragment = document.createDocumentFragment()
  const startNode = document.createTextNode('`')
  const endNode = document.createTextNode('`')
  fragment.appendChild(startNode)
  fragment.appendChild(selectedText)
  fragment.appendChild(endNode)
  return fragment
}

const createHeaderNode = (selectedText: Node, level: number): Node => {
  const fragment = document.createDocumentFragment()
  const startNode = document.createTextNode('#'.repeat(level) + ' ')
  fragment.appendChild(startNode)
  fragment.appendChild(selectedText)
  return fragment
}
