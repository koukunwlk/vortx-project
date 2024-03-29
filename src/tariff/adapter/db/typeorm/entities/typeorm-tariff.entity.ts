import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tariff')
export class TypeOrmTariff {
  @PrimaryColumn({
	type: "uuid"
  })
  id: string;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column({
    type: 'float',
  })
  valuePerMinute: number;
}
