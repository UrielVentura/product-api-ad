import { Injectable, Logger } from '@nestjs/common';
import { createClient } from 'contentful';

@Injectable()
export class ContentfulService {
  private readonly logger = new Logger(ContentfulService.name);
  private client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
  });

  async getProducts() {
    try {
      const entries = await this.client.getEntries({
        content_type: process.env.CONTENTFUL_CONTENT_TYPE,
      });
      return entries.items;
    } catch (error) {
      this.logger.error('Error fetching products from Contentful', error.stack);
      throw new Error('Failed to fetch products from Contentful');
    }
  }
}
