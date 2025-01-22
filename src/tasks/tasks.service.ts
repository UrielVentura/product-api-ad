import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(@InjectQueue('tasks') private tasksQueue: Queue) {}

  async scheduleFetchProducts() {
    try {
      // Execute the task manually the first time
      await this.tasksQueue.add('fetch-products', {});

      await this.tasksQueue.add(
        'fetch-products',
        {},
        { repeat: { cron: '0 * * * *' } }, // Execute every hour
      );
      this.logger.log('Scheduled fetch-products job successfully');
    } catch (error) {
      this.logger.error('Error scheduling fetch-products job', error.stack);
      throw error;
    }
  }
}
