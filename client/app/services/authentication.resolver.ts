import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './index';

@Injectable()
export class AuthenticationResolver implements Resolve<any> {

  constructor(
    private us: UserService, 
    private router: Router
  ) {}

  resolve(): Observable<any> {
    return Observable.fromPromise(this.us.loggedIn());
  }
}