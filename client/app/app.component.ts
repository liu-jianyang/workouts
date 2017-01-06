import { Component } from '@angular/core';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';

import { Exercise } from './exercise';
import { ExerciseComponent } from './exercise.component';
import { ExerciseGridComponent } from './exercise-grid.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  providers: [NgbTooltipConfig]
})

export class AppComponent {
  title = 'Bodyweight exercises';
  selectedExercise: Exercise;
  constructor(config: NgbTooltipConfig) {
    // customize default values of tooltips used by this component tree
    config.placement = 'right';
    config.container = 'body';
  }
  onSelect(exercise: Exercise): void {
    // console.log('hi');
	  this.selectedExercise = exercise;
	}
}