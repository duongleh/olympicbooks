import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IconModule } from './icon.module';

import { HeaderComponent } from './Components/header/header.component';
import { RightMenuComponent } from './Components/header/sub-menu/right-menu.component';
import { LeftMenuComponent } from './Components/header/sub-menu/left-menu.component';
import { CategoryMenuComponent } from './Components/header/sub-menu/category-menu.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SearchComponent } from './Components/search/search.component';
import { ProductComponent } from './Components/product/product.component';
import { CategoryComponent } from './Components/category/category.component';
import { NotExistComponent } from './Components/result/error/not-exist.component';
import { OrderSuccessComponent } from './Components/result/success/order-success.component';
import { OrderErrorComponent } from './Components/result/error/order-error.component';
import { CartEmptyComponent } from './Components/result/empty/cart-empty.component';

import { PricePipe } from './Pipes/price.pipe';
import { StatePipe } from './Pipes/state.pipe';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzResultModule } from 'ng-zorro-antd/result';

@NgModule({
  declarations: [
    HeaderComponent,
    RightMenuComponent,
    LeftMenuComponent,
    CategoryMenuComponent,
    FooterComponent,
    SearchComponent,
    ProductComponent,
    CategoryComponent,
    NotExistComponent,
    OrderSuccessComponent,
    OrderErrorComponent,
    CartEmptyComponent,
    PricePipe,
    StatePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    IconModule,
    NzMenuModule,
    NzDrawerModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzCardModule,
    NzResultModule
  ],
  exports: [
    HeaderComponent,
    RightMenuComponent,
    LeftMenuComponent,
    CategoryMenuComponent,
    FooterComponent,
    SearchComponent,
    ProductComponent,
    CategoryComponent,
    NotExistComponent,
    OrderSuccessComponent,
    OrderErrorComponent,
    CartEmptyComponent,
    PricePipe,
    StatePipe
  ]
})
export class SharedModule {}