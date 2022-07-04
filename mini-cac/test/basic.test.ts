import { expect, test } from 'vitest'
import { happyPath } from '../src'

test('happy path', () => {
  expect(happyPath()).toBe('happyPath')
})
