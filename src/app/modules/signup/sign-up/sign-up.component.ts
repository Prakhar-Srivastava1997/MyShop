import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Users } from 'src/app/classes/users';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm:FormGroup;
  userdata:Users={
    "username":"",
    "emailId":'',
    "contact":'',
    "password":'',
    "gender":'',
    "userimage":'',
    "address":'',
    "city":'',
    "state":"",
    "pincode":""
  }

  imagePath:any;
  invalid:boolean;
  flag:boolean=false;
  userarray:Users[]=[];

  constructor(private formBuilder:FormBuilder, private userserv:UserserviceService) { }

  ngOnInit(): void {

    this.userserv.getUsers().subscribe(
      data=>{
        this.userarray = data
      }
    )

      this.signupForm = this.formBuilder.group({
      username:['', [Validators.required, Validators.maxLength(20), Validators.minLength(2), this.uniqueName()]],
      emailId:['',[Validators.required, Validators.email]],
      contact:['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[1-9]+[0-9]*$")]],
      password:['', [Validators.required, Validators.maxLength(15), Validators.minLength(8)]],
      address:['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      city:['', [Validators.required]],
      state:['',[Validators.required]],
      pincode:['', [Validators.required, Validators.pattern("^[1-9][0-9]*$"), Validators.maxLength(6), Validators.minLength(6)]],
      gender:['', [Validators.required]]
    })
  }

  addImage(e:any){
    this.imagePath = e.target.files[0].name;
    this.userdata.userimage = "./assets/images/"+this.imagePath;
  }

  

  submit(signupForm:any){
     
    this.userdata.username = signupForm.controls['username'].value;
    localStorage.setItem('uname', this.userdata.username);
     this.userdata.address = signupForm.controls['address'].value;
     this.userdata.city = signupForm.controls['city'].value;
     this.userdata.contact = signupForm.controls['contact'].value;
     this.userdata.emailId = signupForm.controls['emailId'].value;
     this.userdata.gender = signupForm.controls['gender'].value;
     this.userdata.password = signupForm.controls['password'].value;
     this.userdata.pincode = signupForm.controls['pincode'].value;
     this.userdata.state = signupForm.controls['state'].value;
     this.userdata.username = signupForm.controls['username'].value;
     
     if(this.signupForm.valid){
      this.userserv.addUser(this.userdata).subscribe(
        data=>{alert("Congratulations!! User added successfully...")},
        error=>alert(error)
        
      )
     }

  }

  uniqueName(): ValidatorFn{

    return (control:AbstractControl):ValidationErrors | null => {
      const name = control.value
      let flag =false
      this.userarray.forEach((res)=>{
        if(res.username === name){
          flag = true
        }
      })

      if(flag){
        return {uniqueUserName:true}
      }
      else{
        return null
      }
    }
    
  }
}



