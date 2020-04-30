import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  @Input() category: any;

  loading = true;
  constructor() {}

  onLoadImage(evt) {
    if (evt && evt.target) {
      this.loading = false;
    }
  }
}
