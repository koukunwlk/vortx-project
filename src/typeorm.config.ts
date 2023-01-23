import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  entities: [__dirname + '/**/*entity.{js,ts}'],
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'vxtell',
  password: 'vxtell123',
  database: 'vxtell',
  synchronize: false,
};
