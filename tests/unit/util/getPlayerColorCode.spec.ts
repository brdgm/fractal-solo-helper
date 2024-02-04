import PlayerColor from '@/services/enum/PlayerColor'
import getPlayerColorCode from '@/util/getPlayerColorCode'
import { expect } from 'chai'

describe('util/getPlayerColorCode', () => {
  it('colorCode', () => {
    expect(getPlayerColorCode(PlayerColor.RED)).to.not.undefined
    expect(getPlayerColorCode(PlayerColor.BLUE)).to.not.undefined
    expect(getPlayerColorCode(PlayerColor.GREEN)).to.not.undefined
    expect(getPlayerColorCode(PlayerColor.YELLOW)).to.not.undefined
  })
})
