import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { JwtInterceptor } from './shared/Providers/jwt.interceptor';
import { ErrorInterceptor } from './shared/Providers/error.interceptor';
import { FacebookInitializer } from './shared/Providers/facebook.initializer';

registerLocaleData(vi);

const ngZorroConfig: NzConfig = {
  message: { nzDuration: 1000, nzTop: 60 }
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NzLayoutModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: FacebookInitializer, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NZ_I18N, useValue: vi_VN },
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
