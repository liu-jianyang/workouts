import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
import { UserService } from '../../services/index';
 
@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html'
})
 
export class RegisterComponent {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService) { }

  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
        data => {
          // set success message and pass true paramater to persist the message after redirecting to the login page
          console.log('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }
}