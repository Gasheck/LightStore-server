import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { reduce, map, find, mapKeys } from 'lodash';
import { ProductDbService } from '../db/product.db.service';
import { UsePipes } from '@nestjs/common';
import { PrototypeFullObjectPipe, YupValidationPipe } from '../../../../pipes';
import {
  productInputCreateSchema,
  productInputUpdateSchema,
} from './validation';
import { Product } from '../db/product.db.entity';
import {
  AttributeValueInput,
  CreateProductInput, Product as ProductSchema,
} from '../../../common/graphql/schemas/graphql';
import { AttributeValue } from '../../attribute_value/db/attribute_value.db.entity';
import { AttributeValueDbService } from '../../attribute_value/db/attribute_value.db.service';
import processRawProduct from "./utils/processRawProduct";

@Resolver('Product')
export class ProductGraphqlResolver {
  constructor(
    private readonly productService: ProductDbService,
    private readonly attributeValueDbService: AttributeValueDbService,
  ) {}

  @Query()
  async products() {
    return this.productService.find();
  }

  @Mutation()
  @UsePipes(new PrototypeFullObjectPipe())
  @UsePipes(new YupValidationPipe(productInputCreateSchema))
  async createProduct(
    @Args('productInput') product: CreateProductInput | CreateProductInput[],
  ) {
    if (!Array.isArray(product)) {
      product = [product];
    }

    const savedProducts = await this.productService.save(product);

    const ids = map(savedProducts, ({ id }) => id);

    const attributes = reduce<
      CreateProductInput & Product,
      Array<Omit<AttributeValue, 'id'>>
    >(
      savedProducts,
      (acc, { id, attributes }) => {
        return [
          ...acc,
          ...map<AttributeValueInput, any>(attributes, attr => ({
            product: id,
            attribute: parseInt(attr.id),
            number_value: typeof attr.value === 'number' ? attr.value : null,
            string_value: typeof attr.value === 'string' ? attr.value : null,
          })),
        ];
      },
      [],
    );

    await this.attributeValueDbService.save(attributes);

    const foundItems = await this.productService.findMany(ids);

    return processRawProduct(foundItems);
  }

  @Mutation()
  async removeProduct(@Args('id') id: number | number[]) {
    if (!Array.isArray(id)) {
      id = [id];
    }

    const productToRemove = await this.productService.findMany(id);

    await this.productService.remove(id);

    return processRawProduct(productToRemove);
  }

  @Mutation()
  @UsePipes(new PrototypeFullObjectPipe())
  @UsePipes(new YupValidationPipe(productInputUpdateSchema))
  async updateProduct(@Args('productInput') product: Product) {
    const { id } = product;
    const updatedId = await this.productService.update(id, product);

    return this.productService.findOne(updatedId);
  }
}
