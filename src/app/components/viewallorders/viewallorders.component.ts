import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/classes/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-viewallorders',
  templateUrl: './viewallorders.component.html',
  styleUrls: ['./viewallorders.component.css']
})
export class ViewallordersComponent implements OnInit {

  orderArray:Order[]=[]

  constructor(private orderServ:OrderService) { }

  ngOnInit(): void {

    this.orderServ.getOrder().subscribe(
      data=>this.orderArray = data,
      error=>alert(error)
    )
  }

}
