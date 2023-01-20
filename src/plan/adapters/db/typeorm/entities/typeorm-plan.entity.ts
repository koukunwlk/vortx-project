import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("plan")
export class TypeOrmPlan {
	@PrimaryColumn()
	id: string

	@Column()
	name: string

	@Column()
	freeMinutes: number
}