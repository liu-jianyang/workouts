import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './index';

@Injectable()
export class AuthenticationGuard implements canActivateChild {

  constructor(
    private us: UserService
  ) {}

  canActivateChild(): Observable<any> {
    return this.us.loggedIn();
  }
}