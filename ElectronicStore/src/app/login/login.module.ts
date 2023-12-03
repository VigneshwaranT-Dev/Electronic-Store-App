import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './container/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { AppModule } from '../app.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    LoginFormComponent,
    ErrorPageComponent,
  ],
  providers: [LoginService]
})
export class LoginModule { }
