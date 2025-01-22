import { Test, TestingModule } from '@nestjs/testing';
import { getQueueToken } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let queue: Queue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getQueueToken('tasks'),
          useValue: {
            add: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    queue = module.get<Queue>(getQueueToken('tasks'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('scheduleFetchProducts', () => {
    it('should schedule fetch-products job', async () => {
      const addSpy = jest.spyOn(queue, 'add').mockResolvedValueOnce(null);

      await service.scheduleFetchProducts();

      expect(addSpy).toHaveBeenCalledWith('fetch-products', {});
      expect(addSpy).toHaveBeenCalledWith(
        'fetch-products',
        {},
        { repeat: { cron: '0 * * * *' } },
      );
    });

    it('should log success message', async () => {
      const logSpy = jest.spyOn(Logger.prototype, 'log');

      await service.scheduleFetchProducts();

      expect(logSpy).toHaveBeenCalledWith(
        'Scheduled fetch-products job successfully',
      );
    });

    it('should log error message and throw error', async () => {
      const error = new Error('Test error');
      jest.spyOn(queue, 'add').mockRejectedValueOnce(error);
      const errorSpy = jest.spyOn(Logger.prototype, 'error');

      await expect(service.scheduleFetchProducts()).rejects.toThrow(error);
      expect(errorSpy).toHaveBeenCalledWith(
        'Error scheduling fetch-products job',
        error.stack,
      );
    });
  });
});
