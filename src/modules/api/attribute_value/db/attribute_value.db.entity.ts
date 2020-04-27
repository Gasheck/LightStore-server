import {
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Attribute } from '../../attribute/db/attribute.db.entity';
import { Product } from '../../product/db/product.db.entity';

@Entity()
export class AttributeValue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Product,
    product => product.id,
  )
  @JoinColumn({ name: 'product', referencedColumnName: 'id' })
  product: Product;

  @ManyToOne(
    () => Attribute,
    attribute => attribute.id,
  )
  @JoinColumn({ name: 'attribute', referencedColumnName: 'id' })
  attribute: Attribute;

  @Column({ type: 'varchar', length: 128 })
  string_value: string;

  @Column({ type: 'int4' })
  number_value: number;
}
