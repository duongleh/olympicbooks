import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { switchMap } from 'rxjs/operators';

import { ProductStatus } from '../../shared/Enums/products.enum';
import { Product } from '../../shared/Interfaces/product.interface';
import { TitleMetaService } from '../../shared/Providers/title-meta.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { CartService } from '../cart/cart.service';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product: Product;
  sameCategoryProducts: Product[];

  productId: number;
  isProductLoading = false;
  isRelatedProductsLoading = false;
  isBtnLoading = { addToCart: false, buyNow: false, comment: false };
  quantity = 1;
  minQty = 1;
  maxQty = 100;
  maxRelatedProduct = 6;
  relatedProductStyle = null;
  placeHolderImage = { id: 0, imgName: 'product-image', imgUrl: 'assets/images/placeholder.png' };

  constructor(
    private titleMetaService: TitleMetaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ productSlug }) => {
      this.productId = Number(productSlug.split('-').pop());
      if (!this.productId) {
        this.router.navigate(['/not-found'], { skipLocationChange: true });
        return;
      }

      this.resetStateForRouting();
      this.renderProductPage();
    });
  }

  renderProductPage() {
    this.isProductLoading = true;
    this.productsService
      .getOneProduct(this.productId)
      .pipe(
        switchMap((response) => {
          this.product = response;
          this.titleMetaService.updateTitleAndMetaTags(
            this.product?.title,
            this.product?.description,
            this.product?.images[0]?.imgUrl
          );

          if (!this.product.images.length) {
            this.isProductLoading = false;
            this.product.images.push(this.placeHolderImage);
          }

          this.isRelatedProductsLoading = true;
          return this.productsService.getManyProducts({
            filter: [
              ...(this.product?.category?.id ? [`categoryId||$eq||${this.product.category.id}`] : []),
              `id||$ne||${this.product.id}`,
              `status||$eq||${ProductStatus.ACTIVE}`
            ],
            limit: String(this.maxRelatedProduct)
          });
        })
      )
      .subscribe(
        (response) => {
          this.sameCategoryProducts = response;
          this.isRelatedProductsLoading = false;
          this.relatedProductStyle = { padding: '1px' };
        },
        (error) => this.router.navigate(['/not-found'], { skipLocationChange: true })
      );
  }

  onLoadImage(event: Event) {
    if (event && event.target) this.isProductLoading = false;
  }

  addItemToCart(btnName: string) {
    if (!this.authenticationService.userValue) {
      this.router.navigate(['signin'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    const existedProduct = this.cartService.cart.items.find((el) => el.product.id === this.product.id);

    this.isBtnLoading[btnName] = true;
    this.cartService[existedProduct ? 'updateCartItem' : 'createCartItem'](
      existedProduct ? existedProduct.id : this.product.id,
      existedProduct ? this.quantity + existedProduct.quantity : this.quantity
    ).subscribe(
      (response) => {
        this.cartService.setCart();
        this.isBtnLoading[btnName] = false;
        this.messageService.success('Thêm vào giỏ hàng thành công!');
        if (btnName === 'buyNow') this.router.navigate(['cart']);
      },
      (error) => {
        this.isBtnLoading[btnName] = false;
        this.messageService.error('Có lỗi xảy ra, vui lòng tải lại trang và thử lại!');
      }
    );
  }

  resetStateForRouting() {
    this.relatedProductStyle = null;
    if (this.product) {
      this.product.images = null;
      this.quantity = 1;
    }
  }
}
