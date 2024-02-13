/**
 * Stores answers in behavior rules dialog.
 */
export default class BehaviorAnswers {
  private _answers: (boolean|undefined)[] = []

  public yes(index : number) : void {
    this._clearBeyond(index)
    this._answers[index] = true
  }

  public no(index : number) : void {
    this._clearBeyond(index)
    this._answers[index] = false    
  }

  public isYes(index : number) : boolean {
    const answer = this._answers[index]
    return answer != undefined && answer
  }

  public isNo(index : number) : boolean {
    const answer = this._answers[index]
    return answer != undefined && !answer
  }

  public isAnswered(index : number) : boolean {
    return this._answers[index] != undefined
  }

  public reset() : void {
    this._answers = []
  }

  private _clearBeyond(index : number) : void {
    for (let i = index + 1; i < this._answers.length; i++) {
      this._answers[i] = undefined
    }
  }
}
