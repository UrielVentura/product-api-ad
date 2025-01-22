import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, Not, Repository } from 'typeorm';
import { Product } from '../products/product.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getDeletedProductsPercentage(): Promise<number> {
    const totalProducts = await this.productRepository.count();
    const deletedProducts = await this.productRepository.count({
      where: { deleted: true },
    });

    if (totalProducts === 0) return 0; // Avoid division by zero

    return (deletedProducts / totalProducts) * 100;
  }

  async getNonDeletedProductsPercentage(
    hasPrice?: boolean,
    startDate?: Date,
    endDate?: Date,
  ): Promise<number> {
    const where: any = { deleted: false };

    if (hasPrice !== undefined) {
      if (hasPrice) {
        where.price = Not(IsNull());
      } else {
        where.price = IsNull();
      }
    }

    if (startDate && endDate) {
      where.createdAt = Between(startDate, endDate);
    }

    const nonDeletedProducts = await this.productRepository.count({ where });
    const totalProducts = await this.productRepository.count();

    if (totalProducts === 0) return 0; // Evitar división por cero

    return (nonDeletedProducts / totalProducts) * 100;
  }

  async getTop5MostExpensiveProducts(): Promise<Product[]> {
    return this.productRepository.find({
      where: { deleted: false }, // Exclude deleted products
      order: { price: 'DESC' }, // Order by price descending
      take: 5, // Limit to 5 products
    });
  }
}
