import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TasksProcessor } from './tasks.processor';
import { ContentfulModule } from '../contentful/contentful.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'tasks', // Name of the queue
    }),
    ContentfulModule,
    ProductsModule,
  ],
  providers: [TasksProcessor], // Register the processor
  exports: [BullModule],
})
export class TasksModule {}
