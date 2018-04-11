import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { AppError } from '../common/errors/app-error';
import { NotFoundError } from '../common/errors/not-found-error';

@Injectable()
export class DataService {

  private headerOptions = {};

  constructor(private httpEndpoint:string , private http : Http) {
  }

  get(){
    return this.http.get(this.httpEndpoint)
    .map(response => response.json())
    .catch(this.handleError);
  }

  post(data){
    return this.http.post(this.httpEndpoint , JSON.stringify(data))
    .map(response => response.json())
    .catch(this.handleError);
  }

  put(data){
    return this.http.put(this.httpEndpoint , JSON.stringify(data))
    .map(response => response.json())
    .catch(this.handleError);
  }

  patch(dataProperty){
    return this.http.patch(this.httpEndpoint , JSON.stringify(dataProperty))
    .map(response => response.json())
    .catch(this.handleError);
  }

  delete(id){
    return this.http.delete(this.httpEndpoint , id)
    .map(response => response.json())
    .catch(this.handleError);
  }

  private handleError(error:Response){
    if(error.status === 404)
      return Observable.throw(new NotFoundError(error));
    if(error.status === 400)
      return Observable.throw(new NotFoundError(error));

    return Observable.throw(new AppError(error));
  }

}
