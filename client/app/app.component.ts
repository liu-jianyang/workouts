import { Component } from '@angular/core';

import { UserService, AuthenticationService, ExercisesService } from './services/index';
@Component({
  selector:'my-app',
  templateUrl: './app/app.component.html',
  styleUrls: ['app/app.component.css']
})

export class AppComponent {
  title = 'Bodyweight exercises';
  private isLoggedIn = false;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private exercisesService: ExercisesService) { }

  ngOnInit() {
    this.userService.loggedIn()
      .subscribe(
        data => {
          this.isLoggedIn = data;
        },
        error => {
          console.log('Failure checking if user is logged in:', error);
          this.isLoggedIn = false;
        });
  }

  ngAfterViewInit() {
    let navBar = document.getElementById('nav-bar');
    let container = document.getElementById('router-container');
    container.style.marginTop = navBar.offsetHeight + 'px';
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(
        data => {
          this.isLoggedIn = false;
          this.exercisesService.clearUserExercises();
        },
        error => {
          console.log('Failure logging out:', error);
        });
  }
}