import path from 'path'
import { mkdir, readFile, writeFile } from 'fs/promises'
import { OutputFile, Project } from 'ts-morph'
import consola from 'consola'
import * as vueCompiler from 'vue/compiler-sfc'
import glob from 'fast-glob'
import {
  buildOutput,
  epRoot,
  excludeFiles,
  pkgRoot,
  projRoot,
} from '@fz-mini/build-utils'
import { CompilerOptions, SourceFile } from 'ts-morph'
import chalk from 'chalk'
import { pathRewriter } from '../utils'
const TSCONFIG_PATH = path.resolve(projRoot, 'tsconfig.web.json')
const outDir = path.resolve(buildOutput, 'types')

//生成 vue,ts,js,jsx,tsx 文件的ts类型声明
export const generateTypesDefinitions = async () => {
  // ts-morph 中compilerOptions 配置项
  const compilerOptions: CompilerOptions = {
    emitDeclarationOnly: true, //是否只输出类型文件 .d.ts
    outDir,
    baseUrl: projRoot,
    preserveSymlinks: true, //以确保不同项目依赖同一个符号链接路径，而不会重复加载同一个模块。
    skipLibCheck: true, // 跳过.d.ts类型声明文件的类型检查。这样可以加快编译速度
    noImplicitAny: false, // 是否允许隐式声明 any 类型了
  }
  //初始化 创建类型声明
  const project = new Project({
    compilerOptions,
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  })

  //根据不同文件类型生成类型文件
  const sourceFiles = await addSourceFiles(project)
  consola.success('Added source files')

  typeCheck(project)
  consola.success('Type check passed!')

  await project.emit({
    emitOnlyDtsFiles: true,
  })

  const tasks = sourceFiles.map(async (sourceFile) => {
    //获取当前文件路径
    const relativePath = path.relative(pkgRoot, sourceFile.getFilePath())

    // 打印出每个生成 .d.ts 文件相对路径
    consola.trace(
      chalk.yellow(`Generating definition for file:${chalk.bold(relativePath)}`)
    )
    const emitOutput = sourceFile.getEmitOutput()
    //返回生成的输出文件列表
    const emitFiles = emitOutput.getOutputFiles()

    if (emitFiles.length === 0) {
      throw new Error(`Emit no file:${chalk.bold(relativePath)} `)
    }

    //对于每个输出文件将文件，创建目标目录并将文件写入磁盘
    const subTasks = emitFiles.map(async (outputFile) => {
      const filepath = outputFile.getFilePath()
      await mkdir(path.dirname(filepath), {
        recursive: true,
      })

      await writeFile(
        filepath,
        pathRewriter('esm')(outputFile.getText()),
        'utf8'
      )
      consola.success(
        chalk.green(
          `Definition for file:${chalk.bold(relativePath)} gengerated`
        )
      )
    })
    await Promise.all(subTasks)
  })
  await Promise.all(tasks)
}

async function addSourceFiles(project: Project) {
  // 为 tyings/env.d.ts 生成.d.ts 文件
  project.addSourceFileAtPath(path.resolve(projRoot, 'typings/env.d.ts'))
  const globSourceFile = '**/*.{js?(x),ts?(x),vue}'

  //获取packages 文件下所有的文件路径，排除fz-mini目录及子目录文件
  const filePaths = excludeFiles(
    await glob([globSourceFile, '!fz-mini/**/*'], {
      cwd: pkgRoot,
      absolute: true, //返回绝对路径
      onlyFiles: true, //仅返回文件不返回目录
    })
  )

  // 获取 packages/fz-mini 文件下所有文件路径
  const epPaths = excludeFiles(
    await glob(globSourceFile, {
      cwd: epRoot,
      onlyFiles: true,
    })
  )

  //返回所有的生成的 .d.ts 文件
  const sourceFiles: SourceFile[] = []

  await Promise.all([
    //处理 packages下的文件，除了packages/fz-mini
    ...filePaths.map(async (file) => {
      //匹配到 vue 文件，为vue 文件手动指定类型声明
      if (file.endsWith('.vue')) {
        const content = await readFile(file, 'utf-8')

        // 文件中是否包含 @ts-nocheck
        const hasTsNoCheck = content.includes('@ts-nocheck')

        //解析 vue 中的content 解析出 template、script、styles
        const sfc = vueCompiler.parse(content)

        const { script, scriptSetup } = sfc.descriptor
        if (script || scriptSetup) {
          // 有 @ts-nocheck 注释 需要额外添加上
          let content =
            (hasTsNoCheck ? '// @ts-nocheck\n' : '') + (script?.content ?? '')

          //判断 vue 文件中是否有 setup 语法糖
          if (scriptSetup) {
            // 通过 vueCompiler.compileScript 来编译setup 的内容转成普通的 script 代码
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx',
            })
            // 追加 编译的内容
            content += compiled.content
          }
          const lang = scriptSetup?.lang || script?.lang || 'js'

          //获取当前文件相对于当前工作目录的相对路径，再把合并的content 生成 类型文件
          const sourceFile = project.createSourceFile(
            `${path.relative(process.cwd(), file)}.${lang}`,
            content
          )
          sourceFiles.push(sourceFile)
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    }),
    ...epPaths.map(async (file) => {
      const content = await readFile(path.resolve(epRoot, file), 'utf-8')
      sourceFiles.push(
        project.createSourceFile(path.resolve(pkgRoot, file), content)
      )
    }),
  ])
  return sourceFiles
}

function typeCheck(project: Project) {
  const diagnostics = project.getPreEmitDiagnostics()
  if (diagnostics.length > 0) {
    consola.error(project.formatDiagnosticsWithColorAndContext(diagnostics))
    const err = new Error('Failed to generate dts.')
    consola.error(err)
    throw err
  }
}
