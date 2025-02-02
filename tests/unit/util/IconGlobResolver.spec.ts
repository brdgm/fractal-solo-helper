import IconGlobResolver from '@/util/IconGlobResolver'
import { expect } from 'chai'

describe('util/IconGlobResolver', () => {
  it('name', async () => {
    const resolver = await IconGlobResolver.createResolved()
    // do not check actual URLs here, SVGs may be inlined
    expect(resolver.getUrl('artifact.svg')?.toString()).to.contains('svg')
    expect(resolver.getUrl('damage/direct.svg')?.toString()).to.contains('svg')
  })
})
