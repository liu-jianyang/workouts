import {Component} from '@angular/core';

@Component({
  selector:'my-app',
  templateUrl: './app/app.component.html',
  styleUrls: ['app/app.component.css']
})

export class AppComponent {
  title = 'Bodyweight exercises';

  ngAfterViewInit() {
    let navBar = document.getElementById('nav-bar');
    let container = document.getElementById('router-container');
    container.style.marginTop = navBar.offsetHeight + 'px';
  }
}