import { Injectable } from '@nestjs/common';
import { createClient } from 'contentful';

@Injectable()
export class ContentfulService {
  private client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
  });

  async getProducts() {
    const entries = await this.client.getEntries({
      content_type: process.env.CONTENTFUL_CONTENT_TYPE,
    });
    return entries.items;
  }
}
