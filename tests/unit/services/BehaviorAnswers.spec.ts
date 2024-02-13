import BehaviorAnswers from '@/services/BehaviorAnswers'
import { expect } from 'chai'

describe('services/BehaviorAnswers', () => {
  it('initial', () => {
    const answers = new BehaviorAnswers()

    for (let i = 0; i <= 2; i++) {
      expect(answers.isYes(i)).to.false
      expect(answers.isNo(i)).to.false
      expect(answers.isAnswered(i)).to.false
    }
  })

  it('set', () => {
    const answers = new BehaviorAnswers()

    answers.yes(0)
    answers.no(1)
    answers.yes(2)

    expect(answers.isYes(0)).to.true
    expect(answers.isNo(0)).to.false
    expect(answers.isAnswered(0)).to.true
    expect(answers.isYes(1)).to.false
    expect(answers.isNo(1)).to.true
    expect(answers.isAnswered(1)).to.true
    expect(answers.isYes(2)).to.true
    expect(answers.isNo(2)).to.false
    expect(answers.isAnswered(2)).to.true
  })

  it('set-clear-deeper-levels', () => {
    const answers = new BehaviorAnswers()

    answers.yes(0)
    answers.no(1)
    answers.yes(2)
    answers.no(0)  // this should clear answers to levels > 0

    expect(answers.isYes(0)).to.false
    expect(answers.isNo(0)).to.true
    expect(answers.isAnswered(0)).to.true
    for (let i = 1; i <= 2; i++) {
      expect(answers.isYes(i)).to.false
      expect(answers.isNo(i)).to.false
      expect(answers.isAnswered(i)).to.false
    }
  })

  it('reset', () => {
    const answers = new BehaviorAnswers()

    answers.yes(0)
    answers.no(1)
    answers.yes(2)
    answers.reset()  // removes all answers

    for (let i = 0; i <= 2; i++) {
      expect(answers.isYes(i)).to.false
      expect(answers.isNo(i)).to.false
      expect(answers.isAnswered(i)).to.false
    }
  })
})
