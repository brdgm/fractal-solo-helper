import IconGlobResolver from '@/util/IconGlobResolver'
import { expect } from 'chai'

describe('util/IconGlobResolver', () => {
  it('name', async () => {
    const resolver = await IconGlobResolver.createResolved()
    expect(resolver.getUrl('artifact.svg')?.toString()).to.eq('/fractal/src/assets/icons/artifact.svg')
    expect(resolver.getUrl('damage/direct.svg')?.toString()).to.eq('/fractal/src/assets/icons/damage/direct.svg')
  })
})
