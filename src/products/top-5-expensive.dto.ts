import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from './product.dto';

export class Top5ExpensiveProductsResponseDto {
  @ApiProperty({
    type: [ProductDto],
    description: 'List of the top 5 most expensive products',
  })
  products: ProductDto[];
}
