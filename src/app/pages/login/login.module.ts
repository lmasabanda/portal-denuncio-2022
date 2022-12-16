import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './page/login.component';
import { FooterModule } from 'src/app/shared/components/footer-home/footer.module';
import { ModalNumberSerieComponent } from './component/modal-number-serie/page/modal-number-serie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    LoginComponent,
    ModalNumberSerieComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FooterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ]
})
export class LoginModule { }
