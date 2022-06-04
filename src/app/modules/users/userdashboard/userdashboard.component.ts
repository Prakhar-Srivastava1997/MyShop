import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/classes/product';
import { Users } from 'src/app/classes/users';
import { CartService } from 'src/app/services/cart.service';
import { ProductserviceService } from 'src/app/services/productservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  token:string;
  clothes:Product[]=[];
  footwares:Product[]=[];
  pageC:number=1;
  pageF:number=1;
  itemCount:number;
  user:Users={
    username: '',
    emailId: '',
    contact: '',
    password: '',
    gender: '',
    userimage: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  }
  id:string;
  walletBalance:any;

  constructor(private userServ:UserserviceService, private prodServ:ProductserviceService, private cart:CartService, private route:Router) { }

  ngOnInit(): void {

    this.token = this.userServ.getUserToken()
    this.userServ.getByUserName(this.token).subscribe(
      data=>{
             this.user = data[0]
             this.id = data[0].id.toString()
             console.log(typeof this.id)
             this.userServ.setUserId(this.id)
      },
      error=>alert(error)
    )

    this.prodServ.getProducts().subscribe(
      data=>{
        data.forEach((res)=>{
          if(res.product_category === "Footware"){
            this.footwares.push(res)
          }
          else{
            this.clothes.push(res)
          }
        })
      }
    )
    this.cart.clearCart();
  }

  addToCart(data:any){
      console.log(data)
      this.cart.addProductToCart(data)
      this.itemCount = this.cart.cartSize()
  }

  cartClicked(){
    this.route.navigate(['users/cart'])
  }

  logout(){
    this.userServ.deleteUserToken()
    this.route.navigate(['login'])
  }

}
