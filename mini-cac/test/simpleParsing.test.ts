import { test, expect } from 'vitest'
import { cac } from '../src'

const cli = cac()

cli.option('--type <type>', 'choose a project type', {
  default: 'node',
})

const parsed = cli.parse()

test('simpleParsing', () => {
  expect(parsed).toEqual({ args: [], options: { '--': [], type: 'node' } })
})
