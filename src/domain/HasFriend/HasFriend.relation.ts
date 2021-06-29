export class HasFriendRelation {
  constructor(
    private readonly _whoHasFriend: string,
    private readonly _friendId: string,
    private readonly _relationId: string,
  ) {}

  public get whoHasFriend(): string {
    return this._whoHasFriend;
  }

  public get friendId(): string {
    return this._friendId;
  }

  public get relationId(): string {
    return this._relationId;
  }
}
