import { Injectable }     from '@angular/core';
import { Http, Headers, RequestOptions, Response, Request, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import * as _ from 'underscore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

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

function replaceStringWithElement(exercise, exerciseLists) {
  for (let i = 0; i < exercise.prerequisites.length; i++) {
    let array = exercise.prerequisites[i].split('_');
    exercise.prerequisites[i] = exerciseLists[array[0]][array[1]];
  }
}

function convertToViewFormat(exercisesArray) {
  var listOfLists = [];
  var exerciseLists = {};

  exercisesArray.forEach(function(exercise) {
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
     if (!exerciseLists[progression]) {
      return;
     }
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
  // hash of eid as key and completed as value
  private userExercises = {};

  constructor (
    private http: Http) {}

  getExercises (): Observable<any[]> {
    let url = '/api/exercises';
    return this.http.get(url)
                    .map(this.extractDataToViewFormat)
                    .catch(this.handleError);
  }

  private extractDataToViewFormat(res: Response) {
    let body = res.json();
    return convertToViewFormat(body) || { };
  }

  getExercise (eid): Observable<any[]> {
    return this.http.get('/api/exercise/' + eid)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.info || '';
  }

  searchExercises(term: string, selectedExercises) {
    if (term === '') {
      return Observable.of([]);
    }

    let url = '/api/exercises';
    let params = new URLSearchParams();
    params.set('search', term);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http
      .get(url, {search: params})
      .map(response => {
        let body = response.json();
        if (selectedExercises.length > 0) {
          for (let i = 0; i < selectedExercises.length; i++) {
            for (let j = 0; j < body.length; j++) {
              if (selectedExercises[i].eid === body[j].eid) {
                body.splice(j, 1);
                break;
              }
            }
          }
        }
        return body;
      });
  }

  setUserExercises(exercises): Observable<any[]> {
    return this.http.post('/api/user/exercises', exercises, this.jwt())
      .map((res: Response) => {
        for (let i = 0; i < exercises.length; i++) {
          let e = exercises[i];
          this.userExercises[e.id] = e.points;
        }
        return true;
      })
      .catch(this.handleError);
  }

  getUserExercises(): Observable<any[]> {
    if (this.userExercises) {
      return Observable.of(this.userExercises);
    }
    return this.http.get('/api/user/exercises', this.jwt())
      .map((res: Response) => {
        this.userExercises = {};
        let body = res.json();
        for (var i = 0; i < body.length; i++) {
          let exercise = body[i];
          this.userExercises[exercise.id] = exercise.points;
        }
        console.log('returning:', this.userExercises);
        return this.userExercises;
      })
      .catch(this.handleError);
  }

  clearUserExercises() {
    this.userExercises = {};
  }

  getExercisePoints(eid) {
    return this.userExercises[eid] || 0;
  }

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({
        'Authorization': 'Bearer ' + currentUser.token
      });
      return new Request(new RequestOptions({
        headers: headers
      }));
    }
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
