import { TechnologiesPersistence } from '@/store/state'
import Technology from './enum/Technology'
import Action from './enum/Action'

/**
 * Collection of civil and military technologies.
 */
export default class Technologies {

  private _civil : Technology[]
  private _military : Technology[]

  public constructor(civil : Technology[] = [], military : Technology[] = []) {
    this._civil = civil
    this._military = military
  }

  public get civil() : readonly Technology[] {
    return this._civil
  }

  public get military() : readonly Technology[] {
    return this._military
  }

  public get civilTotalCost() : number {
    return getTotalCost(this._civil)
  }

  public get militaryTotalCost() : number {
    return getTotalCost(this._military)
  }

  public addCivil(technology: Technology) {
    this._civil.push(technology)
  }

  public addMilitary(technology: Technology) {
    this._military.push(technology)
  }

  public add(technologyAction: Action, technology: Technology) {
    switch (technologyAction) {
      case Action.RESEARCH_CIVIL:
        this.addCivil(technology)
        break
      case Action.RESEARCH_MILITARY:
        this.addMilitary(technology)
        break
      default:
        throw new Error(`Invalid technology action: ${technologyAction}`)
    }
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : TechnologiesPersistence {
    return {
      civil: [...this._civil],
      military: [...this._military]
    }
  }

  /**
   * Re-creates a card deck from persistence.
   */
  public static fromPersistence(persistence : TechnologiesPersistence) : Technologies {
    return new Technologies(
      [...persistence.civil],
      [...persistence.military]
    )
  }

}

function getTotalCost(technologies: Technology[]) {
  return technologies.reduce((acc, technology) => acc + technology, 0)
}
