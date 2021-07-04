import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class HumanProfileOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  middlename: string;

  @Column()
  surname: string;

  @Column()
  birthday: Date;
}
