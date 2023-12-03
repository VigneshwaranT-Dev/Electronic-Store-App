import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './container/login/login.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { SignupComponent } from './container/signup/signup.component';

const routes: Routes = [
  { path: 'sign-in', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
