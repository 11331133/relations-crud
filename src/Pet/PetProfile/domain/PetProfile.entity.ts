export class PetProfile {
  constructor(
    private readonly _name: string,
    private readonly _birthday: Date,
    private readonly _id: string,
  ) {}

  public get name(): string {
    return this._name;
  }

  public get birthday(): Date {
    return this._birthday;
  }

  public get age(): number {
    const today = new Date();
    const yearDifference = today.getFullYear() - this.birthday.getFullYear();
    const monthDifference = today.getMonth() - this.birthday.getMonth();
    const dayDifference = today.getDate() - this.birthday.getDate();

    const birthdayTodayOrHasPassed =
      monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0);

    if (yearDifference) {
      return birthdayTodayOrHasPassed ? yearDifference : yearDifference - 1;
    } else {
      return Number(birthdayTodayOrHasPassed);
    }
  }

  public get id(): string {
    return this._id;
  }
}
