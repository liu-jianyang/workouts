import {
  Http,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  RequestMethod,
  XHRBackend,
  URLSearchParams
} from '@angular/http';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

var getRequestMethod = {};
getRequestMethod[RequestMethod.Get] = 'GET';
getRequestMethod[RequestMethod.Post] = 'POST';
getRequestMethod[RequestMethod.Delete] = 'DELETE';

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: (backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) => {

    //filter: { key: <>, value: <value searching for>, exactMatch: boolean}
    function realHttpGet(url, connection, isJson, filter) {
      let httpRequest = new Http(realBackend, options);
      httpRequest.get(url)
        .map(res => {
          if (isJson) {
            return res.json();
          } else {
            return res['_body'];
          }
        })
        .subscribe(data => {
          var body = data;
          if (filter) {
            body = data.filter(function (row) {
              if (filter.exactMatch) {
                return row[filter.key] = filter.value;
              } else {
                return row[filter.key].indexOf(filter.value) !== -1;
              }
            });
          }
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: body
          })));
        });
    }

    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {
        console.log('%s %s', getRequestMethod[connection.request.method], connection.request.url);
        // authenticate
        if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
          // get parameters from post request
          let params = JSON.parse(connection.request.getBody());

          // find if any user matches login credentials
          let filteredUsers = users.filter(user => {
            return user.username === params.username && user.password === params.password;
          });

          if (filteredUsers.length) {
            // if login details are valid return 200 OK with user details and fake jwt token
            let user = {
              username: filteredUsers[0].username,
              token: 'fake-jwt-token'
            }
            connection.mockRespond(new Response(new ResponseOptions({
              status: 200,
              body: {
                user: user
              }
            })));
          } else {
            // else return 400 bad request
            connection.mockError(new Error('Username or password is incorrect'));
          }
        }

        // logout user
        else if (connection.request.url.endsWith('/api/logout') && connection.request.method === RequestMethod.Post) {
          // get new user object from post body
          let params = JSON.parse(connection.request.getBody());
          // validation
          let loggedInUser = users.filter(user => {
            return user.username === params.username;
          }).length;
          if (!loggedInUser) {
            return connection.mockError(new Error('Username "' + params.username + '" is not logged in'));
          } else {
            // respond 200 OK
            connection.mockRespond(new Response(new ResponseOptions({
              status: 200
            })));
          }
        }

        // create user
        else if (connection.request.url.endsWith('/api/local-reg') && connection.request.method === RequestMethod.Post) {
          // get new user object from post body
          let newUser = JSON.parse(connection.request.getBody());
          // validation
          let duplicateUser = users.filter(user => {
            return user.username === newUser.username;
          }).length;
          if (duplicateUser) {
            return connection.mockError(new Error('Username "' + newUser.username + '" is already taken'));
          }
          var user = {
            username: newUser.username,
            password: newUser.password,
            id: users.length + 1
          };
          // save new user
          users.push(user);
          localStorage.setItem('users', JSON.stringify(users));

          // respond 200 OK
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              user: user
            }
          })));
        }

        // delete user
        else if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            // find user by id in users array
            let urlParts = connection.request.url.split('/');
            let id = parseInt(urlParts[urlParts.length - 1]);
            for (let i = 0; i < users.length; i++) {
              let user = users[i];
              if (user.id === id) {
                // delete user
                users.splice(i, 1);
                localStorage.setItem('users', JSON.stringify(users));
                break;
              }
            }

            // respond 200 OK
            connection.mockRespond(new Response(new ResponseOptions({
              status: 200
            })));
          } else {
            // return 401 not authorised if token is null or invalid
            connection.mockRespond(new Response(new ResponseOptions({
              status: 401
            })));
          }
        }

        else if (connection.request.url.endsWith('/api/loggedin') && connection.request.method === RequestMethod.Get) {
          if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            // respond 200 OK
            connection.mockRespond(new Response(new ResponseOptions({
              status: 200,
              body: true
            })));
          } else {
            // return 200 false
            connection.mockRespond(new Response(new ResponseOptions({
              status: 200,
              body: false
            })));
          }
        }

        //exercises
        else if (connection.request.url.endsWith('/api/exercises') && connection.request.method === RequestMethod.Get) {
          realHttpGet('app/mock/exercises.json', connection, true, undefined);
        }

        else if (connection.request.url.match(/\/api\/exercises/) && connection.request.method === RequestMethod.Get) {
          let params = new URLSearchParams(connection.request.url.split('?')[1]);
          let search = params.get('search');
          realHttpGet('app/mock/exercises.json', connection, true, {key: 'name', value: search, exactMatch: false});
        }

        else if (connection.request.url.endsWith('/api/name-mapping') && connection.request.method === RequestMethod.Get) {
          realHttpGet('app/mock/name-mapping.json', connection, true, undefined);
        }

        else if (connection.request.url.endsWith('CHANGELOG.md') && connection.request.method === RequestMethod.Get) {
          realHttpGet('app/mock/CHANGELOG.md', connection, false, undefined);
        }

        // User specific information
        else if (connection.request.url.endsWith('/api/user/exercises') && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: JSON.parse(localStorage.getItem('userExercises')) || []
          })));
        }

        else if (connection.request.url.endsWith('/api/user/exercises') && connection.request.method === RequestMethod.Post) {
          let userExercises = JSON.parse(connection.request.getBody());
          localStorage.setItem('userExercises', JSON.stringify(userExercises));
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200
          })));
        }

        else if (connection.request.url.endsWith('/api/user/routines') && connection.request.method === RequestMethod.Get) {
          console.log('get:', JSON.parse(localStorage.getItem('routines')));
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: JSON.parse(localStorage.getItem('routines')) || []
          })));
        }

        else if (connection.request.url.endsWith('/api/user/routines') && connection.request.method === RequestMethod.Post) {
          let params = JSON.parse(connection.request.getBody());
          let routines: any[] = JSON.parse(localStorage.getItem('routines')) || [];
          if (params.id !== undefined) {
            let index = routines.findIndex(routine => {
              return routine.id === params.id;
            });
            if (index !== -1) {
              // if routine exists replace
              routines[index] = params;
            } else {
              return connection.mockError(new Error('Routine with the given id does not exist'));
            }
          } else {
            let routine = {
              id: routines.length + 1,
              name: params.routineName,
              exercises: params.exercises,
              user: params.user
            }
            routines.push(routine);
          }
          localStorage.setItem('routines', JSON.stringify(routines));
          console.log('set:', routines);
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200
          })));
        }

        else if (connection.request.url.match(/\/api\/user\/routine\/\d+$/) && connection.request.method === RequestMethod.Delete) {
          if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            // find user by id in users array
            let urlParts = connection.request.url.split('/');
            let id = parseInt(urlParts[urlParts.length - 1]);
            let routines: any[] = JSON.parse(localStorage.getItem('routines')) || [];
            if (id !== undefined) {
              let index = routines.findIndex(routine => {
                return routine.id === id;
              });

              if (index !== -1) {
                // if routine exists replace
                routines.splice(index, 1);
                localStorage.setItem('routines', JSON.stringify(routines));
                connection.mockRespond(new Response(new ResponseOptions({
                  status: 200
                })));
              } else {
                return connection.mockError(new Error('Routine DELETE: Routine with the given id does not exist'));
              }
            } else {
              return connection.mockError(new Error('Routine DELETE: No routine id passed in'));
            }
          }
        }

        else {
          console.log('Not handled:', connection.request.url);
        }

      }, 500);

    });

    return new Http(backend, options);
  },
  deps: [MockBackend, BaseRequestOptions, XHRBackend]
};