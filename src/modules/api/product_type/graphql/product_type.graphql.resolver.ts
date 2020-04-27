import { UsePipes } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { reduce, map, pickBy, values } from 'lodash';
import { YupValidationPipe, PrototypeFullObjectPipe } from 'src/pipes';
import { typeInputSchema } from './validation';
import { ProductType } from '../db/product_type.db.entity';
import {
  AttributeInput,
  CreateTypeInput,
} from '../../../common/graphql/schemas/graphql';
import { ProductTypeDbService } from '../db/product_type.db.service';
import { getConnection, In } from 'typeorm';
import { Attribute } from '../../attribute/db/attribute.db.entity';
import { AttributeDbService } from '../../attribute/db/attribute.db.service';

@Resolver('Type')
export class ProductTypeGraphqlResolver {
  constructor(
    private readonly productTypeDbService: ProductTypeDbService,
    private readonly attributeDbService: AttributeDbService,
  ) {}

  @Query()
  async types() {
    return await this.productTypeDbService.find();
  }

  @Mutation()
  @UsePipes(new PrototypeFullObjectPipe())
  @UsePipes(new YupValidationPipe(typeInputSchema))
  async createType(
    @Args('typeInput') type: CreateTypeInput | CreateTypeInput[],
  ) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    const savedTypes = await this.productTypeDbService.save<CreateTypeInput>(
      type,
    );

    const attributes = reduce<
      CreateTypeInput & ProductType,
      Array<Omit<Attribute, 'id'>>
    >(
      savedTypes,
      (acc, { id, attributes }) => {
        return [
          ...acc,
          ...map<AttributeInput, Omit<Attribute, 'id'>>(attributes, attr => {
            return {
              attribute_type: parseInt(attr.type),
              product_type: id,
              name: attr.name,
            };
          }),
        ];
      },
      [],
    );

    const savedAttributes = await this.attributeDbService.save(attributes);

    return map(savedTypes, type => {
      return {
        ...type,
        attributes: values(
          pickBy(
            map(savedAttributes, attr => ({
              ...attr,
              type: attr.attribute_type,
            })),
            attr => {
              return attr.product_type === type.id;
            },
          ),
        ),
      };
    });
  }

  @Mutation()
  async removeType(@Args('id') id: number | number[]) {
    if (!Array.isArray(id)) {
      id = [id];
    }

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Attribute)
      .where({
        product_type: In(id),
      })
      .execute();

    return await this.productTypeDbService.remove(id);
  }

  @Mutation()
  @UsePipes(new PrototypeFullObjectPipe())
  async updateType(
    @Args('typeInput') input: { id: number; type: ProductType },
  ) {
    return await this.productTypeDbService.update(input.id, input.type);
  }
}
