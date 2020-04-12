import { Injectable } from '@nestjs/common';
import { reduce, map, pickBy, values } from 'lodash';
import { ProductTypeService } from '../../../db/product_type/product_type.service';
import { AttributeDbService } from '../../attribute/db/attribute.db.service';
import {
  AttributeInput,
  CreateTypeInput,
} from '../../../common/graphql/schemas/graphql';
import { ProductType } from '../../../db/product_type/product_type.entity';
import { Attribute } from '../../attribute/db/attribute.db.entity';

@Injectable()
export class ProductTypeDbService {
  constructor(
    private readonly productTypeService: ProductTypeService,
    private readonly attributeService: AttributeDbService,
  ) {}

  async save(type: CreateTypeInput[]) {
    const savedTypes = await this.productTypeService.save<CreateTypeInput>(
      type,
    );

    const attributes = reduce<
      CreateTypeInput & ProductType,
      { product_type_id: number; name: string }[]
    >(
      savedTypes,
      (acc, { id, attributes }) => {
        return [
          ...acc,
          ...map<AttributeInput, Omit<Attribute, 'id'>>(attributes, attr => {
            return {
              attribute_type_id: parseInt(attr.type),
              product_type_id: id,
              name: attr.name,
            };
          }),
        ];
      },
      [],
    );

    const savedAttributes = await this.attributeService.save(attributes);

    return map(savedTypes, type => {
      return {
        ...type,
        attributes: values(
          pickBy(
            map(savedAttributes, attr => ({
              ...attr,
              type: attr.attribute_type_id,
            })),
            attr => {
              return attr.product_type_id === type.id;
            },
          ),
        ),
      };
    });
  }
}
