import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { ViewproductComponent } from './components/viewproduct/viewproduct.component';
import { ViewusersComponent } from './components/viewusers/viewusers.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { ViewallordersComponent } from './components/viewallorders/viewallorders.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddproductComponent,
    ViewproductComponent,
    ViewusersComponent,
    ViewallordersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    GooglePayButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
