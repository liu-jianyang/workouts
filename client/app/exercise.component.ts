import { Component, Input } from '@angular/core';
import { Exercise } from './exercise';

@Component({
  selector: 'exercise-component',
  templateUrl: 'app/exercise.component.html',
  styleUrls: ['app/exercise.component.css']
})

export class ExerciseComponent {
  @Input()
  exercise;
  onMouseOver(exercise: Exercise): void {
    console.log('hi:');
  };
}