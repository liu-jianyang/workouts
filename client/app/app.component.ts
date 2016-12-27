import { Component } from '@angular/core';

import { Exercise } from './exercise';
import { ExerciseComponent } from './exercise.component';
import { ExerciseGridComponent } from './exercise-grid.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']
})

export class AppComponent {
  title = 'Bodyweight exercises';
  selectedExercise: Exercise;
  onSelect(exercise: Exercise): void {
    // console.log('hi');
	  this.selectedExercise = exercise;
	}
}