export class LovesHumanRelation {
  constructor(
    private readonly _humanId: string,
    private readonly _petId: string,
    private readonly _strength: number,
  ) {}

  public get strength(): number {
    return this._strength;
  }

  public get humanId(): string {
    return this._humanId;
  }

  public get petId(): string {
    return this._petId;
  }
}
