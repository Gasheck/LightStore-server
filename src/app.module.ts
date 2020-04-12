import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductModule } from './modules/api/product/product.module';
import { ProductTypeModule } from './modules/api/product_type/product_type.module';
import { ImageModule } from './modules/api/image/image.module';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [
    CommonModule,
    // ImageModule,
    ProductTypeModule,
    ProductModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveStaticOptions: { index: false },
    }),
  ],
})
export class AppModule {}
