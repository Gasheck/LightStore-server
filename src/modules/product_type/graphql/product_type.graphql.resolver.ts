import { UsePipes } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductTypeDbService } from 'src/modules/product_type/db/product_type.db.service';
import { YupValidationPipe, PrototypeFullObjectPipe } from 'src/pipes';
import { typeInputSchema } from './validation';
import { ProductType } from '../db/product_type.db.entity';

@Resolver('Type')
export class ProductTypeGraphqlResolver {
  constructor(private readonly productTypeService: ProductTypeDbService) {}

  @Query()
  async types() {
    return await this.productTypeService.findAll();
  }

  @Mutation()
  @UsePipes(new PrototypeFullObjectPipe())
  @UsePipes(new YupValidationPipe(typeInputSchema))
  async createType(@Args('typeInput') type: ProductType) {
    return await this.productTypeService.save(type);
  }

  @Mutation()
  async removeType(@Args('id') id: number) {
    return await this.productTypeService.remove(id);
  }

  @Mutation()
  @UsePipes(new PrototypeFullObjectPipe())
  async updateType(
    @Args('typeInput') input: { id: number; type: ProductType },
  ) {
    return await this.productTypeService.update(input.id, input.type);
  }
}
