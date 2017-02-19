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
      value: 'Provided the exercises and the progressions @ ',
      html: {
        route: '<a target="_blank" href="http://www.eatmoveimprove.com/">EatMoveImprove</a>'
      }
    }
  ];
}