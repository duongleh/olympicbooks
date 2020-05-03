import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';

import {
  MenuOutline,
  ShoppingCartOutline,
  SearchOutline,
  DownOutline
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  MenuOutline,
  ShoppingCartOutline,
  SearchOutline,
  DownOutline
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }]
})
export class IconsProviderModule {}
