import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductType } from '../../../db/product_type/product_type.entity';

@Entity()
export class Attribute {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ProductType,
    product_type => product_type.id,
  )
  @JoinColumn({ name: 'product_type_id', referencedColumnName: 'id' })
  product_type_id: number;

  @Column({ type: 'varchar', length: 64 })
  name: string;

  @ManyToOne(
    () => ProductType,
    product_type => product_type.id,
  )
  @JoinColumn({ name: 'attribute_type_id', referencedColumnName: 'id' })
  attribute_type_id: number;
}
