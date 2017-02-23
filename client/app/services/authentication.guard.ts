import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';
import { UserService } from './index';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationGuard implements CanActivateChild {

  constructor(
    private us: UserService
  ) {}

  canActivateChild(): Observable<any> {
    return this.us.loggedIn();
  }
}