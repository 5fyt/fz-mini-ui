import type { OutputOptions, RollupBuild } from 'rollup'

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
