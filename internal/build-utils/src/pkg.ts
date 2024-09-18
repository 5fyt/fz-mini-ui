import type { ProjectManifest } from '@pnpm/types'
//获取packages/fz-mini/package.json 所有配置项
export const getPackageManifest = (pkgPath: string) => {
  return require(pkgPath) as ProjectManifest
}
//获取 package.json 中的dependencies 和 peerDependenices 的全部键名
export const getPackageDependencies = (
  pkgPath: string
): Record<'dependencies' | 'peerDependencies', string[]> => {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest
  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}
//过滤参数中的node_modules,gulpfile,dist 目录
export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'gulpfile', 'dist']
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  )
}
