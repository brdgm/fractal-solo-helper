import resolveIconReferences from '@/util/resolveIconReferences'
import { expect } from 'chai'

describe('util/resolveIconReferences', () => {
  it('name', () => {
    const result : string = resolveIconReferences('::artifact::')
    expect(result).to.eq(`<img src="${url('/src/assets/icons/artifact.svg')}" draggable="false" alt=""/>`)
  })

  it('type/name', () => {
    const result : string = resolveIconReferences('::damage/indirect::')
    expect(result).to.eq(`<img src="${url('/src/assets/icons/damage/indirect.svg')}" draggable="false" alt=""/>`)
  })

  it('multiple', () => {
    const result : string = resolveIconReferences('Apply 1 ::damage/indirect:: to ::artifact::')
    expect(result).to.eq(`Apply 1 <img src="${url('/src/assets/icons/damage/indirect.svg')}" draggable="false" alt=""/> to `
      + `<img src="${url('/src/assets/icons/artifact.svg')}" draggable="false" alt=""/>`)
  })
})

function url(path: string) {
  return new URL(path, import.meta.url).toString()
}