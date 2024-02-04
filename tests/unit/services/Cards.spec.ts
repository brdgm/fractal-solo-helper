import Cards from '@/services/Cards'
import { expect } from 'chai'

describe('services/Cards', () => {
  it('get', () => {
    const card = Cards.get(1)

    expect(card).not.undefined
    expect(card?.id).to.eq(1)
  })

  it('getAll', () => {
    const normalCards = Cards.getAll()
    expect(normalCards.length).eq(1)
  })
})
