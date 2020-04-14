import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductType } from '../../product_type/db/product_type.db.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  quantity: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'money' })
  price: string;

  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @ManyToOne(
    () => ProductType,
    product_type => product_type.id,
  )
  @JoinColumn({ name: 'type', referencedColumnName: 'id' })
  type: ProductType;
}
