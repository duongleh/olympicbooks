import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTreeNodeKey } from 'ng-zorro-antd/core/tree';
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
  defaultSelectedKeys: NzTreeNodeKey[] = [];

  isNew = true;
  categoryId: number;

  constructor(
    private categoriesService: CategoriesService,
    private messageService: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriesService.getMany().subscribe(
      (response) => {
        this.categoryTree = response;
        this.activatedRoute.params.subscribe(({ categoryId }) => {
          if (Number(categoryId)) {
            this.categoryId = Number(categoryId);
            this.isNew = false;
            this.defaultSelectedKeys = [this.categoryId];
          } else {
            this.isNew = true;
          }
        });
      },
      (error) => this.messageService.error(error?.error?.message)
    );
  }

  renderCategoriesPage() {
    this.categoriesService.getMany().subscribe(
      (response) => (this.categoryTree = response),
      (error) => this.messageService.error(error?.error?.message)
    );
  }

  onSelectNode(event: NzFormatEmitEvent): void {
    this.router.navigate(['/categories', `${event.node.origin.id}`]);
    window.scrollTo({ top: window.innerWidth >= 1200 ? 0 : document.body.scrollHeight, behavior: 'smooth' });
  }

  onClickCreateBtn() {
    this.defaultSelectedKeys = [];
    this.router.navigate(['/categories']);
  }

  notifyDelete() {
    this.renderCategoriesPage();
    this.router.navigate(['/categories']);
  }
}