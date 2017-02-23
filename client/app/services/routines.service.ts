import { Injectable }     from '@angular/core';
import { Http, Headers, Request, RequestOptions, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RoutinesService {
  private addingRoutine = false;
  private routines = [];

  constructor (private http: Http) {}

  loadRoutines (): Observable<any[]> {
    console.log('load routines');
    let url = '/api/user/routines';
    return this.http.get(url, this.jwt())
      .map((res: Response) => {
        console.log('res:', res);
        this.routines = res.json();
        console.log('routines:', this.routines);
      })
      .catch(this.handleError);
  }

  getRoutines() {
    return this.routines;
  }

  getRoutine(routineID): Observable<any[]> {
    let url = '/api/user/routine/' + routineID;
    return this.http.get(url, this.jwt())
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  setRoutine(routine) {
    console.log('setRoutine');
    return this.http.post('/api/user/routines', routine, this.jwt())
      .map((res: Response) => {
        this.loadRoutines();
      })
      .catch(this.handleError);
  }

  deleteRoutine(routineID) {
    return this.http.delete('/api/user/routine/' + routineID, this.jwt())
      .map((res: Response) => {
        this.loadRoutines();
      })
      .catch(this.handleError);
  }

  getAddingRoutine(): boolean {
    return this.addingRoutine;
  }

  setAddingRoutine(bool: boolean) {
    this.addingRoutine = bool;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
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
}