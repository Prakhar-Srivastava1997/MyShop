import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserserviceService } from '../services/userservice.service';

@Injectable({
  providedIn: 'root'
})
export class AdmingaurdGuard implements CanActivate {

  constructor(private userServ:UserserviceService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    if(this.userServ.isAdminLoggedIn()){
      return true;
    }
    alert("You Don't have access rights...")
    return false;
  }
  
}
