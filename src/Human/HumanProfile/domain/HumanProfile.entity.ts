export class HumanProfile {
  constructor(
    private readonly _name: string,
    private readonly _middlename: string,
    private readonly _surname: string,
    private readonly _birthday: Date,
    private readonly _id: string,
  ) {}

  public get name(): string {
    return this._name;
  }

  public get middlename(): string {
    return this._middlename;
  }

  public get surname(): string {
    return this._surname;
  }

  public get birthday(): Date {
    return this._birthday;
  }

  public get id(): string {
    return this._id;
  }
}
