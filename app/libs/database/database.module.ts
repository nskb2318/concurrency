import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NFRAConfigService } from 'libs/config/nfra-config.service';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (
        config: NFRAConfigService,
      ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions => ({
        type: 'postgres',
        host: config.dbHost,
        port: config.dbPort,
        username: config.dbUsername,
        password: config.dbPassword,
        database: config.dbDatabase,
        schema: config.dbSchema,
        keepConnectionAlive: true,
        entities: [join(__dirname, 'entities/*.entity.{js,ts}')],
        migrations: [join(__dirname, 'migrations/*.{js,ts}')],
        migrationsRun: true,
        logging: config.dbLogging,
        extra: {
          max: 15,
          maxUses: 5000,
          connectionTimeoutMillis: 5000,
          idleTimeoutMillis: 1000,
        },
      }),
      inject: [NFRAConfigService],
    }),
  ],
})
export class DatabaseModule {}
