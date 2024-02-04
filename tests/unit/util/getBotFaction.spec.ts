import { expect } from 'chai'
import mockState from '../helper/mockState'
import Faction from '@/services/enum/Faction'
import getBotFaction from '@/util/getBotFaction'

describe('util/getBotFaction', () => {
  it('getBotFaction', () => {
    const state = mockState({botFactions:[Faction.EXODIAN,Faction.BORROKA]})

    expect(getBotFaction(state.setup.playerSetup, 1)).to.eq(Faction.EXODIAN)
    expect(getBotFaction(state.setup.playerSetup, 2)).to.eq(Faction.BORROKA)
    expect(getBotFaction(state.setup.playerSetup, 3)).to.eq(Faction.SAURA)
  })
})
