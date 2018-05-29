import { Injectable, Inject } from '@angular/core';
import { Http, Headers , RequestOptionsArgs, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { AppError } from '../common/errors/app-error';
import { NotFoundError } from '../common/errors/not-found-error';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {


	httpOptions: { headers: any; };

  constructor(@Inject('string') private httpEndpoint: string, private http: Http) {
  }


  getAll() {
    return this.http.get(this.httpEndpoint, this.getHttpOptions(''))
    .map(response => response.json())
    .catch(this.handleError);
  }

  post(data) {
    return this.http.post(this.httpEndpoint , JSON.stringify(data) , this.getHttpOptions(''))
    .map(response => response.json())
    .catch(this.handleError);
  }

  put(data) {
    return this.http.put(this.httpEndpoint , JSON.stringify(data) , this.getHttpOptions(''))
    .map(response => response.json())
    .catch(this.handleError);
  }

  patch(dataProperty) {
    return this.http.patch(this.httpEndpoint , JSON.stringify(dataProperty) , this.getHttpOptions(''))
    .map(response => response.json())
    .catch(this.handleError);
  }

  delete(id) {
    return this.http.delete(this.httpEndpoint , this.getHttpOptions(id))
    .map(response => response.json())
    .catch(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 404) {
      return Observable.throw(new NotFoundError(error));
    }
    if (error.status === 400) {
      return Observable.throw(new NotFoundError(error));
    }

    return Observable.throw(new AppError(error));
  }


  getHttpOptions(id) {

    const userName = sessionStorage.getItem('userName');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (userName) {
      headers.append('userName', `${userName}`);
    }
		if (id) {
			headers.append('recordId', `${id}`);
		}

    const options = new RequestOptions({ headers : headers });
    return options;

  }


}
