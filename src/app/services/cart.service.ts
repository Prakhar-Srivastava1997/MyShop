
import { Injectable } from '@angular/core';
import { Cart } from '../classes/cart';
import { Product } from '../classes/product';
import { ProductserviceService } from './productservice.service';
import { WalletService } from './wallet.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemArray:Product[]=[]
  cartItems:Cart[]=[]
  index:number
  Base_Url = "http://localhost:3000/product"
  finalamount:number;
  cartitem:Cart={
    cartItemName: '',
    cartItemCategory: '',
    cartItemDescription: '',
    cartItemPrice: '',
    cartItemQuantity: 0,
    cartItemImage: ''
  }
  constructor(private prodServ:ProductserviceService, private walletServ:WalletService) { }

  addProductToCart(data:Product){

    this.cartitem.cartItemName = data.product_name
    this.cartitem.cartItemCategory = data.product_category
    this.cartitem.cartItemDescription = data.product_description
    this.cartitem.cartItemPrice = data.product_price
    this.cartitem.cartItemQuantity = 1
    this.cartitem.cartItemImage = data.product_image

    // let productArray:any =[];
    // if(localStorage.getItem('cartProducts')){
    //   productArray = localStorage.getItem('cartProducts')
    //   productArray = JSON.parse(productArray)
    // }
    this.cartItems.push(this.cartitem)
    this.itemArray.push(data)
    localStorage.setItem('cartProducts', JSON.stringify(this.cartItems))
    this.cartitem={
      cartItemName: '',
      cartItemCategory: '',
      cartItemDescription: '',
      cartItemPrice: '',
      cartItemQuantity: 0,
      cartItemImage: ''
    }
  }

  getProductsFromCart():Cart[]{
    let items:any
    items = localStorage.getItem('cartProducts')
    this.cartItems = JSON.parse(items)
    return this.cartItems
  }

  removeProductFromCart(data:Cart):string{
    
    this.index = this.cartItems.indexOf(data)
    this.cartItems.splice(this.index, 1)
    localStorage.setItem('cartProducts', JSON.stringify(this.cartItems))
    return "Product removed from the cart..."
    
  }

  clearCart(){
    this.itemArray = []
    localStorage.setItem('cartProducts', JSON.stringify(this.itemArray))
  }

  cartSize():number{
     return this.itemArray.length
  }
}
