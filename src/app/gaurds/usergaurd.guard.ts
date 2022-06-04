import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserserviceService } from '../services/userservice.service';

@Injectable({
  providedIn: 'root'
})
export class UsergaurdGuard implements CanActivate {

  constructor(private userServ:UserserviceService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    if(this.userServ.isUserLoggedIn()){
      return true;
    }
    alert("You don't have access rights....")
    return false;
  }
  
}
