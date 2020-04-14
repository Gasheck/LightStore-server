import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductType } from '../../product_type/db/product_type.db.entity';

@Entity()
export class Attribute {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ProductType,
    product_type => product_type.id,
  )
  @JoinColumn({ name: 'product_type', referencedColumnName: 'id' })
  product_type: number;

  @Column({ type: 'varchar', length: 64 })
  name: string;

  @ManyToOne(
    () => ProductType,
    product_type => product_type.id,
  )
  @JoinColumn({ name: 'attribute_type', referencedColumnName: 'id' })
  attribute_type: number;
}
