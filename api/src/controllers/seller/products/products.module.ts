import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { Publisher } from 'src/entities/publishers.entity';

import { Author } from '../../../entities/authors.entity';
import { CartItem } from '../../../entities/carts.entity';
import { ProductImage } from '../../../entities/product-images.entity';
import { Product } from '../../../entities/products.entity';
import { ProductsModule } from '../../store/products/products.module';
import { ShopsModule } from '../shops/shops.module';
import { SellerProductsController } from './products.controller';

@Module({
  controllers: [SellerProductsController],
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage, Category, Author, Publisher, CartItem]),
    ProductsModule,
    ShopsModule
  ]
})
export class SellerProductsModule {}