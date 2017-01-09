import { Component } from '@angular/core';

@Component({
  selector: 'credits',
  templateUrl: 'app/credits.component.html',
  styleUrls: ['app/credits.component.css']
})

export class CreditsComponent {
  private title = 'Credits';
  private list = [
    {
      key: 'Steven Low',
      value: 'Providing the exercises and the progressions'
    }
  ];
}