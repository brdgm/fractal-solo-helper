import { expect } from 'chai'
import mockCycle from '../helper/mockCycle'
import mockState from '../helper/mockState'
import getBotsActions from '@/util/getBotsActions'
import { BotActionsPersistence, CardDeckPersistence } from '@/store/state'
import Technology from '@/services/enum/Technology'

describe('util/getBotsActions', () => {
  it('cardDeck', () => {
    const state = mockState({playerCount:1, botCount:2, cycles:[
      mockCycle({cycle:1, turns:[
        {stateIndex: 10, cycle:1, turn:1, player:1,        botsActions:[botAct(dck(1,[2,3,4],[])),   botAct(dck(5,[6,7,8],[]))]},
        {stateIndex: 21, cycle:1, turn:1, bot:1, action:1, botsActions:[botAct(dck(2,[3,4],[1],1)),  botAct(dck(5,[6,7,8],[],1))]},
        {stateIndex: 22, cycle:1, turn:1, bot:1, action:2, botsActions:[botAct(dck(2,[3,4],[1],2)),  botAct(dck(5,[6,7,8],[],2))]},
        {stateIndex: 31, cycle:1, turn:1, bot:2, action:1, botsActions:[botAct(dck(2,[3,4],[1],1)),  botAct(dck(6,[7,8],[5],1))]},
        {stateIndex: 32, cycle:1, turn:1, bot:2, action:2, botsActions:[botAct(dck(2,[3,4],[1],2)),  botAct(dck(6,[7,8],[5],2))]},
        {stateIndex: 40, cycle:1, turn:2, player:1,        botsActions:[botAct(dck(2,[3,4],[1])),    botAct(dck(6,[7,8],[5]))]},
        {stateIndex: 51, cycle:1, turn:2, bot:1, action:1, botsActions:[botAct(dck(3,[4],[2,1],1)),  botAct(dck(6,[7,8],[5],1))]},
        {stateIndex: 52, cycle:1, turn:2, bot:1, action:2, botsActions:[botAct(dck(3,[4],[2,1],2)),  botAct(dck(6,[7,8],[5],2))]},
        {stateIndex: 61, cycle:1, turn:2, bot:2, action:1, botsActions:[botAct(dck(3,[4],[2,1],1)),  botAct(dck(7,[8],[6,5],1))]},
        {stateIndex: 62, cycle:1, turn:2, bot:2, action:2, botsActions:[botAct(dck(3,[4],[2,1],2)),  botAct(dck(7,[8],[6,5],2))]},
        {stateIndex: 70, cycle:1, turn:3, player:1,        botsActions:[botAct(dck(3,[4],[2,1])),    botAct(dck(7,[8],[6,5]))]},
        {stateIndex: 81, cycle:1, turn:3, bot:1, action:1, botsActions:[botAct(dck(4,[],[3,2,1],1)), botAct(dck(7,[8],[6,5],1))]},
        {stateIndex: 82, cycle:1, turn:3, bot:1, action:2, botsActions:[botAct(dck(4,[],[3,2,1],2)), botAct(dck(7,[8],[6,5],2))]},
        {stateIndex: 91, cycle:1, turn:3, bot:2, action:1, botsActions:[botAct(dck(4,[],[3,2,1],1)), botAct(dck(8,[],[7,6,5],1))]},
        {stateIndex: 92, cycle:1, turn:3, bot:2, action:2, botsActions:[botAct(dck(4,[],[3,2,1],2)), botAct(dck(8,[],[7,6,5],2))]},
      ]}),
      mockCycle({cycle:2, turns:[
        {stateIndex: 10, cycle:2, turn:1, player:1,        botsActions:[botAct(dck(4,[3,2,1],[])),   botAct(dck(8,[7,6,5],[]))]},
        {stateIndex: 21, cycle:2, turn:1, bot:1, action:1, botsActions:[botAct(dck(3,[2,1],[4],1)),  botAct(dck(8,[7,6,5],[],1))]},
        {stateIndex: 21, cycle:2, turn:1, bot:1, action:2, botsActions:[botAct(dck(3,[2,1],[4],2)),  botAct(dck(8,[7,6,5],[],2))]},
        {stateIndex: 31, cycle:2, turn:1, bot:2, action:1, botsActions:[botAct(dck(3,[2,1],[4],1)),  botAct(dck(7,[6,5],[8],1))]},
        {stateIndex: 32, cycle:2, turn:1, bot:2, action:2, botsActions:[botAct(dck(3,[2,1],[4],2)),  botAct(dck(7,[6,5],[8],2))]},
        {stateIndex: 40, cycle:2, turn:2, player:1,        botsActions:[botAct(dck(3,[2,1],[4])),    botAct(dck(7,[6,5],[8]))]},
        {stateIndex: 51, cycle:2, turn:2, bot:1, action:1, botsActions:[botAct(dck(2,[1],[3,4],1)),  botAct(dck(7,[6,5],[8],1))]},
        {stateIndex: 52, cycle:2, turn:2, bot:1, action:2, botsActions:[botAct(dck(2,[1],[3,4],2)),  botAct(dck(7,[6,5],[8],2))]},
        {stateIndex: 61, cycle:2, turn:2, bot:2, action:1, botsActions:[botAct(dck(2,[1],[3,4],1)),  botAct(dck(6,[5],[7,8],1))]},
        {stateIndex: 62, cycle:2, turn:2, bot:2, action:2, botsActions:[botAct(dck(2,[1],[3,4],2)),  botAct(dck(6,[5],[7,8],2))]},
      ],
      conflictPhase: {cycle:1, botsActions:[botAct(dck(2,[1],[3,4],3)), botAct(dck(6,[5],[7,8],3))]},
      cycleEnd: {cycle:1, botsActions:[botAct(dck(2,[1],[3,4],4)), botAct(dck(6,[5],[7,8],4))]}
      })
    ],
    initialBotCardDecks: [
      dck(2, [4,6], []),
      dck(8, [10], [])
    ],
    initialBotTechnologies: [
      {civil:[Technology.LEVEL_2],military:[]},
      {civil:[],military:[]}
    ]})

    // current cycle
    expect(getBotsActions(state, 1, 111 /* turn 4, bot 1, action 1 */)[0].cardDeck.toPersistence()).to.eql(dck(4,[],[3,2,1],2))
    expect(getBotsActions(state, 1, 81  /* turn 3, bot 1, action 1 */)[0].cardDeck.toPersistence()).to.eql(dck(3,[4],[2,1]))
    expect(getBotsActions(state, 1, 82  /* turn 3, bot 1, action 2 */)[0].cardDeck.toPersistence()).to.eql(dck(4,[],[3,2,1],1))
    expect(getBotsActions(state, 1, 51  /* turn 2, bot 1, action 1 */)[0].cardDeck.toPersistence()).to.eql(dck(2,[3,4],[1]))
    expect(getBotsActions(state, 1, 52  /* turn 2, bot 1, action 2 */)[0].cardDeck.toPersistence()).to.eql(dck(3,[4],[2,1],1))
    // previous cycle, last step
    let cardDeckNewCycle = getBotsActions(state, 2, 10  /* turn 1, player 1 */)[0].cardDeck.toPersistence()
    expect(cardDeckNewCycle.active).to.not.undefined
    expect(cardDeckNewCycle.deck.length).to.eq(3)
    expect(cardDeckNewCycle.discard.length).to.eq(0)
    expect(cardDeckNewCycle.reserve).to.eql([2])
    // previous cycle, cycle end
    cardDeckNewCycle = getBotsActions(state, 3, 10  /* turn 1, player 1 */)[0].cardDeck.toPersistence()
    expect(cardDeckNewCycle.active).to.not.undefined
    expect(cardDeckNewCycle.deck.length).to.eq(3)
    expect(cardDeckNewCycle.discard.length).to.eq(0)
    expect(cardDeckNewCycle.reserve).to.eql([4])
    // current cycle, conflict phase
    expect(getBotsActions(state, 2, 0, true)[0].cardDeck.toPersistence()).to.eql(dck(2,[1],[3,4],3))
    // current cycle, cycle end
    expect(getBotsActions(state, 2, 0, true, true)[0].cardDeck.toPersistence()).to.eql(dck(2,[1],[3,4],4))
    // initial
    expect(getBotsActions(state, 1, 10  /* turn 1, player 1 */)[0].cardDeck.toPersistence()).to.eql(dck(2, [4,6], []))
    expect(getBotsActions(state, 1, 10  /* turn 1, player 1 */)[0].technologies.toPersistence()).to.eql({civil:[Technology.LEVEL_2],military:[]})
    expect(getBotsActions(state, 1, 10  /* turn 1, player 1 */)[1].cardDeck.toPersistence()).to.eql(dck(8, [10], []))
    expect(getBotsActions(state, 1, 10  /* turn 1, player 1 */)[1].technologies.toPersistence()).to.eql({civil:[],military:[]})
  })
})

function dck(active: number|undefined, deck: number[], discard: number[], action : number = 10) : CardDeckPersistence {
  // put action number as "marker" in reserve, this is not a card number
  return {active, deck, discard, reserve:[action], gainProtocolCardReasons:[]}
}

function botAct(cardDeck: CardDeckPersistence) : BotActionsPersistence {
  return {cardDeck, technologies:{civil:[],military:[]}}
}
