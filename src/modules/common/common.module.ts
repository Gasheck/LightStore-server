import { Module } from '@nestjs/common';
import { CommonGraphqlModule } from './graphql/common.graphql.module';
import { CommonDbModule } from './db/common.db.module';

@Module({
  imports: [CommonDbModule, CommonGraphqlModule],
})
export class CommonModule {}
