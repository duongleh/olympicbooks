import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IconModule } from '../../shared/icon.module';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './authors.component';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@NgModule({
  declarations: [AuthorsComponent],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    FormsModule,
    IconModule,
    NzCardModule,
    NzInputModule,
    NzSelectModule,
    NzTableModule,
    NzButtonModule,
    NzToolTipModule,
    NzSpaceModule,
    NzGridModule
  ]
})
export class AuthorsModule {}
