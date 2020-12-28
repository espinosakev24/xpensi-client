import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthWrapperComponent } from './auth/auth-wrapper/auth-wrapper.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BoardsWrapperComponent } from './boards-wrapper/boards-wrapper.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginRegisterGuard } from './guards/auth/login-register.guard';
import { LandingComponent } from './home/landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'boards',
    component: BoardsWrapperComponent,
    canActivate: [AuthGuard]
  },
  { path: 'authentication', component: AuthWrapperComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
