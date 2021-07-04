import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class PetProfileOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'timestamptz' })
  birthday: Date;
}
