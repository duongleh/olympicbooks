import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { BaseTableComponent } from '../../shared/Components/base-table/base-table.component';
import { Order } from '../../shared/Interfaces/order.interface';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends BaseTableComponent<Order> {
  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    // { title: 'Mã vận chuyển', key: 'shipping.code', sort: true },
    { title: 'Ngày mua', key: 'createdAt', sort: true },
    { title: 'Giao hàng', key: 'shipping.state', sort: true },
    { title: 'Thanh Toán', key: 'transaction.state', sort: true },
    { title: 'Phí vận chuyển', key: 'shipping.fee', sort: true },
    { title: 'Tổng tiền', key: 'transaction.value', sort: true }
  ];

  constructor(
    private ordersService: OrdersService,
    public messageService: NzMessageService,
    public modalService: NzModalService
  ) {
    super(ordersService, messageService, modalService);
  }

  toggleExpand(order: Order) {
    order.expanded = !order.expanded;
  }
}
