import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  BASE_URL = "http://localhost:3000/product";

  constructor(private http:HttpClient) { }

  addProduct(data:Product):Observable<Product>{
    return this.http.post<Product>(this.BASE_URL, data).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "Server Error")))
  }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.BASE_URL).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "Server Error")))
  }

  getByProductName(name:string):Observable<any>{
    const param1 = new HttpParams().set('product_name', name);
    return this.http.get<any>(this.BASE_URL, {params:param1}).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "Server Error")))

}

updateProduct(data:Product, id:number):Observable<Product>{
  return this.http.put<Product>(`${this.BASE_URL}/${id}`, data).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "server Error")));
}

}
