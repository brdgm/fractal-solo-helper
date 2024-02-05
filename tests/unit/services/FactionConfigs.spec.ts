import FactionConfigs from '@/services/FactionConfigs'
import Faction from '@/services/enum/Faction'
import { expect } from 'chai'

describe('services/FactionConfigs', () => {
  it('get', () => {
    const factionConfig = FactionConfigs.get(Faction.TXINGUR)

    expect(factionConfig).not.undefined
    expect(factionConfig?.faction).to.eq(Faction.TXINGUR)
  })
})
