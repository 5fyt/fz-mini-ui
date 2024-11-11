import path from 'path'
import { copyFile, mkdir } from 'fs/promises'
import { copy } from 'fs-extra'
import { parallel, series } from 'gulp'

import {
  buildOutput,
  epOutput,
  epPackage,
  projRoot,
} from '@fz-mini/build-utils'
import { buildConfig, run, runTask, withTaskName } from './src'
import type { TaskFunction } from 'gulp'
import type { Module } from './src'

// 将根目录的 global.d.ts 和 README.md 文件复制到dist/fz-mini 目录下
export const copyFiles = () =>
  Promise.all([
    copyFile(epPackage, path.join(epOutput, 'package.json')),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(epOutput, 'README.md')
    ),
    copyFile(
      path.resolve(projRoot, 'global.d.ts'),
      path.resolve(epOutput, 'global.d.ts')
    ),
  ])
// 将打包好的 types 类型文件复制到 es , lib 文件夹对应的文件里
export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, 'types', 'packages')
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(src, buildConfig[module].output.path)
    )

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}

// 将打包的theme-chalk/index.css 拷贝到 dist 目录
export const copyFullStyle = async () => {
  await mkdir(path.resolve(epOutput, 'dist'), { recursive: true })
  await copyFile(
    path.resolve(epOutput, 'theme-chalk/index.css'),
    path.resolve(epOutput, 'dist/index.css')
  )
}
//执行 pnpm run start buildModules buildFullBundle generateTypesDefinitions 进行gulp任务并行执行，package.json 配置了start脚本
export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),

  parallel(
    runTask('buildModules'),
    runTask('buildFullBundle'),
    runTask('generateTypesDefinitions'),
    series(
      withTaskName('buildThemeChalk', () =>
        run('pnpm run -C packages/theme-chalk build')
      ),
      copyFullStyle
    )
  )

  // parallel(copyTypesDefinitions, copyFiles)
)
//导入模块 buildModules buildFullBundle
export * from './src'
