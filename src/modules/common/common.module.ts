import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule, GraphqlModule],
})
export class CommonModule {}
