import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Order } from '../classes/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  BASE_URL = "http://localhost:3000/order";
  constructor(private http:HttpClient) { }

  addOrder(data:Order):Observable<Order>{
    return this.http.post<Order>(this.BASE_URL, data).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "Server Error")));
  }

  getOrder():Observable<Order[]>{
    return this.http.get<Order[]>(this.BASE_URL).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "Server Error")));
  }
}
