import { Component, Input } from '@angular/core';
import { Exercise } from './exercise';
@Component({
  selector: 'exercise-detail',
  template: `
    <div *ngIf="exercise">
      <h2>{{exercise.name}} details!</h2>
      <div><label>level: </label>{{exercise.level}}</div>
      <div>
        <label>name: {{exercise.name}}</label>
      </div>
    </div>
  `
})
export class ExerciseDetailComponent {
  @Input()
  exercise: Exercise;
}