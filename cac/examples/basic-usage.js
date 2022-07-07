require('ts-node/register')
const cac = require('../src/index').cac

const cli = cac()

cli.option('--type [type]', 'Choose a project type')

const parsed = cli.parse()

console.log(JSON.stringify(parsed, null, 2))
