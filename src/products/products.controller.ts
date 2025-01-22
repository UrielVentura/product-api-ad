import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Query('name') name?: string,
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ) {
    return this.productService.findAll(
      page,
      limit,
      name,
      category,
      minPrice,
      maxPrice,
    );
  }
}
