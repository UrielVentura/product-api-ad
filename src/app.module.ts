import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // 'mongodb' if you are using mongodb
      host: 'db', //  name of the service in docker-compose.yml
      port: 5432, // 27017 if you are using mongodb
      username: 'user',
      password: 'password',
      database: 'product_db',
      entities: [],
      synchronize: true, // warning! do not use on production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
