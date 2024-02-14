import IconGlobResolver from '@/util/IconGlobResolver'
import { resolveIconReferencesWithGlobResolver } from '@/util/resolveIconReferences'
import { expect } from 'chai'

describe('util/resolveIconReferences', () => {
  it('name', async () => {
    const resolver = await IconGlobResolver.createResolved()
    const result : string = resolveIconReferencesWithGlobResolver('::artifact::', resolver)
    expect(result).to.include('/icons/artifact.svg')
  })

  it('type/name', async () => {
    const resolver = await IconGlobResolver.createResolved()
    const result : string = resolveIconReferencesWithGlobResolver('::damage/indirect::', resolver)
    expect(result).to.include('/icons/damage/indirect.svg')
  })

  it('multiple', async () => {
    const resolver = await IconGlobResolver.createResolved()
    const result : string = resolveIconReferencesWithGlobResolver('Apply 1 ::damage/indirect:: to ::artifact::', resolver)
    expect(result).to.include('/icons/artifact.svg')
    expect(result).to.include('/icons/damage/indirect.svg')
  })
})
