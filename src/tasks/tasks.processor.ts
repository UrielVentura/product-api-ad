import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { ContentfulService } from '../contentful/contentful.service';
import { ProductService } from '../products/products.service';

@Processor('tasks')
export class TasksProcessor {
  private readonly logger = new Logger(TasksProcessor.name);

  constructor(
    private readonly contentfulService: ContentfulService,
    private readonly productService: ProductService,
  ) {}

  @Process('fetch-products')
  async handleFetchProducts(job: Job) {
    this.logger.log('Starting fetch-products job');
    try {
      const products = await this.contentfulService.getProducts();
      await this.productService.updateProducts(products);
      this.logger.log('Fetch-products job completed successfully');
    } catch (error) {
      this.logger.error('Error in fetch-products job', error.stack);
      throw error;
    }
  }
}
