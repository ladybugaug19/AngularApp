import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { HomeComponent } from './components/layout/home/home.component';
import { ResetPwdComponent } from './auth/reset-pwd/reset-pwd.component';
import { SubmitPwdComponent } from './auth/submit-pwd/submit-pwd.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: "", component: HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  { path: "navbar", component: NavbarComponent, canActivate: [AuthGuardService]},
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService]},
  {path:"resetPwd" , component:ResetPwdComponent},
 //{path:"submit",component:SubmitPwdComponent},
  {path:"reset",children:[
    {path:"**", component:SubmitPwdComponent
  }
  ], canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
