import { buildRoot } from '@fz-mini/build-utils'
import { run } from './process'

import type { TaskFunction } from 'gulp'
//为匿名函数或不知名函数添加标识，方便调试和日志追踪
export const withTaskName = <T extends TaskFunction>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name })

export const runTask = (name: string) =>
  withTaskName(`shellTask:${name}`, () =>
    run(`pnpm run start ${name}`, buildRoot)
  )
