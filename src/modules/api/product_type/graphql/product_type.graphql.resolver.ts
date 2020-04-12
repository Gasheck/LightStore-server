import { UsePipes } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { YupValidationPipe, PrototypeFullObjectPipe } from 'src/pipes';
import { typeInputSchema } from './validation';
import { ProductType } from '../../../db/product_type/product_type.entity';
import { CreateTypeInput } from '../../../common/graphql/schemas/graphql';
import { ProductTypeDbService } from '../db/product_type.db.service';
import { ProductTypeService } from '../../../db/product_type/product_type.service';

@Resolver('Type')
export class ProductTypeGraphqlResolver {
  constructor(
    private readonly productTypeDbService: ProductTypeDbService,
    private readonly productTypeService: ProductTypeService,
  ) {}

  @Query()
  async types() {
    return await this.productTypeService.find();
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

    return this.productTypeDbService.save(type);
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
