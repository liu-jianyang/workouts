import { Component } from '@angular/core';
import { Exercise } from './exercise';

const exercises: Exercise[] = [
  { level: 11, progression: 'planche', name: 'Mr. Nice' },
  { level: 12, progression: 'planche', name: 'Narco' },
  { level: 13, progression: 'planche', name: 'Bombasto' },
  { level: 14, progression: 'planche', name: 'Celeritas' },
  { level: 15, progression: 'planche', name: 'Magneta' },
  { level: 16, progression: 'planche', name: 'RubberMan' },
  { level: 17, progression: 'planche', name: 'Dynama' },
  { level: 18, progression: 'planche', name: 'Dr IQ' },
  { level: 19, progression: 'planche', name: 'Magma' },
  { level: 20, progression: 'planche', name: 'Tornado' }
];

@Component({
  selector: 'my-app',
  template: `
	  <h1>{{title}}</h1>
	  <ul class="exercises">
	    <li *ngFor="let exercise of exercises"
	      [class.selected]="exercise === selectedExercise"
	      (click)="onSelect(exercise)">
	      <span class="badge">{{exercise.level}}</span> {{exercise.name}}
	    </li>
	  </ul>
	  <exercise-detail [exercise]="selectedExercise"></exercise-detail>
  	`,
  styles: [`
	  .selected {
	    background-color: #CFD8DC !important;
	    color: white;
	  }
	  .exercises {
	    margin: 0 0 2em 0;
	    list-style-type: none;
	    padding: 0;
	    width: 15em;
	  }
	  .exercises li {
	    cursor: pointer;
	    position: relative;
	    left: 0;
	    background-color: #EEE;
	    margin: .5em;
	    padding: .3em 0;
	    height: 1.6em;
	    border-radius: 4px;
	  }
	  .exercises li.selected:hover {
	    background-color: #BBD8DC !important;
	    color: white;
	  }
	  .exercises li:hover {
	    color: #607D8B;
	    background-color: #DDD;
	    left: .1em;
	  }
	  .exercises .text {
	    position: relative;
	    top: -3px;
	  }
	  .exercises .badge {
	    display: inline-block;
	    font-size: small;
	    color: white;
	    padding: 0.8em 0.7em 0 0.7em;
	    background-color: #607D8B;
	    line-height: 1em;
	    position: relative;
	    left: -1px;
	    top: -4px;
	    height: 1.8em;
	    margin-right: .8em;
	    border-radius: 4px 0 0 4px;
	  }
	`]
})

export class AppComponent {
  title = 'Tour of exercises';
  exercises = exercises;
  selectedExercise: Exercise;
  onSelect(exercise: Exercise): void {
	  this.selectedExercise = exercise;
	}
}