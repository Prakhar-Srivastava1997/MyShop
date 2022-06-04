import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Wallet } from '../classes/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  BASE_URL = "http://localhost:3000/wallet"
  walletobj:Wallet={
    userName: '',
    walletAmount: 0,
    userid: '',
  }

  constructor(private http:HttpClient) { }

  addMoney(id:string, name:string, amount:number):Observable<Wallet>{
    this.walletobj.userName =name
    this.walletobj.walletAmount = amount
    this.walletobj.userid = id;
    return this.http.post<Wallet>(this.BASE_URL, this.walletobj).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "server error")))
  }

  getmoney():Observable<any>{
    return this.http.get<any>(this.BASE_URL).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "server Error")));
  }

  updateMoney(data:Wallet, id:number):Observable<Wallet>{
    return this.http.put<Wallet>(`${this.BASE_URL}/${id}`, data).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "server Error")));
  }
}
