import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      typePaths: ['./**/*.gql'],
      definitions: {
        path: join(process.cwd(), 'src/modules/common/graphql/schemas/graphql.ts'),
      },
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
      useGlobalPrefix: true,
    }),
  ],
})
export class GraphqlModule {}
