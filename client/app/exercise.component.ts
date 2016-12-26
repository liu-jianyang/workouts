import { Component, Input } from '@angular/core';

@Component({
  selector: 'exercise-component',
  template: `
    <a class="exercise">

      <span class="badge" *ngIf="exercise.id !== 'empty'">{{exercise.level}}</span> {{exercise.name}}
    </a>
  `
})
export class ExerciseComponent {
  @Input()
  exercise;
}