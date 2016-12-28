import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Rx';
import * as _ from 'underscore';

const LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function convertToViewFormat(exercisesObj) {
  var listOfLists = [];
  let exerciseLists = {};

  _.each(exercisesObj, function(list, nameOfList) {
    let newExerciseList = {};
    _.each(list, function(exercise) {
      newExerciseList[exercise.level] = exercise;
    })
    exerciseLists[nameOfList] = newExerciseList;
  });

  for (let i = 0; i < LEVELS.length; i++) {
    var level = {
      level: LEVELS[i],
      type: 'level'
    }
    var row = [level];
    _.each(exerciseLists, function(list, nameOfList) {
      if (list[i + 1]) {
        let exercise = list[i+1];
        //replace string prerequisite with actual element
        exercise.prerequisites = _.map(exercise.prerequisites, function(prerequisite) {
          let array = prerequisite.split('_');
          return exerciseLists[array[0]][array[1]];
        });
        row.push(exercise);
      } else {
        var exercise = {
          id: 'empty'
        };
        row.push(exercise);
      }
    });

    listOfLists.push(row);
  }
  return listOfLists;
}

@Injectable()
export class ExercisesService {
  private url = 'app/exercises.json';
  constructor (private http: Http) {}
  getExercises (): Observable<any[]> {
    return this.http.get(this.url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return convertToViewFormat(body) || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}