export const applyMarkdownSyntax = (cmd: string, selectedText: Node): Node => {
  switch (cmd) {
    case '**':
      return createBoldNode(selectedText)
    case '*':
      return createItalicNode(selectedText)
    case '~~':
      return createStrikethroughNode(selectedText)
    case '`':
      return createCodeNode(selectedText)
    case '###':
      return createHeaderNode(selectedText, 3)
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

const createStrikethroughNode = (selectedText: Node): Node => {
  const fragment = document.createDocumentFragment()
  const startNode = document.createTextNode('~~')
  const endNode = document.createTextNode('~~')
  fragment.appendChild(startNode)
  fragment.appendChild(selectedText)
  fragment.appendChild(endNode)
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
