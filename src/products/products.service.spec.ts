import { Test, TestingModule } from '@nestjs/testing';
import { Product } from './product.entity';
import { Repository, DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from './products.service';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<Product>;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
        {
          provide: DataSource,
          useValue: {
            createQueryRunner: jest.fn().mockReturnValue({
              connect: jest.fn(),
              startTransaction: jest.fn(),
              commitTransaction: jest.fn(),
              rollbackTransaction: jest.fn(),
              release: jest.fn(),
              manager: {
                delete: jest.fn(),
                create: jest.fn(),
                save: jest.fn(),
              },
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    dataSource = module.get<DataSource>(DataSource);
  });

  describe('updateProducts', () => {
    it('should delete all products and save new products', async () => {
      const queryRunner = dataSource.createQueryRunner();
      const products = [
        {
          fields: {
            sku: '123',
            name: 'Product1',
            brand: 'Brand1',
            model: 'Model1',
            category: 'Cat1',
            color: 'Red',
            price: 100,
            currency: 'USD',
            stock: 10,
          },
        },
        {
          fields: {
            sku: '456',
            name: 'Product2',
            brand: 'Brand2',
            model: 'Model2',
            category: 'Cat2',
            color: 'Blue',
            price: 200,
            currency: 'USD',
            stock: 5,
          },
        },
      ];

      await service.updateProducts(products);

      expect(queryRunner.connect).toHaveBeenCalled();
      expect(queryRunner.startTransaction).toHaveBeenCalled();
      expect(queryRunner.manager.delete).toHaveBeenCalledWith(Product, {});
      expect(queryRunner.manager.create).toHaveBeenCalledTimes(products.length);
      expect(queryRunner.manager.save).toHaveBeenCalledTimes(products.length);
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
      expect(queryRunner.release).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const mockProducts = [
        {
          id: 1,
          name: 'Product1',
          category: 'Cat1',
          price: 100,
          deleted: false,
        },
        {
          id: 2,
          name: 'Product2',
          category: 'Cat2',
          price: 200,
          deleted: false,
        },
      ];
      productRepository.findAndCount = jest
        .fn()
        .mockResolvedValue([mockProducts, 10]);

      const result = await service.findAll(1, 5, 'Product', 'Cat1', 50, 150);

      expect(productRepository.findAndCount).toHaveBeenCalledWith({
        where: expect.objectContaining({
          name: expect.any(Object),
          category: 'Cat1',
          price: expect.any(Object),
          deleted: false,
        }),
        skip: 0,
        take: 5,
      });
      expect(result).toEqual({
        data: mockProducts,
        meta: {
          page: 1,
          limit: 5,
          totalItems: 10,
          totalPages: 2,
          hasNextPage: true,
        },
      });
    });
  });

  describe('remove', () => {
    it('should mark a product as deleted', async () => {
      const updateSpy = jest
        .spyOn(productRepository, 'update')
        .mockResolvedValue({} as any);

      await service.remove(1);

      expect(updateSpy).toHaveBeenCalledWith(1, { deleted: true });
    });
  });

  describe('count', () => {
    it('should return product count', async () => {
      jest.spyOn(productRepository, 'count').mockResolvedValue(42);

      const result = await service.count();

      expect(result).toBe(42);
      expect(productRepository.count).toHaveBeenCalled();
    });
  });
});
