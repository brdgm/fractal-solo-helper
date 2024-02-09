import Technologies from '@/services/Technologies'
import Technology from '@/services/enum/Technology'
import { expect } from 'chai'

describe('services/Technologies', () => {
  it('persist-recreate', () => {
    const underTest = new Technologies()

    const civil = [Technology.LEVEL_1,Technology.LEVEL_1,Technology.LEVEL_5]
    const military = [Technology.LEVEL_2]

    civil.forEach(item => underTest.addCivil(item))
    military.forEach(item => underTest.addMilitary(item))

    const persistence = underTest.toPersistence()
    expect(persistence.civil).to.eql(civil)
    expect(persistence.military).to.eql(military)

    const fromPersistence = Technologies.fromPersistence(persistence)
    expect(fromPersistence.civil).to.eql(civil)
    expect(fromPersistence.military).to.eql(military)
  })

  it('total-cost', () => {
    const underTest = new Technologies(
      [Technology.LEVEL_1,Technology.LEVEL_1,Technology.LEVEL_5],
      [Technology.LEVEL_2, Technology.LEVEL_7]
    )

    expect(underTest.civilTotalCost).to.eql(7)
    expect(underTest.militaryTotalCost).to.eql(9)
  })
})
