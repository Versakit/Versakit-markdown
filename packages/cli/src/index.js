#!/usr/bin/env node

// 导入 commander 包用于构建命令行界面
import { Command } from 'commander'
import inquirer from 'inquirer'
import { info } from './cmd/info'

function main() {
  const program = new Command()

  program
    .name('v')
    .description('Versakit MarkDown命令行工具')
    .version('0.0.1')
    .action(() => {
      info()
    })

  program
    .command('list')
    .description('显示书籍列表')
    .action(async () => {
      const books = ['红楼梦', '西游记', '水浒传', '三国演义']
      await inquirer.prompt([
        {
          type: 'list',
          name: 'book',
          message: '请选择一本书籍',
          choices: books,
        },
      ])
    })

  program.parse(process.argv)
}

main()
