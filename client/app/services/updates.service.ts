import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

function convertToViewFormat(data) {
  var lines = data.split('\n');
  var retArr = [];
  var retObj = {};
  for (let i in lines) {
    var line = lines[i];
    if (line.match(/^#\s+.+\s+#/)) {
      continue;
    } else if (line.match(/^#\s*.+/)) {
      if (Object.keys(retObj).length > 0) {
        retArr.push(retObj);
      }
      retObj = {};
      let match = line.match(/^#\s*(.+)/);
      retObj['key'] = match[1];
    } else if (line.match(/^\s*-\s*.+/)) {
      let match = line.match(/^\s*-\s*(.+)/);
      if (retObj['value']) {
        retObj['value'].push(match[1]);
      } else {
        retObj['value'] = [match[1]];
      }
    } else {

    }
  }
  return retArr;
}

@Injectable()
export class UpdatesService {
  private url = 'CHANGELOG.md';
  constructor (private http: Http) {}
  getUpdates (): Observable<any[]> {
    return this.http.get(this.url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    return convertToViewFormat(res['_body']) || { };
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