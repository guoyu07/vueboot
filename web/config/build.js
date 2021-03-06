'use strict'
require('./check-versions')()

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
process.env.ENV_TYPE = process.env.ENV_TYPE ? process.env.ENV_TYPE : 'standard';

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('./index')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('Building for production [type=' + process.env.ENV_TYPE + ']...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
  })
})
