import resolveIconReferences from '@/util/resolveIconReferences'
import { expect } from 'chai'

describe('util/resolveIconReferences', () => {
  it('name', () => {
    const result : string = resolveIconReferences('::artifact::')
    expect(result).to.include('/icons/artifact.svg')
  })

  it('type/name', () => {
    const result : string = resolveIconReferences('::damage/indirect::')
    expect(result).to.include('/icons/damage/indirect.svg')
  })

  it('multiple', () => {
    const result : string = resolveIconReferences('Apply 1 ::damage/indirect:: to ::artifact::')
    expect(result).to.include('/icons/artifact.svg')
    expect(result).to.include('/icons/damage/indirect.svg')
  })
})
