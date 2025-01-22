import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ example: 198, description: 'The ID of the product' })
  id: number;

  @ApiProperty({ example: '3JSOA4QB', description: 'The SKU of the product' })
  sku: string;

  @ApiProperty({
    example: 'Dell Mi Watch',
    description: 'The name of the product',
  })
  name: string;

  @ApiProperty({ example: 'Dell', description: 'The brand of the product' })
  brand: string;

  @ApiProperty({ example: 'Mi Watch', description: 'The model of the product' })
  model: string;

  @ApiProperty({
    example: 'Smartwatch',
    description: 'The category of the product',
  })
  category: string;

  @ApiProperty({
    example: 'Rose Gold',
    description: 'The color of the product',
  })
  color: string;

  @ApiProperty({ example: '1979.83', description: 'The price of the product' })
  price: string;

  @ApiProperty({ example: 'USD', description: 'The currency of the price' })
  currency: string;

  @ApiProperty({
    example: 37,
    description: 'The stock quantity of the product',
  })
  stock: number;

  @ApiProperty({
    example: false,
    description: 'Whether the product is deleted',
  })
  deleted: boolean;
}
