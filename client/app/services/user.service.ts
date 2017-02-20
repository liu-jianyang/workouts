import {
  Injectable
} from '@angular/core';
import {
  Http,
  Headers,
  Request,
  RequestOptions,
  Response
} from '@angular/http';

import {
  User
} from '../shared/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  // getAll() {
  //   return this.http.get('/api/users', this.jwt())
  //     .map((response: Response) => response.json())
  //     .catch(this.handleError);
  // }

  getUser() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.username;
  }

  loggedIn() {
    return this.http.get('/api/loggedin', this.jwt())
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      })
      .catch(this.handleError);
  }

  create(user: User) {
    //TODO: Change depending on what method of registration
    return this.http.post('/api/local-reg', user, this.jwt())
      .map((response: Response) => {
        var body = response.json();
        localStorage.setItem('currentUser', JSON.stringify(body.user));
        return true;
      })
      .catch(this.handleError);
  }

  // update(user: User) {
  //   return this.http.put('/api/users/' + user.id, user, this.jwt())
  //     .map((response: Response) => response.json())
  //     .catch(this.handleError);
  // }

  // delete(id: number) {
  //   return this.http.delete('/api/users/' + id, this.jwt())
  //     .map((response: Response) => response.json())
  //     .catch(this.handleError);
  // }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({
        'Authorization': 'Bearer ' + currentUser.token
      });
      console.log('headers:', headers.get('Authorization'));
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