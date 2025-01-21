import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentfulService } from './contentful/contentful.service';
import { ContentfulController } from './contentful/contentful.controller';
import { ContentfulModule } from './contentful/contentful.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // 'mongodb' if you are using mongodb
      host: process.env.DB_HOST, //  name of the service in docker-compose.yml
      port: parseInt(process.env.DB_PORT, 10), // 27017 if you are using mongodb
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [],
      synchronize: true, // warning! do not use on production
    }),
    ContentfulModule,
  ],
  controllers: [AppController, ContentfulController],
  providers: [AppService, ContentfulService],
})
export class AppModule {}
