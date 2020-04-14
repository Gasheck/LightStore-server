import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductDbService } from '../db/product.db.service';
import { UsePipes } from '@nestjs/common';
import { PrototypeFullObjectPipe, YupValidationPipe } from '../../../../pipes';
import { productInputCreateSchema, productInputUpdateSchema } from './validation';
import { Product } from '../db/product.db.entity';
import {In} from "typeorm";

@Resolver('Product')
export class ProductGraphqlResolver {
  constructor(private readonly productService: ProductDbService) {}

  @Query()
  async products() {
    return this.productService.find();
  }

  @Mutation()
  @UsePipes(new PrototypeFullObjectPipe())
  @UsePipes(new YupValidationPipe(productInputCreateSchema))
  async createProduct(@Args('productInput') product: Product[]) {
    return await this.productService.save(product);
  }

  @Mutation()
  async removeProduct(@Args('id') id: number | number[]) {
    if (!Array.isArray(id)) {
      id = [id];
    }

    return await this.productService.remove(id);
  }

  @Mutation()
  @UsePipes(new PrototypeFullObjectPipe())
  @UsePipes(new YupValidationPipe(productInputUpdateSchema))
  async updateProduct(@Args('productInput') product: Product) {
    const { id } = product;
    const updatedId = await this.productService.update(id, product);

    return await this.productService.findOne( { where: { id: updatedId }, relations: ['type'] });
  }
}
