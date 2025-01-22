import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // The SKU must be unique
  sku: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  category: string;

  @Column()
  color: string;

  @Column('decimal', { precision: 10, scale: 2 }) // Price with 2 decimal places
  price: number;

  @Column()
  currency: string;

  @Column('int')
  stock: number;

  @Column({ default: false }) // Field to mark deleted products
  deleted: boolean;
}
