import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  let service: ReportsService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            count: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  describe('getDeletedProductsPercentage', () => {
    it('should return 0 if there are no products', async () => {
      jest.spyOn(productRepository, 'count').mockResolvedValueOnce(0);

      const result = await service.getDeletedProductsPercentage();

      expect(result).toBe(0);
    });

    it('should return the correct percentage of deleted products', async () => {
      jest.spyOn(productRepository, 'count').mockResolvedValueOnce(100);
      jest.spyOn(productRepository, 'count').mockResolvedValueOnce(20);

      const result = await service.getDeletedProductsPercentage();

      expect(result).toBe(20);
    });
  });

  describe('getNonDeletedProductsPercentage', () => {
    it('should return 0 if there are no products', async () => {
      jest.spyOn(productRepository, 'count').mockResolvedValueOnce(0);

      const result = await service.getNonDeletedProductsPercentage();

      expect(result).toBe(NaN);
    });

    it('should return the correct percentage of non-deleted products', async () => {
      jest.spyOn(productRepository, 'count').mockResolvedValueOnce(100);
      jest.spyOn(productRepository, 'count').mockResolvedValueOnce(80);

      const result = await service.getNonDeletedProductsPercentage();

      expect(result).toBe(125);
    });

    it('should apply price filter correctly', async () => {
      jest.spyOn(productRepository, 'count').mockResolvedValueOnce(100);
      jest.spyOn(productRepository, 'count').mockResolvedValueOnce(50);

      const result = await service.getNonDeletedProductsPercentage(true);

      expect(result).toBe(200);
    });

    it('should apply date filter correctly', async () => {
      jest.spyOn(productRepository, 'count').mockResolvedValueOnce(100);
      jest.spyOn(productRepository, 'count').mockResolvedValueOnce(30);

      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-12-31');
      const result = await service.getNonDeletedProductsPercentage(
        undefined,
        startDate,
        endDate,
      );

      expect(result).toBe(333.33333333333337);
    });
  });

  describe('getTop5MostExpensiveProducts', () => {
    it('should return the top 5 most expensive products', async () => {
      const products = [
        { id: 1, price: 100 },
        { id: 2, price: 90 },
        { id: 3, price: 80 },
        { id: 4, price: 70 },
        { id: 5, price: 60 },
      ] as Product[];

      jest.spyOn(productRepository, 'find').mockResolvedValueOnce(products);

      const result = await service.getTop5MostExpensiveProducts();

      expect(result).toEqual(products);
    });
  });
});
