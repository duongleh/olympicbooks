import { Component } from '@angular/core';
import { CondOperator } from '@nestjsx/crud-request';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseComponent } from 'src/app/shared/Base/base.component';
import { Product } from 'src/app/shared/Interfaces/product.interface';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent<Product> {
  searchInputByTitle: string;

  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    { title: 'Sản phẩm', key: 'title', sort: true },
    { title: 'Danh mục', key: 'category.id', sort: true },
    { title: 'Số trang', key: 'pages', sort: true },
    { title: 'Năm xuất bản', key: 'publicationYear', sort: true },
    { title: 'Giá bán', key: 'price', sort: true },
    { title: 'Giá gốc', key: 'originalPrice', sort: true },
    { title: 'Có hàng', key: 'inStock', sort: true },
    { title: 'Nhà xuất bản', key: 'publisher.id', sort: true },
    { title: 'Tác giả' }
  ];

  constructor(private productsService: ProductsService, private messageService: NzMessageService, private modalService: NzModalService) {
    super(productsService);
  }

  onSearchByTitle() {
    delete this.qb.queryObject.filter;
    if (this.searchInputByTitle) this.qb.setFilter({ field: 'title', operator: CondOperator.CONTAINS_LOW, value: this.searchInputByTitle });
    this.renderPage();
  }

  showDeleteConfirm(id: number) {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzOnOk: () => this.delete(id)
    });
  }

  delete(id: number) {
    this.isLoading = true;
    this.productsService.deleteOne(id).subscribe(
      (response) => {
        this.isLoading = false;
        this.messageService.success('Xoá thành công!');
        this.renderPage();
      },
      (error) => {
        this.isLoading = false;
        this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!');
      }
    );
  }
}
