import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  AppstoreOutline,
  CarryOutOutline,
  CloseCircleFill,
  CommentOutline,
  CopyrightOutline,
  CreditCardOutline,
  DeleteOutline,
  DeleteTwoTone,
  DownOutline,
  EditOutline,
  FacebookOutline,
  GiftOutline,
  HomeOutline,
  LikeOutline,
  LikeTwoTone,
  LoadingOutline,
  LockOutline,
  LoginOutline,
  LogoutOutline,
  MailOutline,
  MediumOutline,
  MenuOutline,
  PhoneOutline,
  ProfileOutline,
  SearchOutline,
  ShopOutline,
  ShoppingCartOutline,
  TeamOutline,
  UserAddOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

const icons: IconDefinition[] = [
  CarryOutOutline,
  CommentOutline,
  CopyrightOutline,
  CreditCardOutline,
  DeleteOutline,
  DeleteTwoTone,
  DownOutline,
  EditOutline,
  FacebookOutline,
  GiftOutline,
  HomeOutline,
  LikeOutline,
  LikeTwoTone,
  LoadingOutline,
  LockOutline,
  LoginOutline,
  LogoutOutline,
  MailOutline,
  MediumOutline,
  MenuOutline,
  PhoneOutline,
  ProfileOutline,
  SearchOutline,
  ShoppingCartOutline,
  TeamOutline,
  UserAddOutline,
  UserOutline,
  CloseCircleFill,
  ShopOutline,
  AppstoreOutline
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }]
})
export class IconModule {}
