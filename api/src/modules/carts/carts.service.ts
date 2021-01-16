import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/users.entity';
import { CreateCartItemDto } from './carts.dto';
import { CartItem } from './carts.entity';

@Injectable()
export class CartsService extends TypeOrmCrudService<CartItem> {
  constructor(@InjectRepository(CartItem) private cartRepository: Repository<CartItem>) {
    super(cartRepository);
  }

  async createCartItem(dto: CreateCartItemDto, user: User): Promise<CartItem> {
    const cartItem = await this.cartRepository.findOne({ where: { productId: dto.productId, userId: user.id } });
    if (cartItem) throw new ConflictException('Cart item is already exist');
    return await this.cartRepository.save({ ...dto, user });
  }

  async deleteCartItems(user: User): Promise<void> {
    const result = await this.cartRepository.delete({ userId: user.id });
    if (result.affected === 0) throw new NotFoundException('Cart is empty');
  }
}
