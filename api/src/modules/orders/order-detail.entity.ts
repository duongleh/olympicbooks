import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from '../products/products.entity';
import { Order } from './orders.entity';

@Entity()
export class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  totalPrice: number;

  @Column()
  orderId: number;

  @ManyToOne((type) => Order, (order) => order.orderDetails)
  order: Order;

  @OneToOne((type) => Product)
  @JoinColumn()
  product: Product;
}
