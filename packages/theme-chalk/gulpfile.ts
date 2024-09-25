import path from 'path'
import { Transform } from 'stream'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import { type TaskFunction, dest, parallel, series, src } from 'gulp'
import consola from 'consola'
import postcss from 'postcss'
import cssnano from 'cssnano'
import rename from 'gulp-rename'
import autoprefixer from 'gulp-autoprefixer'
import chalk from 'chalk'
import { epOutput } from '@fz-mini/build-utils'
import type Vinly from 'vinyl'

const buildFolder = path.resolve(__dirname, 'dist')
const buildBundle = path.resolve(epOutput, 'theme-chalk')

//使用 cssnano 对css进行压缩处理
function compressWithCssnano() {
  const processor = postcss([
    cssnano({
      preset: [
        'default',
        {
          colormin: false, //禁止压缩颜色
          minifyFontValues: false, //禁止压缩大小
        },
      ],
    }),
  ])
  // 对文件进行处理，处理文件的内容打印结果到控制台，并显示压缩后的文件大小
  return new Transform({
    objectMode: true,
    transform(chunk, _encoding, callback) {
      const file = chunk as Vinly
      if (file.isNull()) {
        callback(null, file)
        return
      }
      if (file.isStream()) {
        callback(new Error('Stream not supported'))
        return
      }

      //显示 压缩后的文件大小和压缩前的文件大小
      const cssString = file.contents!.toString()
      processor.process(cssString, { from: file.path }).then((result) => {
        const name = path.basename(file.path)
        file.contents = Buffer.from(result.css)
        consola.success(
          `${chalk.cyan(name)}:${chalk.yellow(
            cssString.length / 1000
          )} KB -> ${chalk.green(result.css.length / 1000)}`
        )
      })
      callback(null, file)
    },
  })
}

function buildThemeChalk() {
  const sass = gulpSass(dartSass)
  const noFzPrefixFile = /(index|base|display)/
  return src(path.resolve(__dirname, 'src/*.scss'))
    .pipe(sass.sync()) //将 .scss 文件同步编译成 .css
    .pipe(autoprefixer({ cascade: false })) //添加浏览器前缀
    .pipe(compressWithCssnano()) // 压缩 css 文件，减少打包体积
    .pipe(
      //如果文件名没有匹配正则，在文件中添加 fz- 前缀
      rename((path) => {
        if (!noFzPrefixFile.test(path.basename)) {
          path.basename = `fz-${path.basename}`
        }
      })
    )
    .pipe(dest(buildFolder))
}

export function copyThemeChalkBundle() {
  return src(path.resolve(buildFolder, '**/*')).pipe(dest(buildBundle))
}

export function copyThemeChalkSource() {
  return src(path.resolve(__dirname, 'src/**')).pipe(
    dest(path.resolve(buildBundle, 'src'))
  )
}

export const build: TaskFunction = parallel(
  copyThemeChalkSource,
  series(buildThemeChalk, copyThemeChalkBundle)
)

export default build
