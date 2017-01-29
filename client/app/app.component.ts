import {Component} from '@angular/core';

import { UserService } from './services/index';
@Component({
  selector:'my-app',
  templateUrl: './app/app.component.html',
  styleUrls: ['app/app.component.css']
})

export class AppComponent {
  title = 'Bodyweight exercises';
  private isLoggedIn = false;

  constructor(
    private userService: UserService) { }

  ngOnInit() {
    console.log('app.component init');
    this.userService.loggedIn()
      .subscribe(
        data => {
          this.isLoggedIn = data;
        },
        error => {
          console.log('Failure:', error);
          this.isLoggedIn = false;
        });
  }

  ngAfterViewInit() {
    let navBar = document.getElementById('nav-bar');
    let container = document.getElementById('router-container');
    container.style.marginTop = navBar.offsetHeight + 'px';
  }

  logout() {
    console.log('called');
    this.userService.logout()
      .subscribe(
        data => {
          if (data) {
            this.isLoggedIn = false;
          }
        },
        error => {
          console.log('Failure logging out:', error);
        });
  }
}