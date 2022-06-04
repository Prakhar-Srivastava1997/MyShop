import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/classes/cart';
import { Product } from 'src/app/classes/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductserviceService } from 'src/app/services/productservice.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  prodArray:Product[]=[];
  pageCount:number=1;
  name:string='';
  mainProductArray:Product[]=[]
  cartItems:Cart[]=[]
  constructor(private prodServ:ProductserviceService, private cartServ:CartService) { }

  ngOnInit(): void {

    this.prodServ.getProducts().subscribe(
      data=>{this.prodArray = data
            this.mainProductArray = data},
      error=>alert(error)
    )

    //this.updateQuantity()
  }

  btnclick(){
    if(this.name.length!=0){
      this.prodArray = this.mainProductArray
      this.prodArray = this.prodArray.filter((res)=>{
        return res.product_category.toLowerCase() === this.name.toLowerCase()
      })
       console.log(this.name)
       this.name=''
    }
    else{
      this.ngOnInit()
    }

}

valueChanged(){
  if(this.name.length==0){
    this.ngOnInit()
  }
}

// updateQuantity(){
//    this.cartItems = this.cartServ.getProductsFromCart()
//    console.log("Value of Cart Items :", this.cartItems)
//    this.cartItems.forEach((res)=>{
//      this.prodArray.forEach((data)=>{
//        if(data.product_name === res.cartItemName){
//          data.product_quantity = data.product_quantity - res.cartItemQuantity
//        }
//      })
//    })
   
// }

}
