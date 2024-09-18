// import path from 'path'
import { mkdir } from 'fs/promises'
import { parallel, series } from 'gulp'
import {
  // buildOutput,
  epOutput,
  // epPackage,
  // projRoot,
} from '@fz-mini/build-utils'
import { run, runTask, withTaskName } from './src'
// import type { TaskFunction } from 'gulp'
// import type { Module } from './src'
export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),

  parallel(
    runTask('buildModules'),
    runTask('buildFullBundle'),
    runTask('generateTypesDefinitions')
  )
)
//导入模块 buildModules buildFullBundle
export * from './src'
