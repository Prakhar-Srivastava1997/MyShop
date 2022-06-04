import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/classes/cart';
import { Order } from 'src/app/classes/order';
import { Product } from 'src/app/classes/product';
import { Wallet } from 'src/app/classes/wallet';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductserviceService } from 'src/app/services/productservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  name: any;
  walletObj: Wallet = {
    userName: '',
    walletAmount: 0,
    userid: '',
  };
  currentBalance: number = 0;
  enteredAmount: number = 0;
  validdata: boolean = false;
  walletArray: Wallet[] = [];
  id: number = 0;
  walletId: number = 0;
  uid: string;
  quantity: number = 1;
  prodArray: Cart[] = [];
  totalAmount: any;
  amount: any;
  grandTotal: number = 0;
  quantityForm: FormGroup;
  iterate = 0;
  quantityEntered: number;

  addOrder: Order = {
    username: '',
    totalquantity: 0,
    totalamount: 0,
    orderdate: '',
  };

  

  constructor(
    private userServ: UserserviceService,
    private walletServ: WalletService,
    private cartServ: CartService,
    private formbuider: FormBuilder,
    private prodServ: ProductserviceService,
    private orderServ: OrderService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.name = this.userServ.getUserToken();
    this.walletServ.getmoney().subscribe(
      (data) => {
        console.log(data[0].id);
        data.forEach((res: any) => {
          if (res.userName === this.name) {
            this.currentBalance = res.walletAmount;
          }
        });
      },
      (error) => alert(error)
    );
    this.uid = this.userServ.getUserId();

    this.prodArray = this.cartServ.getProductsFromCart();

    this.quantityForm = this.formbuider.group({
      quantityEntered: ['', Validators.required],
    });
    this.finalAmount();
  }

  addMoney() {
    this.walletServ.getmoney().subscribe((data) => {
      this.walletArray = data;

      this.walletArray.forEach((res) => {
        if (res.userid === this.uid) {
          let index = this.walletArray.indexOf(res);
          this.id = data[index].id;
          this.currentBalance = res.walletAmount;
          this.validdata = true;
        }
      });

      if (this.validdata) {
        this.walletObj.userName = this.name;
        this.walletObj.walletAmount = this.currentBalance + this.enteredAmount;
        this.walletObj.userid = this.uid;

        this.walletServ.updateMoney(this.walletObj, this.id).subscribe(
          (data) => {
            this.currentBalance = data.walletAmount;
            window.location.reload();
          },
          (error) => alert(error)
        );
      } else {
        this.walletServ
          .addMoney(this.uid, this.name, this.enteredAmount)
          .subscribe(
            (data) => {
              this.uid = data.userid;
              window.location.reload();
            },
            (error) => alert(error)
          );
      }
    });
  }

  removeItem(data: any) {
    this.grandTotal = this.grandTotal - +data.product_price;
    this.cartServ.removeProductFromCart(data);
  }

  plus(data: any) {
    for (let i = 0; i < this.prodArray.length; i++) {
      if (this.prodArray[i].cartItemName === data.cartItemName) {
        if (data.cartItemQuantity != 5) {
          this.prodArray[i].cartItemQuantity = data.cartItemQuantity + 1;
        }
      }
    }
    localStorage.setItem('cartProducts', JSON.stringify(this.prodArray));
    this.finalAmount();
  }

  minus(data: any) {
    for (let i = 0; i < this.prodArray.length; i++) {
      if (this.prodArray[i].cartItemName === data.cartItemName) {
        if (data.cartItemQuantity != 1) {
          this.prodArray[i].cartItemQuantity = data.cartItemQuantity - 1;
        }
      }
    }
    localStorage.setItem('cartProducts', JSON.stringify(this.prodArray));
    this.finalAmount();
  }
  
  payNow() {
    let userbalance: Wallet = {
      userName: '',
      walletAmount: 0,
      userid: '',
    };

    if (this.currentBalance < this.grandTotal) {
      alert('Insufficient Balance !!');
      } 
      else {
        
        this.currentBalance = this.currentBalance - this.grandTotal;

        userbalance.userName = this.name;
        userbalance.userid = this.uid;
        userbalance.walletAmount = this.currentBalance;

        this.walletServ.getmoney().subscribe((data) => {
          this.walletArray = data;

          this.walletArray.forEach((res) => {
            if (res.userName === this.name) {
              let index = this.walletArray.indexOf(res);
              this.walletId = data[index].id;
              this.currentBalance = res.walletAmount;
            }
          });
          console.warn('value of Wallet Id :', this.walletId);
          this.walletServ.updateMoney(userbalance, this.walletId).subscribe(
            (data) => {
              this.currentBalance = data.walletAmount;
              window.location.reload();
            },
            (error) => alert(error)
          );
        });

        this.addOrder.username = this.name;

        this.prodArray = JSON.parse(localStorage.getItem('cartProducts'));
        this.prodArray.forEach((res) => {
          this.prodServ.getByProductName(res.cartItemName).subscribe(
            (data) => {
              data[0].product_quantity =
                data[0].product_quantity - res.cartItemQuantity;
              this.prodServ.updateProduct(data[0], data[0].id).subscribe(
                (result) => console.log(result),
                (error) => alert(error)
              );
            },
            (error) => alert(error)
          );
        });
        this.addOrder.totalquantity = this.prodArray.reduce((acc, val) => {
          return acc + val.cartItemQuantity;
        }, 0);

        this.addOrder.totalamount = this.grandTotal;
        this.addOrder.orderdate = String(new Date().toLocaleString());

        this.orderServ.addOrder(this.addOrder).subscribe(
          (data) => {
            console.log(data);
            alert('Congratulations !! Order placed successfully...');
          },
          (error) => alert(error)
        );
        localStorage.setItem('billAmount', String(this.grandTotal));
      }
    }
    
  viewOrders() {
    this.route.navigate(['users/vieworder']);
  }

  finalAmount() {
    if (localStorage.getItem('cartProducts')) {
      this.prodArray = JSON.parse(localStorage.getItem('cartProducts'));
      this.grandTotal = this.prodArray.reduce((acc, val) => {
        return acc + +val.cartItemPrice * val.cartItemQuantity;
      }, 0);
    }
  }
 
}
