export class HasPetRelation {
  constructor(
    private readonly _ownerId: string,
    private readonly _petId: string,
  ) {}

  public get owner(): string {
    return this._ownerId;
  }

  public get petId(): string {
    return this._petId;
  }
}
