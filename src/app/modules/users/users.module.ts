import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersRoutingModule } from './users-routing.module';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VieworderComponent } from './vieworder/vieworder.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';


@NgModule({
  declarations: [
    UserdashboardComponent,
    CartComponent,
    VieworderComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgxPaginationModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePayButtonModule
  ]
})
export class UsersModule { }
