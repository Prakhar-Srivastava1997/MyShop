import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { HomeComponent } from './components/home/home.component';
import { ViewallordersComponent } from './components/viewallorders/viewallorders.component';
import { ViewproductComponent } from './components/viewproduct/viewproduct.component';
import { ViewusersComponent } from './components/viewusers/viewusers.component';
import { AdmingaurdGuard } from './gaurds/admingaurd.guard';
import { UsergaurdGuard } from './gaurds/usergaurd.guard';
import { CartComponent } from './modules/users/cart/cart.component';
import { VieworderComponent } from './modules/users/vieworder/vieworder.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'signup', loadChildren:()=>import('./modules/signup/signup.module').then((m)=>m.SignupModule)},
  {path: 'login', loadChildren: ()=>import('./modules/login/login.module').then((m)=>m.LoginModule)},
  {path:'admin', loadChildren: ()=>import('./modules/admin/admin.module').then((m)=>m.AdminModule), canActivate: [AdmingaurdGuard]},
  {path:'addproduct', component:AddproductComponent, canActivate: [AdmingaurdGuard]},
  {path:'viewusers', component:ViewusersComponent, canActivate: [AdmingaurdGuard]},
  {path:'viewproducts', component:ViewproductComponent, canActivate: [AdmingaurdGuard]},
  {path:'users', loadChildren: ()=>import('./modules/users/users.module').then((m)=>m.UsersModule), canActivate:[UsergaurdGuard]},
  {path:'users/cart', component:CartComponent, canActivate:[UsergaurdGuard]},
  {path:'users/vieworder', component:VieworderComponent, canActivate:[UsergaurdGuard]},
  {path:'vieworders', component:ViewallordersComponent, canActivate:[AdmingaurdGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
