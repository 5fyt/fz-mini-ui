import { spawn } from 'child_process'
import chalk from 'chalk'
import consola from 'consola'
import { projRoot } from '@fz-mini/build-utils'

//在nodejs 进程中开启子进程，以便自动执行系统命令
export const run = async (command: string, cwd: string = projRoot) =>
  new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(' ') // command => pnpm run clean - cmd:pnpm ...arg ['run','clean']
    consola.info(`run: ${chalk.green(`${cmd} ${args.join(' ')}`)}`)
    //
    const app = spawn(cmd, args, {
      cwd, //当前工作目录
      stdio: 'inherit', //输出标准流按照父进程，输出在主进程控制台显示信息
      shell: process.platform === 'win32',
    })

    const onProcessExit = () => app.kill('SIGHUP')
    //子进程结束时触发，code!==0 时抛出异常
    app.on('close', (code) => {
      process.removeListener('exit', onProcessExit)

      if (code === 0) resolve()
      else
        reject(
          new Error(`Command failed. \n Command: ${command} \n Code: ${code}`)
        )
    })
    //主进程退出时触发，杀死子进程，在主进程退出时用来清理子进程
    process.on('exit', onProcessExit)
  })
