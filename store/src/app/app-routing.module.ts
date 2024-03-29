import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { NotExistComponent } from './shared/Components/result/error/not-exist.component';
import { AuthGuard } from './shared/Guards/auth.guard';
import { UnAuthGuard } from './shared/Guards/unauth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)
  },
  { path: 'home', pathMatch: 'full', redirectTo: '' },
  {
    path: '',
    loadChildren: () =>
      import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule),
    canActivate: [UnAuthGuard]
  },
  {
    path: 'danh-muc',
    loadChildren: () => import('./pages/categories/categories.module').then((m) => m.CategoriesModule)
  },
  {
    path: 'san-pham',
    loadChildren: () => import('./pages/products/products.module').then((m) => m.ProductsModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then((m) => m.SearchModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./pages/customer/customer.module').then((m) => m.CustomerModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then((m) => m.CartModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/check-out/check-out.module').then((m) => m.CheckOutModule),
    canActivate: [AuthGuard]
  },
  { path: 'not-found', component: NotExistComponent },
  { path: '**', component: NotExistComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
