/** Class for uniformizing time taken for trainings. */
export default class TrainingTime
{
  /** Original string provided */
  private readonly _original: string;

  private _hours: number;
  private _minutes: number;
  private _seconds: number;

  /** Separator that will be put between infos (hours, etc.) */
  private _separator: string = ":"

  constructor(dbTime: string) {
    this._original = dbTime
  }

  /**
   * Will attempt to parse the string passed in the constructor into hours, minutes and seconds
   */
  public parse(): void
  {
    const regexTime: RegExp = new RegExp('[:|\\s|-|_|\'|\"|\.|\,]')
    //reverse, because if the person only trained for seconds it's interpreted as hours
    const splitedOG: string[] = this._original.split(regexTime).reverse();

    //order in which properties should be handled
    const orderProperties: string[] = [
      "_seconds", "_minutes", "_hours"
    ]
    //how to bind properties the easy and unsafe way 101:
    //foreach in all time fragments of the original string
    splitedOG.forEach((timeFrag: string, index: number) => {
      //if the element can't be bound
      if(index < orderProperties.length) {
        //we get the property of TrainingTime to bind to this
        const propertyToBind = orderProperties.at(index)
        //and then we eval to put the property to the time frag.
        //So that last fragment of OG string is seconds, second is minutes and last is hours
        //scary !
        eval(`this.${propertyToBind} = timeFrag`)
      }
    })
  }

  /**
   * Converts the class to an object. This method is more fitting to use in data-sending.
   */
  public toObject(): object
  {
    return {
      hours: this._hours,
      minutes: this._minutes,
      seconds: this._seconds,

      parsed: this.toString(),
      separator: this._separator
    } as object;
  }

  public toString()
  {
    const separator = this._separator;

    const hours = (this._hours ?? '00').toString()
    const minutes = (this._minutes ?? '00').toString()
    const seconds = (this._seconds ?? '00').toString()

    return hours + separator + minutes + separator + seconds
  }

  get original(): string { return this._original; }

  get hours(): number { return this._hours; }
  get minutes(): number { return this._minutes; }
  get seconds(): number { return this._seconds; }

  get separator(): string { return this._separator; }
  set separator(value: string) { this._separator = value; }
}
