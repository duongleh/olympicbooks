import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoryTree: NzTreeNodeOptions[] = [];
  isNew = true;
  categoryId: number;

  constructor(private categoriesService: CategoriesService, private messageService: NzMessageService) {}

  ngOnInit(): void {
    this.renderPage();
  }

  renderPage() {
    this.categoriesService.getMany().subscribe(
      (response) => (this.categoryTree = response),
      (error) => this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!')
    );
  }

  onSelectNode(event: NzFormatEmitEvent): void {
    this.isNew = false;
    this.categoryId = event.node.origin.id;
  }

  onClickCreateBtn() {
    this.isNew = true;
  }

  notifyDelete() {
    this.isNew = true;
    this.renderPage();
  }
}