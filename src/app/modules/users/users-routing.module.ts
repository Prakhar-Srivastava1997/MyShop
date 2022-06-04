import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { VieworderComponent } from './vieworder/vieworder.component';

const routes: Routes = [
  {path:'', component:UserdashboardComponent},
  {path:'cart', component:CartComponent},
  {path:'vieworder', component:VieworderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
