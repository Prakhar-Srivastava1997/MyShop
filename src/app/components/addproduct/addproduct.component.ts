import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Product } from 'src/app/classes/product';
import { ProductserviceService } from 'src/app/services/productservice.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  addProductForm:FormGroup
  imagePath:any;
  invalid:boolean;
  flag:boolean=false;
  prodarray:Product[]=[];

  productData:Product={
    product_name: '',
    product_category: '',
    product_description: '',
    product_price: '',
    product_quantity: 0,
    product_image: ''
  }
  constructor(private formBuilder:FormBuilder, private prodserv:ProductserviceService) { }

  ngOnInit(): void {

    this.prodserv.getProducts().subscribe(
      data=>this.prodarray = data,
      error=>alert(error)
    )

    this.addProductForm = this.formBuilder.group({
      product_name:['', [Validators.required, Validators.maxLength(20), Validators.minLength(5), this.uniqueName()]],
      product_category:['', [Validators.required, Validators.maxLength(15), Validators.minLength(5)]],
      product_description:['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      product_price:['', [Validators.required, Validators.maxLength(6), Validators.minLength(3)]],
      product_quantity:['',[Validators.required, Validators.min(5), Validators.max(100)]],
    })
  }

  addImage(e:any){
    this.imagePath = e.target.files[0].name;
    this.productData.product_image = "./assets/images/"+this.imagePath;
  }

  submit(addProductForm:any){
     this.productData.product_name = addProductForm.controls['product_name'].value;
     this.productData.product_category = addProductForm.controls['product_category'].value;
     this.productData.product_description = addProductForm.controls['product_description'].value;
     this.productData.product_price = addProductForm.controls['product_price'].value;
     this.productData.product_quantity = addProductForm.controls['product_quantity'].value;

     this.prodserv.addProduct(this.productData).subscribe(
       data=>alert("Bravo !! Product added successfully..."),
       error=>alert(error)
     )
  }

  uniqueName(): ValidatorFn{

    return (control:AbstractControl):ValidationErrors | null => {
      const name = control.value
      let flag =false
      this.prodarray.forEach((res)=>{
        if(res.product_name === name){
          flag = true
        }
      })

      if(flag){
        return {uniqueProductName:true}
      }
      else{
        return null
      }
    }
    
  }

}
