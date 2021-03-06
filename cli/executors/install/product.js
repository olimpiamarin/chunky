const coreutils = require('coreutils')
const path = require('path')
const fs = require('fs-extra')

const generators = require('../../src/generators')

function update (name, template, data) {
  return Promise.all([generators.generateChunk('intro', 'intro', Object.assign({}, data, { name: 'intro'})),
    generators.generateChunk('posts', 'posts', Object.assign({}, data, { name: 'posts'})),
    generators.generateChunk('docs', 'docs', Object.assign({}, data, { name: 'docs'}))])
                    .then(() => generators.generateiOS(name, template, data))
                    .then(() => generators.generateAndroid(name, template, data))
                    .then(() => generators.generateWeb(name, template, data))
                    .then(() => generators.generateAssets(name, template, data))
                    .then(() => generators.generateCloud(name, template, data))
                    .then(() => generators.generateProvisioning(name, template, data))
                    .catch(e => coreutils.logger.fail(e.message))
}

function install () {
  const packageFile = path.resolve(process.cwd(), 'package.json')
  const chunkyFile = path.resolve(process.cwd(), 'chunky.json')

  if (!fs.existsSync(packageFile) && !fs.existsSync(chunkyFile)) {
    coreutils.logger.fail('The product is not initialized yet. Run chunky init first.')
    return Promise.resolve()
  }

  const main = require(packageFile)
  const chunky = require(chunkyFile)
  return update(chunky.name, chunky.template, { main, chunky, name: chunky.name, template: chunky.template })
}

module.exports = { install }
