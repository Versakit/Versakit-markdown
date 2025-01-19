#!/usr/bin/env node

// 导入 commander 包用于构建命令行界面
import { Command } from 'commander'
import inquirer from 'inquirer'
import { info } from './cmd/info'
import { exec } from 'child_process'
import path from 'path'

/**
 * @author Jannik
 * @param {*} book
 * @returns
 */
function getCommandForBook(book) {
  return new Promise((resolve, reject) => {
    switch (book) {
      case '红楼梦':
        exec('pnpm play:dev', (error, stdout, stderr) => {
          if (error) {
            console.error(`执行命令时出错: ${error.message}`)
            return reject(error)
          }
          if (stderr) {
            console.error(`stderr: ${stderr}`)
            return reject(new Error(stderr))
          }
          console.log(`stdout: ${stdout}`)
          resolve(stdout)
        })
        break
      case '西游记':
      case '水浒传':
      case '三国演义':
      default:
        reject(new Error('未找到匹配的命令'))
    }
  })
}

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
      try {
        const answer = await inquirer.prompt([
          {
            type: 'list',
            name: 'book',
            message: '请选择一本书籍',
            choices: books,
          },
        ])
        // 切换到项目根目录
        const projectRoot = path.resolve(__dirname, '..', '..')
        console.log(`切换到项目根目录: ${projectRoot}`)
        process.chdir(projectRoot)

        await getCommandForBook(answer.book)
      } catch (error) {
        console.error(`发生错误: ${error.message}`)
      }
    })

  program.parse(process.argv)
}

main()
