import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, map, Observable, throwError } from 'rxjs';
import { Users } from '../classes/users';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  BASE_URL = "http://localhost:3000/users";

  constructor(private http:HttpClient) { }

  addUser(data:Users):Observable<Users>{
    return this.http.post<Users>(this.BASE_URL, data).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "Server Error")))
  }

  getUsers():Observable<Users[]>{
    return this.http.get<Users[]>(this.BASE_URL).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "Server Error")))
  }

  getByUserName(name:string):Observable<any>{
    const param1 = new HttpParams().set('username', name);
    return this.http.get<any>(this.BASE_URL, {params:param1}).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "Server Error")))
}

setUserToken(data:string){
  localStorage.setItem("userName", data);
}

getUserToken():any{
  return localStorage.getItem("userName")
}

setUserId(id:string){
  localStorage.setItem("UserId", id)
}

getUserId():any{
  return localStorage.getItem("UserId")
}

isUserLoggedIn():boolean{
  return localStorage.getItem("userName")!=null
}

setAdminToken(data:string){
  localStorage.setItem("adminName", data);
}

getAdminToken():any{
  return localStorage.getItem("adminName")
}

isAdminLoggedIn():boolean{
  return localStorage.getItem("adminName")!=null
}

deleteAdminToken(){
  localStorage.removeItem("adminName")
}

deleteUserToken(){
  localStorage.removeItem("userName")
}
}
