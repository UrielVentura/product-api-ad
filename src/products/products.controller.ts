import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
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
    if (page < 1) page = 1;
    if (limit < 1 || limit > 100) limit = 5;

    return this.productService.findAll(
      page,
      limit,
      name,
      category,
      minPrice,
      maxPrice,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
