import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductModule } from './modules/api/product/product.module';
import { ProductTypeModule } from './modules/api/product_type/product_type.module';
import { CommonModule } from './modules/common/common.module';
import { AttributeValue } from './modules/api/attribute_value/db/attribute_value.db.entity';

@Module({
  imports: [
    CommonModule,
    ProductTypeModule,
    ProductModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveStaticOptions: { index: false },
    }),
  ],
})
export class AppModule {}
