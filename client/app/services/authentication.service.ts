import {
  Injectable
} from '@angular/core';
import {
  Http,
  Headers,
  Response
} from '@angular/http';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) {}

  login(username: string, password: string) {
    return this.http.post('/api/authenticate', {
        username: username,
        password: password
      })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let body = response.json();
        localStorage.setItem('currentUser', JSON.stringify(body.user));
      })
      .catch(this.handleError);
  }

  logout() {
    let user = {
      username: JSON.parse(localStorage.getItem('currentUser')).username
    }
    return this.http.post('/api/logout', user)
      .map((response: Response) => {
        localStorage.removeItem('currentUser');
      })
      .catch(this.handleError);
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