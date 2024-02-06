import { expect } from 'chai'
import mockCycle from '../helper/mockCycle'
import mockState from '../helper/mockState'
import getBotCardDeck from '@/util/getBotCardDeck'

describe('util/getBotCardDeck', () => {
  it('cardDeck', () => {
    const state = mockState({cycles:[
      mockCycle({cycle:1, turns:[
        {cycle:1, turn:1, bot:1, action:1, botCardDeck:{deck:[1,2,3],discard:[],reserve:[]}},
        {cycle:1, turn:1, bot:1, action:2, botCardDeck:{deck:[1,2,3],discard:[],reserve:[10]}},
        {cycle:1, turn:1, bot:2, action:1, botCardDeck:{deck:[4,5,6],discard:[],reserve:[]}},
        {cycle:1, turn:1, bot:2, action:2, botCardDeck:{deck:[4,5,6],discard:[],reserve:[10]}},
        {cycle:1, turn:2, bot:1, action:1, botCardDeck:{deck:[2,3],discard:[1],reserve:[]}},
        {cycle:1, turn:2, bot:1, action:2, botCardDeck:{deck:[2,3],discard:[1],reserve:[10]}},
        {cycle:1, turn:2, bot:2, action:1, botCardDeck:{deck:[5,6],discard:[4],reserve:[]}},
        {cycle:1, turn:2, bot:2, action:2, botCardDeck:{deck:[5,6],discard:[4],reserve:[10]}},
        {cycle:1, turn:3, bot:1, action:1, botCardDeck:{deck:[3],discard:[2,1],reserve:[]}},
        {cycle:1, turn:3, bot:1, action:2, botCardDeck:{deck:[3],discard:[2,1],reserve:[10]}},
        {cycle:1, turn:3, bot:2, action:1, botCardDeck:{deck:[6],discard:[5,4],reserve:[]}},
        {cycle:1, turn:3, bot:2, action:2, botCardDeck:{deck:[6],discard:[5,4],reserve:[10]}},
      ]}),
      mockCycle({cycle:2, turns:[
        {cycle:2, turn:1, bot:1, action:1, botCardDeck:{deck:[],discard:[3,2,1],reserve:[]}},
        {cycle:2, turn:1, bot:1, action:2, botCardDeck:{deck:[],discard:[3,2,1],reserve:[10]}},
        {cycle:2, turn:1, bot:2, action:1, botCardDeck:{deck:[],discard:[6,5,4],reserve:[]}},
        {cycle:2, turn:1, bot:2, action:2, botCardDeck:{deck:[],discard:[6,5,4],reserve:[10]}},
      ]})
    ],
    initialBotCardDecks: [
      {deck:[1],discard:[],reserve:[]},
      {deck:[4],discard:[],reserve:[]}
    ]})
    // current cycle
    expect(getBotCardDeck(state, 1, 4, 1, 1).toPersistence()).to.eql({deck:[3],discard:[2,1],reserve:[10]})
    expect(getBotCardDeck(state, 1, 3, 1, 1).toPersistence()).to.eql({deck:[2,3],discard:[1],reserve:[10]})
    expect(getBotCardDeck(state, 1, 3, 1, 2).toPersistence()).to.eql({deck:[3],discard:[2,1],reserve:[]})
    expect(getBotCardDeck(state, 1, 2, 1, 1).toPersistence()).to.eql({deck:[1,2,3],discard:[],reserve:[10]})
    expect(getBotCardDeck(state, 1, 2, 1, 2).toPersistence()).to.eql({deck:[2,3],discard:[1],reserve:[]})
    // previous cycle
    expect(getBotCardDeck(state, 2, 1, 1, 1).toPersistence()).to.eql({deck:[3],discard:[2,1],reserve:[10]})
    // initial
    expect(getBotCardDeck(state, 1, 1, 1, 1).toPersistence()).to.eql({deck:[1],discard:[],reserve:[]})
    expect(getBotCardDeck(state, 1, 1, 2, 1).toPersistence()).to.eql({deck:[4],discard:[],reserve:[]})
  })
})
