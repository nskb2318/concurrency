import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

const typeormModuleConfiguration = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'employee',
  schema: 'public',
  keepConnectionAlive: true,
  entities: [join(__dirname, 'entities/*.entity.{js,ts}')],
  migrations: [join(__dirname, 'migrations/*.{js,ts}')],
  migrationsRun: true,
  logging: true,
});

const typeormDynamic = TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'employee',
    schema: 'public',
    keepConnectionAlive: true,
    entities: [join(__dirname, 'entities/*.entity.{js,ts}')],
    migrations: [join(__dirname, 'migrations/*.{js,ts}')],
    migrationsRun: true,
    logging: true,
  }),
});

@Module({
  imports: [typeormModuleConfiguration],
})
export class DatabaseModule {}
