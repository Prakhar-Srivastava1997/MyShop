import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/classes/users';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  user:Users[]=[];
  formname:string;
  formpass:string;

  constructor(private formBuilder:FormBuilder, private userServ:UserserviceService, private route:Router) { }

  ngOnInit(): void {

    if(this.userServ.isAdminLoggedIn()){
      this.route.navigate(['admin'])
    }

    if(this.userServ.isUserLoggedIn()){
      this.route.navigate(['users'])
    }
    
      this.loginForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password:['', [Validators.required]]
    })
  }

  submit(loginForm:any){

   this.formname = loginForm.controls['username'].value;
   this.formpass = loginForm.controls['password'].value;

   if(this.formname === 'admin'){
     if(this.formpass === 'admin123'){
       alert("Welcome Admin....")
       this.userServ.setAdminToken(this.formname)
       this.route.navigate(['admin'])
     }
     else{
       alert("Wrong credentials ! Please try again...")
     }
   }else{
     this.userServ.getByUserName(this.formname).subscribe(
       (data)=>{
         this.user = data
         if(this.formpass === this.user[0].password){
           alert("Welcome User....")
           this.userServ.setUserToken(this.formname)
           this.route.navigate(['users'])
         }
         else{
           alert("Wrong credentials ! Please try again...")
         }
       },
       error=>alert(error)
     )
   }
   
  }
}
