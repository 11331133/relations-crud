export class LoveHumanRelation {
  constructor(
    private readonly _humanId: string,
    private readonly _strength: number,
    private readonly _relationId: string,
  ) {}

  public get strength(): number {
    return this._strength;
  }

  public get humanId(): string {
    return this._humanId;
  }

  public get relationId(): string {
    return this._relationId;
  }
}
