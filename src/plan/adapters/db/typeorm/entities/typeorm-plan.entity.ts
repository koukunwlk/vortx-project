import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('plan')
export class TypeOrmPlan {
	@PrimaryColumn({
		type: "uuid"
	})
  id: string;

  @Column({
	unique: true
  })
  name: string;

  @Column()
  freeMinutes: number;
}
