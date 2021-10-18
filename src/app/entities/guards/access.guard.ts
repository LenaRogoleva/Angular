import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/Auth-service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {

  public key: number = 0;

  constructor(private _authService: AuthService, private toastr: ToastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this._authService.key$.subscribe(key => {
      this.key = key
    })

    if (this.key > 0) {
      return true;
    } else {
      this.toastr.warning('Пожалуйста, авторизуйтесь ^^,')
      return false
    }
  }

}
