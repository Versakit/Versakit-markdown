describe('Markdown Editor E2E Tests', () => {
  beforeEach(() => {
    // 访问编辑器页面
    cy.visit('Versakit-markdown/example.html')
  })

  it('should render the editor and preview containers', () => {
    cy.get('.container-box').should('exist')
    cy.get('.rich').should('exist')
    cy.get('.preview').should('exist')
  })

  it('should update preview when typing markdown content', () => {
    // 测试标题输入
    cy.get('.rich').type('# Hello World')
    cy.get('.preview').should('contain', 'Hello World')

    // 测试列表输入
    cy.get('.rich').clear().type('- Item 1\n- Item 2')
    cy.get('.preview').find('ul').should('exist')
    cy.get('.preview').find('li').should('have.length', 2)
  })

  it('should handle formatting buttons correctly', () => {
    // 测试加粗功能
    cy.get('.rich').type('test')
    cy.get('[data-test="bold-btn"]').click()
    cy.get('.preview').should('contain', '**test**')
  })

  it('should persist content while typing', () => {
    const testContent = '## Test Content'
    cy.get('.rich').type(testContent)
    cy.get('.preview').should('contain', 'Test Content')

    // 验证内容是否正确解析
    cy.get('.rich').invoke('val').should('equal', testContent)
  })
})
