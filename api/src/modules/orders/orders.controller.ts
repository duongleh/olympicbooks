import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';

import { Roles } from '../../core/Decorators/roles.decorator';
import { Role } from '../../shared/Enums/roles.enum';
import { UpdateOrderDto } from './orders.dto';
import { Order } from './orders.entity';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
@UseGuards(AuthGuard())
@Crud({
  model: { type: Order },
  routes: {
    only: ['getOneBase', 'getManyBase', 'updateOneBase', 'deleteOneBase'],
    getOneBase: { decorators: [Roles(Role.ADMIN)] },
    getManyBase: { decorators: [Roles(Role.ADMIN)] },
    deleteOneBase: { decorators: [Roles(Role.ADMIN)] }
  },
  query: {
    join: {
      orderItems: { eager: true, exclude: ['orderId', 'productId'] },
      'orderItems.product': { eager: true },
      transaction: { eager: true, exclude: ['transactionMethodId'] },
      'transaction.transactionMethod': { eager: true },
      shipping: { eager: true, exclude: ['shippingMethodId'] },
      'shipping.shippingMethod': { eager: true },
      discount: { eager: true }
    },
    exclude: ['transactionId', 'shippingId', 'discountId']
  },
  dto: { update: UpdateOrderDto }
})
export class OrdersController implements CrudController<Order> {
  constructor(public service: OrdersService) {}

  @Override()
  @Roles(Role.ADMIN)
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: UpdateOrderDto): Promise<Order> {
    return this.service.updateOrder(req.parsed.paramsFilter[0].value, dto);
  }
}