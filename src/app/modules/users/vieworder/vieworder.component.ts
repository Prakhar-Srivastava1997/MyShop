import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/classes/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.css']
})
export class VieworderComponent implements OnInit {

  orderArray:Order[]=[];

  constructor(private orderServ:OrderService) { }

  ngOnInit(): void {
      
      this.orderServ.getOrder().subscribe(
        data=>this.orderArray = data
      )
  }

}
