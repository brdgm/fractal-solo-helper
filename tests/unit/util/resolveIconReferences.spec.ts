import resolveIconReferences from '@/util/resolveIconReferences'
import { expect } from 'chai'

describe('util/resolveIconReferences', () => {
  it('name', async () => {
    const result : string = await resolveIconReferences('::artifact::')
    expect(result).to.eq('<img src="/fractal/src/assets/icons/artifact.svg" draggable="false" alt=""/>')
  })

  it('type/name', async () => {
    const result : string = await resolveIconReferences('::damage/indirect::')
    expect(result).to.eq('<img src="/fractal/src/assets/icons/damage/indirect.svg" draggable="false" alt=""/>')
  })

  it('invalid', async () => {
    const result : string = await resolveIconReferences('::invalid::')
    expect(result).to.eq('::invalid::')
  })

  it('multiple', async () => {
    const result : string = await resolveIconReferences('Apply 1 ::damage/indirect:: to '
      + '::artifact:: to avoid ::invalid::')
    expect(result).to.eq('Apply 1 <img src="/fractal/src/assets/icons/damage/indirect.svg" draggable="false" alt=""/> to '
      + '<img src="/fractal/src/assets/icons/artifact.svg" draggable="false" alt=""/> to avoid ::invalid::')
  })
})
