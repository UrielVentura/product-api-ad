import { Controller, Get } from '@nestjs/common';
import { ContentfulService } from './contentful.service';

@Controller('contentful')
export class ContentfulController {
  constructor(private readonly contentfulService: ContentfulService) {}

  @Get('products')
  async getProducts() {
    return this.contentfulService.getProducts();
  }
}
