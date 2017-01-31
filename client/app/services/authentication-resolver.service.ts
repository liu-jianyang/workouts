import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './index';

@Injectable()
export class AuthenticationResolver implements Resolve<any> {

  constructor(
    private us: UserService, 
    private router: Router
  ) {}

  resolve(): Observable<any> {
    this.us.loggedIn()
      .subscribe(
        data => {
          if (data) {
            this.router.navigate(['/']);
            return null;
          } else { // id not found
            return false;
          }
        },
        error => {
          console.log('Failure checking if user is logged in:', error);
          return false;
        });
  }
}