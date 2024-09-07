import path from 'path'
import { epOutput } from '@fz-mini/build-utils'
import { PKG_NAME } from '@fz-mini/build-constants'
import type { ModuleFormat } from 'rollup'

export const modules = ['esm', 'cjs'] as const
export type Module = (typeof modules)[number]
export interface buildInfo {
  module: 'ESNext' | 'CommonJs'
  format: ModuleFormat
  ext: 'mjs' | 'js' | 'cjs'
  output: {
    /** e.g:`dist/fz-mini/es `  */
    path: string
    /** e.g: `es` */
    name: string
  }
  bundle: {
    /** e.g:`fz-mini/es` */
    path: string
  }
}
export const buildConfig: Record<Module, buildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(epOutput, 'es'),
    },
    bundle: {
      path: `${PKG_NAME}/es`,
    },
  },
  cjs: {
    module: 'CommonJs',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(epOutput, 'lib'),
    },
    bundle: {
      path: `${PKG_NAME}/lib`,
    },
  },
}
export const buildConfigEntries = Object.entries(
  buildConfig
) as BuildConfigEntries
export type BuildConfigEntries = [Module, buildInfo][]
export const target = 'es2018'
