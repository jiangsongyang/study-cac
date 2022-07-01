const cli = require('cac')()

cli.option('--type <type>', 'choose a project type', {
  default: 'node',
})

const parsed = cli.parse()

console.log(JSON.stringify(parsed, null, 2))
