import { typeOrmConfig } from './typeorm.config';
import { DataSource } from 'typeorm';

//@ts-expect-error
export default new DataSource({
  ...typeOrmConfig,
  entities: ['src/**/entities/*.entity.ts'],
  migrations: ['db/migrations/*.ts'],
  migrationsTransactionMode: 'each',
});
