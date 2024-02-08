import { expect } from 'chai'
import mockCycle from '../helper/mockCycle'
import mockState from '../helper/mockState'
import getBotActions from '@/util/getBotActions'

describe('util/getBotActions', () => {
  it('cardDeck', () => {
    const state = mockState({cycles:[
      mockCycle({cycle:1, turns:[
        {cycle:1, turn:1, bot:1, action:1, botActions:{cardDeck:{deck:[1,2,3],discard:[],reserve:[]},technologies:{civil:[],military:[]}}},
        {cycle:1, turn:1, bot:1, action:2, botActions:{cardDeck:{deck:[1,2,3],discard:[],reserve:[10]},technologies:{civil:[],military:[]}}},
        {cycle:1, turn:1, bot:2, action:1, botActions:{cardDeck:{deck:[4,5,6],discard:[],reserve:[]},technologies:{civil:[],military:[]}}},
        {cycle:1, turn:1, bot:2, action:2, botActions:{cardDeck:{deck:[4,5,6],discard:[],reserve:[10]},technologies:{civil:[],military:[]}}},
        {cycle:1, turn:2, bot:1, action:1, botActions:{cardDeck:{deck:[2,3],discard:[1],reserve:[]},technologies:{civil:[],military:[]}}},
        {cycle:1, turn:2, bot:1, action:2, botActions:{cardDeck:{deck:[2,3],discard:[1],reserve:[10]},technologies:{civil:[],military:[]}}},
        {cycle:1, turn:2, bot:2, action:1, botActions:{cardDeck:{deck:[5,6],discard:[4],reserve:[]},technologies:{civil:[],military:[]}}},
        {cycle:1, turn:2, bot:2, action:2, botActions:{cardDeck:{deck:[5,6],discard:[4],reserve:[10]},technologies:{civil:[],military:[]}}},
        {cycle:1, turn:3, bot:1, action:1, botActions:{cardDeck:{deck:[3],discard:[2,1],reserve:[]},technologies:{civil:[],military:[]}}},
        {cycle:1, turn:3, bot:1, action:2, botActions:{cardDeck:{deck:[3],discard:[2,1],reserve:[10]},technologies:{civil:[],military:[]}}},
        {cycle:1, turn:3, bot:2, action:1, botActions:{cardDeck:{deck:[6],discard:[5,4],reserve:[]},technologies:{civil:[],military:[]}}},
        {cycle:1, turn:3, bot:2, action:2, botActions:{cardDeck:{deck:[6],discard:[5,4],reserve:[10]},technologies:{civil:[],military:[]}}},
      ]}),
      mockCycle({cycle:2, turns:[
        {cycle:2, turn:1, bot:1, action:1, botActions:{cardDeck:{deck:[],discard:[3,2,1],reserve:[]},technologies:{civil:[],military:[]}}},
        {cycle:2, turn:1, bot:1, action:2, botActions:{cardDeck:{deck:[],discard:[3,2,1],reserve:[10]},technologies:{civil:[],military:[]}}},
        {cycle:2, turn:1, bot:2, action:1, botActions:{cardDeck:{deck:[],discard:[6,5,4],reserve:[]},technologies:{civil:[],military:[]}}},
        {cycle:2, turn:1, bot:2, action:2, botActions:{cardDeck:{deck:[],discard:[6,5,4],reserve:[10]},technologies:{civil:[],military:[]}}},
      ]})
    ],
    initialBotCardDecks: [
      {deck:[1],discard:[],reserve:[]},
      {deck:[4],discard:[],reserve:[]}
    ]})
    // current cycle
    expect(getBotActions(state, 1, 4, 1, 1).cardDeck.toPersistence()).to.eql({active:3,deck:[],discard:[2,1],reserve:[10]})
    expect(getBotActions(state, 1, 3, 1, 1).cardDeck.toPersistence()).to.eql({active:2,deck:[3],discard:[1],reserve:[10]})
    expect(getBotActions(state, 1, 3, 1, 2).cardDeck.toPersistence()).to.eql({deck:[3],discard:[2,1],reserve:[]})
    expect(getBotActions(state, 1, 2, 1, 1).cardDeck.toPersistence()).to.eql({active:1,deck:[2,3],discard:[],reserve:[10]})
    expect(getBotActions(state, 1, 2, 1, 2).cardDeck.toPersistence()).to.eql({deck:[2,3],discard:[1],reserve:[]})
    // previous cycle
    const cardDeckNewCycle = getBotActions(state, 2, 1, 1, 1).cardDeck.toPersistence()
    expect(cardDeckNewCycle.active).to.not.undefined
    expect(cardDeckNewCycle.deck.length).to.eq(2)
    expect(cardDeckNewCycle.discard.length).to.eq(0)
    expect(cardDeckNewCycle.reserve.length).to.eq(1)
    // initial
    expect(getBotActions(state, 1, 1, 1, 1).cardDeck.toPersistence()).to.eql({active:1,deck:[],discard:[],reserve:[]})
    expect(getBotActions(state, 1, 1, 2, 1).cardDeck.toPersistence()).to.eql({active:4,deck:[],discard:[],reserve:[]})
  })
})
