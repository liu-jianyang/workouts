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

  getAll() {
    return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  loggedIn() {
    return this.http.get('/api/loggedin/', this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
    //TODO: Change depending on what method of registration
    return this.http.post('/api/local-reg', user, this.jwt()).map(this.createFunc);
  }

  update(user: User) {
    return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('currentUser:', currentUser);
    if (currentUser && currentUser.token) {
      let headers = new Headers({
        'Authorization': 'Bearer ' + currentUser.token
      });
      return new Response(new RequestOptions({
        headers: headers
      }));
    }
  }


  private createFunc(res: Response) {
    var body = res.json();
    localStorage.setItem('currentUser', body.user);
    return res.json();
  }
}