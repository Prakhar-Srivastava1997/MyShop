import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  balance:number=0

  constructor(private route:Router, private userServ:UserserviceService) { }

  ngOnInit(): void {
     this.balance = parseInt(localStorage.getItem('billAmount'))
  }

  addproduct(){
    this.route.navigate(['addproduct'])
  }

  viewUsers(){
    this.route.navigate(['viewusers'])
  }

  viewProducts(){
    this.route.navigate(['viewproducts'])
  }

  viewOrders(){
    this.route.navigate(['vieworders'])
  }

  logout(){
    this.userServ.deleteAdminToken()
    this.route.navigate(['login'])
  }

}
