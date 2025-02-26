// Import cypress commands and assertions
import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      // 在这里添加自定义命令类型
    }
  }
}
