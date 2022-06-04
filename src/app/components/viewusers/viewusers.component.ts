import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/classes/users';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {

  userArray:Users[]=[];
  pageCount:number=1;
  name:string='';
  isBtnClicked:boolean=false;
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
  constructor(private userServ:UserserviceService) { }

  ngOnInit(): void {

    this.userServ.getUsers().subscribe(
      data=>this.userArray = data,
      error=>alert(error)
    )
    this.isBtnClicked = false
  }

  btnclick(){
    if(this.name.length!=0){
       this.userArray.forEach((res)=>{
         if(res.username === this.name){
           this.user = res
         }
       })
       this.isBtnClicked = true;
       console.log(this.name)
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
}
