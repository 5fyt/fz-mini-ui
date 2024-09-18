import { resolve } from 'path'

//项目根路径
export const projRoot = resolve(__dirname, '..', '..', '..')
//packages 包路径
export const pkgRoot = resolve(projRoot, 'packages')
//components 组件路径
export const compRoot = resolve(pkgRoot, 'components')
//dist input打包输入路径
export const epRoot = resolve(pkgRoot, 'fz-mini')
//打包根目录
export const buildRoot = resolve(projRoot, 'internal', 'build')

//dist 打包目录
export const buildOutput = resolve(projRoot, 'dist')
export const epOutput = resolve(buildOutput, 'fz-mini')

//package 目录
export const epPackage = resolve(epRoot, 'package.json')
