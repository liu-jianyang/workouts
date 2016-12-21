import { Component } from '@angular/core';
import { Exercise } from './exercise';
import { ExerciseComponent } from './exercise.component';

const EXERCISES_HSPUSHUPS: Exercise[] = [
  { level: 1, progression: 'hsPushups', name: 'Pike HeSPU', prerequisites: [] },
  { level: 2, progression: 'hsPushups', name: 'Box HeSPU', prerequisites: ['hsPushups_1'] },
  { level: 3, progression: 'hsPushups', name: 'Wall HeSPU Ecc', prerequisites: ['hsPushups_2'] },
  { level: 4, progression: 'hsPushups', name: 'Wall HeSPU', prerequisites: ['hsPushups_3'] },
  { level: 5, progression: 'hsPushups', name: 'Wall HSPU', prerequisites: ['hsPushups_4'] },
  { level: 6, progression: 'hsPushups', name: 'Free HeSPU', prerequisites: ['hsPushups_5'] },
  { level: 7, progression: 'hsPushups', name: 'Free HSPU', prerequisites: ['hsPushups_6'] }
];

const EXERCISES_RINGSHS: Exercise[] = [
  { level: 5, progression: 'ringsHS', name: 'R Shld Std', prerequisites: ['hsPushups_5'] },
  { level: 6, progression: 'ringsHS', name: 'R Strap HS', prerequisites: ['ringsHS_5'] },
  { level: 7, progression: 'ringsHS', name: 'R HS', prerequisites: ['ringsHS_6'] }
];

const EXERCISES_MANNA: Exercise[] = [
  { level: 1, progression: 'manna', name: 'Tuck L-sit', prerequisites: [] },
  { level: 2, progression: 'manna', name: '1 Leg Bent L-sit', prerequisites: ['manna_1'] },
  { level: 3, progression: 'manna', name: 'L-sit', prerequisites: ['manna_2'] },
  { level: 4, progression: 'manna', name: 'Straddle L-sit', prerequisites: ['manna_3'] }
];

const EXERCISES = [
  { progression: 'manna', name: 'Manna', exercises: EXERCISES_MANNA },
  { progression: 'ringshs', name: 'Rings Handstand', exercises: EXERCISES_RINGSHS },
  { progression: 'hspushups', name: 'Handstand Pushups', exercises: EXERCISES_HSPUSHUPS }
];

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']
})

export class AppComponent {
  title = 'Bodyweight exercises';
  exerciseLists = EXERCISES;
  selectedExercise: Exercise;
  onSelect(exercise: Exercise): void {
    // console.log('hi');
	  this.selectedExercise = exercise;
	}
}