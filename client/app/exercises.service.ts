import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Rx';
import * as _ from 'underscore';

const LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var progressions = [
  'hs',
  'rhs',
  'hspushups',
  'rhspu',
  'press',
  'presshs',
  'rpresshs',
  'sapresshs',
  'manna',
  'bl',
  'fl',
  'flrow',
  'row',
  'pullup',
  'rpullup',
  'weightedpullup',
  'explosivepullup',
  'ironcross',
  'planche',
  'rplanche',
  'planchepushup',
  'rplanchepushup',
  'pushup',
  'oapushup',
  'dip',
  'rdip',
  'weighteddip',
  'muscleup',
  'el',
  'flag',
  'abs',
  'rstatic',
  'rkip',
  'rfelge',
  'squats'];

  // progressions = ['hspushups', 'ringshs', 'manna'];

function replaceStringWithElement(exercise, exerciseLists) {
  exercise.prerequisites = _.map(exercise.prerequisites, function(prerequisite) {
    let array = prerequisite.split('_');
    return exerciseLists[array[0]][array[1]];
  });
}

function convertToViewFormat(exercisesArray) {
  var listOfLists = [];
  var exerciseLists = {};
  
  _.each(exercisesArray, function(exercise) {
    var progression = exercise.progression;
    
    exercise.id = exercise.eid;
    exercise.prerequisites = exercise.prerequisites ? exercise.prerequisites.split(',') : [];
    if (!exerciseLists[progression]) {
      exerciseLists[progression] = {};
    }
    exerciseLists[progression][exercise.level] = exercise;
  });
  
  LEVELS.forEach(function(levelNum) {
    var row = [];
    progressions.forEach(function(progression) {
      var exercise = exerciseLists[progression][levelNum];
      if (exercise) {
        replaceStringWithElement(exercise, exerciseLists);
      } else {
        exercise = {
          id: 'empty'
        };
      }
      row.push(exercise);
    });
    listOfLists.push(row);
  });
  return listOfLists;
}

@Injectable()
export class ExercisesService {
  private url = 'api/exercises';
  // url = 'app/exercises.json';
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