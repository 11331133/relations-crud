import * as faker from 'faker';
import { PetProfile } from '../PetProfile.entity';

describe('PetProfile Entity', () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  enum Age {
    zero = 0,
    one = 1,
    nine = 9,
    ten = 10,
  }

  describe('Age getter', () => {
    it('if birthday has passed, return correct age', () => {
      const birthdayThatHasPassedInCurrentYear = new Date();
      birthdayThatHasPassedInCurrentYear.setMonth(currentMonth - 1);
      birthdayThatHasPassedInCurrentYear.setFullYear(currentYear - Age.ten);

      const entity = new PetProfile(
        faker.name.firstName(),
        birthdayThatHasPassedInCurrentYear,
        faker.datatype.uuid(),
      );

      expect(entity.age).toBe(Age.ten);
    });

    it('if birthday has not passed, return correct age', () => {
      const birthdayThatHasNotPassedInCurrentYear = new Date();
      birthdayThatHasNotPassedInCurrentYear.setMonth(currentMonth + 1);
      birthdayThatHasNotPassedInCurrentYear.setFullYear(currentYear - Age.ten);

      const entity = new PetProfile(
        faker.name.firstName(),
        birthdayThatHasNotPassedInCurrentYear,
        faker.datatype.uuid(),
      );

      expect(entity.age).toBe(Age.nine);
    });

    it('if pet was born in current year and birthday has passed, return age 1', () => {
      const birthdayThatHasPassed = new Date();
      birthdayThatHasPassed.setMonth(currentMonth - 1);

      const entity = new PetProfile(
        faker.name.firstName(),
        birthdayThatHasPassed,
        faker.datatype.uuid(),
      );

      expect(entity.age).toBe(Age.one);
    });

    it('if pet was born in current year and birthday has not passed, return age 0', () => {
      const birthdayThatHasNotPassed = new Date();
      birthdayThatHasNotPassed.setMonth(currentMonth + 1);

      const entity = new PetProfile(
        faker.name.firstName(),
        birthdayThatHasNotPassed,
        faker.datatype.uuid(),
      );

      expect(entity.age).toBe(Age.zero);
    });
  });
});
