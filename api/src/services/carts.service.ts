import { Injectable } from '@nestjs/common';

import { CartItem } from '../entities/carts.entity';

@Injectable()
export class CartsService {
  calculateCartQuantity(cartItems: CartItem[]) {
    return cartItems.reduce((total: number, current: CartItem) => (total += current.quantity), 0);
  }

  calculateCartValue(cartItems: CartItem[]) {
    return cartItems.reduce(
      (total: number, current: CartItem) => (total += current.quantity * current.product.price),
      0
    );
  }
}
