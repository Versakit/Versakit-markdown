// parser_core.ts
import { ASTNode } from './types'
import { ParserBlock } from './parser_block'

export class Parser {
  private blockParser: ParserBlock

  constructor() {
    this.blockParser = new ParserBlock()
  }

  parseMarkdown(text: string): ASTNode {
    const lines = text.split(/\n/).filter((line) => line.trim() !== '')
    return {
      type: 'document',
      children: this.blockParser.parseBlocks(lines),
    }
  }
}
