import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AuthenticationService } from '../../services/index';
 
@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  loginError;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loginError = '';
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log('Login error:', error);
          this.loginError = error;
          this.loading = false;
        });
  }
}