import {
  Injectable
} from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions,
  Response
} from '@angular/http';

import {
  User
} from '../models/user';

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
    console.log('hi:', currentUser);
    return currentUser.username;
  }

  loggedIn() {
    return this.http.get('/api/loggedin/', this.jwt())
      .map(this.isLoggedIn)
      .catch(this.handleError);
  }

  create(user: User) {
    //TODO: Change depending on what method of registration
    return this.http.post('/api/local-reg', user, this.jwt())
      .map(this.afterAuthenticate)
      .catch(this.handleError);
  }

  login(user: User) {
    return this.http.post('/api/authenticate', user, this.jwt())
      .map(this.afterAuthenticate)
      .catch(this.handleError);
  }

  logout() {
    let user = {
      username: this.getUser();
    }
    return this.http.post('/api/logout', user, this.jwt())
      .map(this.afterLogout)
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
      return new Response(new RequestOptions({
        headers: headers
      }));
    }
  }

  private afterAuthenticate(res: Response) {
    var body = res.json();
    localStorage.setItem('currentUser', JSON.stringify(body.user));
    return true;
  }

  private afterLogout(res: Response) {
    localStorage.removeItem('currentUser');
    return true;
  }

  private isLoggedIn(res: Response) {
    return res._body === 'true';
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