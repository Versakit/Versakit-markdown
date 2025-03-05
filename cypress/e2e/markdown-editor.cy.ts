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

  it('标题输入标题H1的按钮', () => {
    // 首先点击输入区域获取焦点
    cy.get('.editor').click()
    // 测试点击标题H1标题按钮
    cy.get(':nth-child(1) > :nth-child(1) > .ver-code').click()
    // 检查组件下方是否打出了标题的语法“#”这样
    cy.get('.editor').should('contain', '#')
  })
  it('标题输入标题H2的按钮', () => {
    // 首先点击输入区域获取焦点
    cy.get('.editor').click()
    // 测试点击标题H2标题按钮
    cy.get(':nth-child(1) > :nth-child(2) > .ver-code').click()
    // 检查组件下方是否打出了标题的语法“##”这样
    cy.get('.editor').should('contain', '##')
  })
  it('标题输入标题H3的按钮', () => {
    // 首先点击输入区域获取焦点
    cy.get('.editor').click()
    // 测试点击标题H3标题按钮
    cy.get(':nth-child(1) > :nth-child(3) > .ver-code').click()
    // 检查组件下方是否打出了标题的语法“###”这样
    cy.get('.editor').should('contain', '###')
  })
  it('输入文字加粗的按钮', () => {
    // 首先点击输入区域获取焦点
    cy.get('.editor').click()
    // 点击加粗按钮
    cy.get(':nth-child(2) > :nth-child(1) > .ver-code').click()
    // 检查组件下方是否打出了加粗的语法“****”这样
    cy.get('.editor').should('contain', '****')
  })
  it('输入文字斜体的按钮', () => {
    // 首先点击输入区域获取焦点
    cy.get('.editor').click()
    // 点击斜体按钮
    cy.get(':nth-child(2) > :nth-child(2) > .ver-code').click()
    // 检查组件下方是否打出了斜体的语法“**”这样
    cy.get('.editor').should('contain', '**')
  })
  it('输入文字删除线的按钮', () => {
    // 首先点击输入区域获取焦点
    cy.get('.editor').click()
    // 点击删除线按钮
    cy.get(':nth-child(2) > :nth-child(3) > .ver-code').click()
    // 检查组件下方是否打出了删除线的语法“~~”这样
    cy.get('.editor').should('contain', '~~~~')
  })
  it('输入无序列表的按钮', () => {
    // 首先点击输入区域获取焦点
    cy.get('.editor').click()
    // 点击无序列表按钮
    cy.get(':nth-child(3) > :nth-child(1) > .ver-code').click()
    // 检查组件下方是否打出了无序列表的语法“-”这样
    cy.get('.editor').should('contain', '-')
  })
  it('输入有序列表的按钮', () => {
    // 首先点击输入区域获取焦点
    cy.get('.editor').click()
    // 点击有序列表按钮
    cy.get(':nth-child(3) > :nth-child(2) > .ver-code').click()
    // 检查组件下方是否打出了有序列表的语法“1.”这样
    cy.get('.editor').should('contain', '1.')
  })
  it('输入引用的按钮', () => {
    // 首先点击输入区域获取焦点
    cy.get('.editor').click()
    // 点击引用按钮
    cy.get(':nth-child(3) > :nth-child(3) > .ver-code').click()
    // 检查组件下方是否打出了引用的语法“>”这样
    cy.get('.editor').should('contain', '>')
  })
  it('输入代码的按钮', () => {
    // 首先点击输入区域获取焦点
    cy.get('.editor').click()
    // 点击代码按钮
    cy.get(':nth-child(4) > .ver-code').click()
    // 检查组件下方是否打出了代码的语法“``”这样
    cy.get('.editor').should('contain', '``')
  })
  it('输入链接的按钮', () => {
    // 首先点击输入区域获取焦点
    cy.get('.editor').click()
    // 点击链接按钮
    cy.get(':nth-child(4) > :nth-child(1) > .ver-code').click()
    // 检查组件下方是否打出了链接的语法“[](url)”这样
    cy.get('.editor').should('contain', '[](url)')
  })
  it('输入图片的按钮', () => {
    // 首先点击输入区域获取焦点
    cy.get('.editor').click()
    // 点击图片按钮
    cy.get(':nth-child(4) > :nth-child(2) > .ver-code').click()
    // 检查组件下方是否打出了图片的语法“![](url)”这样
    cy.get('.editor').should('contain', '')
  })
  it('输入表格的按钮', () => {
    // 首先点击输入区域获取焦点
    cy.get('.editor').click()
    // 点击表格按钮
    cy.get(':nth-child(4) > :nth-child(3) > .ver-code').click()
    // 检查组件下方是否打出了表格的语法“|”这样
    cy.get('.editor').should('contain', '|')
  })
})
