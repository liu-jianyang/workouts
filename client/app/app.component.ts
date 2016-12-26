import { Component } from '@angular/core';
import { Exercise } from './exercise';
import { ExerciseComponent } from './exercise.component';

const EXERCISES_HSPUSHUPS = {
  1: { id: 'hsPushups_1', progression: 'hspushups', level: 1, name: 'Pike HeSPU', prerequisites: [] },
  2: { id: 'hsPushups_2', progression: 'hspushups', level: 2, name: 'Box HeSPU', prerequisites: ['hsPushups_1'] },
  3: { id: 'hsPushups_3', progression: 'hspushups', level: 3, name: 'Wall HeSPU Ecc', prerequisites: ['hsPushups_2'] },
  4: { id: 'hsPushups_4', progression: 'hspushups', level: 4, name: 'Wall HeSPU', prerequisites: ['hsPushups_3'] },
  5: { id: 'hsPushups_5', progression: 'hspushups', level: 5, name: 'Wall HSPU', prerequisites: ['hsPushups_4'] },
  6: { id: 'hsPushups_6', progression: 'hspushups', level: 6, name: 'Free HeSPU', prerequisites: ['hsPushups_5'] },
  7: { id: 'hsPushups_7', progression: 'hspushups', level: 7, name: 'Free HSPU', prerequisites: ['hsPushups_6'] }
};

const EXERCISES_RINGSHS = {
  5: { id: 'ringsHS_5', progression: 'ringshs', level: 5, name: 'R Shld Std', prerequisites: ['hsPushups_5'] },
  6: { id: 'ringsHS_6', progression: 'ringshs', level: 6, name: 'R Strap HS', prerequisites: ['ringsHS_5'] },
  7: { id: 'ringsHS_7', progression: 'ringshs', level: 7, name: 'R HS', prerequisites: ['ringsHS_6'] }
};

const EXERCISES_MANNA = {
  1: { id: 'manna_1', progression: 'manna', level: 1, name: 'Tuck L-sit', prerequisites: [] },
  2: { id: 'manna_2', progression: 'manna', level: 2, name: '1 Leg Bent L-sit', prerequisites: ['manna_1'] },
  3: { id: 'manna_3', progression: 'manna', level: 3, name: 'L-sit', prerequisites: ['manna_2'] },
  4: { id: 'manna_4', progression: 'manna', level: 4, name: 'Straddle L-sit', prerequisites: ['manna_3'] }
};

const LEVELS: Number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10
]

const EXERCISES = [
  { progression: 'manna', name: 'Manna', exercises: EXERCISES_MANNA },
  { progression: 'ringshs', name: 'Rings Handstand', exercises: EXERCISES_RINGSHS },
  { progression: 'hspushups', name: 'Handstand Pushups', exercises: EXERCISES_HSPUSHUPS }
];

function convertToViewFormat(levels, exerciseLists) {
  var listOfLists = [];

  for (let i = 0; i < levels.length; i++) {
    var level = {
      level: levels[i],
      type: 'level'
    }
    var row = [level];
    for (let j = 0; j < exerciseLists.length; j++) {
      var list = exerciseLists[j];
      if (list[i + 1]) {
        row.push(list[i+1]);
      } else {
        var exercise = {
          id: 'empty'
        };
        row.push(exercise);
      }
      
    }

    listOfLists.push(row);
  }
  console.log('list:', listOfLists);
  return listOfLists;
}

  

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']
})

export class AppComponent {
  title = 'Bodyweight exercises';
  exerciseLists = convertToViewFormat(LEVELS, [EXERCISES_MANNA, EXERCISES_HSPUSHUPS, EXERCISES_RINGSHS]);
  selectedExercise: Exercise;
  onSelect(exercise: Exercise): void {
    // console.log('hi');
	  this.selectedExercise = exercise;
	}
}