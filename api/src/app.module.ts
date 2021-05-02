import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './controllers/auth/auth.module';
import { AuthorsModule } from './controllers/store/authors/authors.module';
import { CartsModule } from './controllers/store/carts/carts.module';
import { CategoriesModule } from './controllers/store/categories/categories.module';
import { DiscountsModule } from './controllers/store/discounts/discounts.module';
import { OrdersModule } from './controllers/store/orders/orders.module';
import { ProductsModule } from './controllers/store/products/products.module';
import { PublishersModule } from './controllers/store/publishers/publishers.module';
import { ShippingsModule } from './controllers/store/shippings/shippings.module';
import { TransactionsModule } from './controllers/store/transactions/transactions.module';
import { UsersModule } from './controllers/store/users/users.module';
import OrmConfig from './core/Config/orm.config';
import { RolesGuard } from './core/Guards/roles.guard';
import { HttpRequestLogger } from './core/Loggers/http-request.logger';
import { ArrayExist } from './core/Validators/array-exist/array-exist.service';
import { Exist } from './core/Validators/exist/exist.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(OrmConfig),
    MulterModule.register(),
    AuthModule,
    ProductsModule,
    CategoriesModule,
    PublishersModule,
    AuthorsModule,
    UsersModule,
    CartsModule,
    OrdersModule,
    DiscountsModule,
    TransactionsModule,
    ShippingsModule
  ],
  providers: [
    Exist,
    ArrayExist,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    if (process.env.NODE_ENV !== 'PRODUCTION') {
      consumer.apply(HttpRequestLogger).forRoutes('*');
    }
  }
}
