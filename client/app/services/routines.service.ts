import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

var json = [
  {id: 1, name: 'Routine1'},
  {id: 2, name: 'Routine2'}
];

var routine = {
  id: 1,
  name: 'Routine1',
  exercises: [
    {id: 'hsPushups_1', name: 'Pike HeSPU'},
    {id: 'hs_1', name: 'Wall HS'}
  ]
}

@Injectable()
export class RoutinesService {
  private url = '';
  // url = 'app/mock/name-mapping.json';
  constructor (private http: Http) {}
  getRoutines (): Observable<any[]> {
    return new Promise((resolve, reject) => {
      resolve(json);
    });
    // return this.http.get(this.url)
    //                 .map(this.extractData)
    //                 .catch(this.handleError);
  }

  getRoutine(routineID): Observable<any[]> {
    return new Promise((resolve, reject) => {
      resolve(routine);
    });
  }
  // private extractData(res: Response) {
  //   let body = res.json();
  //   let data = {};
  //   body.forEach(function(ele) {
  //     data[ele.key] = ele.value;
  //   });
  //   return data || { };
  // }

  // private handleError (error: Response | any) {
  //   // In a real world app, we might use a remote logging infrastructure
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }
}