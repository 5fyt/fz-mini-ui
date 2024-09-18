import { epPackage, getPackageDependencies } from '@fz-mini/build-utils'
import type { OutputOptions, RollupBuild } from 'rollup'

//动态计算打包时排除哪些依赖包，减少打包体积
export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(epPackage)
  return (id: string) => {
    const packages: string[] = [...peerDependencies]
    if (!options.full) {
      packages.push('@vue', ...dependencies)
    }
    return [...new Set(packages)].some(
      (pkg) => id === pkg || id.startsWith(`${pkg}/`)
    )
  }
}

export async function writeBundles(
  bundle: RollupBuild,
  options: OutputOptions[]
) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

export function formatBundleFilename(
  name: string,
  minify: boolean,
  ext: string
) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}
