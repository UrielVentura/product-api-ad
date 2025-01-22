import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentfulService } from './contentful/contentful.service';
import { ContentfulController } from './contentful/contentful.controller';
import { ContentfulModule } from './contentful/contentful.module';
import { TasksService } from './tasks/tasks.service';
import { ProductsModule } from './products/products.module';
import { BullModule } from '@nestjs/bull';
import { TasksModule } from './tasks/tasks.module';
import { Product } from './products/product.entity';
import { ProductService } from './products/products.service';
import { AuthModule } from './auth/auth.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // 'mongodb' if you are using mongodb
      host: process.env.DB_HOST, //  name of the service in docker-compose.yml
      port: parseInt(process.env.DB_PORT, 10), // 27017 if you are using mongodb
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Product],
      synchronize: true, // warning! do not use on production
    }),
    ContentfulModule,
    ProductsModule,
    TasksModule,
    AuthModule,
    ReportsModule,
  ],
  controllers: [AppController, ContentfulController],
  providers: [AppService, ContentfulService, TasksService],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(
    private readonly tasksService: TasksService,
    private readonly productService: ProductService,
  ) {}

  async onModuleInit() {
    this.logger.log('AppModule initialized');

    // Check if the database is empty
    const productCount = await this.productService.count();
    if (productCount === 0) {
      this.logger.log('Database is empty. Syncing data with Contentful...');
      try {
        await this.tasksService.scheduleFetchProducts();
        this.logger.log('Initial data sync with Contentful completed');
      } catch (error) {
        this.logger.error(
          'Error during initial data sync with Contentful',
          error.stack,
        );
      }
    }

    setTimeout(async () => {
      try {
        await this.tasksService.scheduleFetchProducts();
        this.logger.log('Scheduled fetch-products job successfully');
      } catch (error) {
        this.logger.error('Error scheduling fetch-products job', error.stack);
      }
    }, 5000);
  }
}
