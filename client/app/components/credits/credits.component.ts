import { Component } from '@angular/core';

@Component({
  selector: 'credits',
  templateUrl: 'app/components/credits/credits.component.html',
  styleUrls: ['app/components/credits/credits.component.css']
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