import { describe, expect, it } from 'vitest'
import { generateApi } from '../src/langs/web/generate'

describe('generateApi', () => {
  it('should generate api', async () => {
    const res = await generateApi('http://lm:1316/v3/api-docs', 'test/outDir')
    expect(res).toMatchSnapshot()
  })
})
