export class HasFriendRelation {
  constructor(
    private readonly _whoHasFriend: string,
    private readonly _friendId: string,
  ) {}

  public get whoHasFriend(): string {
    return this._whoHasFriend;
  }

  public get friendId(): string {
    return this._friendId;
  }
}
