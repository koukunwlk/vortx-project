import { typeOrmConfig } from './typeorm.config';
import { DataSource } from 'typeorm';

//@ts-expect-error DataSource don't recognize typeOrmConfig type
export default new DataSource({
  ...typeOrmConfig,
  entities: ['src/**/entities/*.entity.ts'],
  migrations: ['db/seeds/*.ts'],
  migrationsTransactionMode: "each"
});
