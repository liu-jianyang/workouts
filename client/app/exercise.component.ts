import { Component, Input } from '@angular/core';
import { Exercise } from './exercise';

@Component({
  selector: 'exercise-component',
  template: `
    <a class="exercise">
      <span class="badge" >{{exercise.level}}</span> {{exercise.name}}
    </a>
  `
})
export class ExerciseComponent {
  @Input()
  exercise: Exercise;
}