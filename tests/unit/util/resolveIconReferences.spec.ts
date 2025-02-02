import IconGlobResolver from '@/util/IconGlobResolver'
import { resolveIconReferencesWithGlobResolver } from '@/util/resolveIconReferences'
import { expect } from 'chai'

// do not check actual URLs here, SVGs may be inlined
describe('util/resolveIconReferences', () => {
  it('name', async () => {
    const resolver = await IconGlobResolver.createResolved()
    const result : string = resolveIconReferencesWithGlobResolver('::artifact::', resolver)
    expect(result).to.contains('svg')
  })

  it('type/name', async () => {
    const resolver = await IconGlobResolver.createResolved()
    const result : string = resolveIconReferencesWithGlobResolver('::damage/indirect::', resolver)
    expect(result).to.contains('svg')
  })

  it('multiple', async () => {
    const resolver = await IconGlobResolver.createResolved()
    const result : string = resolveIconReferencesWithGlobResolver('Apply 1 ::damage/indirect:: to ::artifact::', resolver)
    expect(result).to.contains('svg')
  })
})
