import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DataSource, Like, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}

  async updateProducts(products: any[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Clean the table before saving new products
      await queryRunner.manager.delete(Product, {});

      // Save the new products
      for (const product of products) {
        const newProduct = queryRunner.manager.create(Product, {
          sku: product.fields.sku,
          name: product.fields.name,
          brand: product.fields.brand,
          model: product.fields.model,
          category: product.fields.category,
          color: product.fields.color,
          price: product.fields.price,
          currency: product.fields.currency,
          stock: product.fields.stock,
        });
        await queryRunner.manager.save(newProduct);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Error updating products', error.stack);
      throw new Error('Failed to update products');
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 5,
    name?: string,
    category?: string,
    minPrice?: number,
    maxPrice?: number,
  ) {
    const skip = (page - 1) * limit;

    const where: any = { deleted: false }; // Excluir productos eliminados

    if (name) {
      where.name = Like(`%${name}%`); // Filtrar por nombre (búsqueda parcial)
    }

    if (category) {
      where.category = category; // Filtrar por categoría exacta
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      where.price = Between(minPrice, maxPrice); // Filtrar por rango de precios
    }

    const [products, total] = await this.productRepository.findAndCount({
      where,
      skip,
      take: limit,
    });

    return {
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async remove(id: number) {
    await this.productRepository.update(id, { deleted: true });
  }

  async count() {
    return this.productRepository.count();
  }
}
