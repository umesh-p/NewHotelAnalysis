import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class DataService {

  private apiURL =  environment.dataURL;
  private headerOptions = {};

  constructor(private http : Http) {
  }

  get(httpEndpoint){
    return this.http.get(httpEndpoint);
  }

  post(httpEndpoint , data){
    return this.http.post(this.apiURL+httpEndpoint , JSON.stringify(data));
  }

  put(httpEndpoint , data){
    return this.http.put(httpEndpoint , JSON.stringify(data));
  }

  patch(httpEndpoint , dataProperty){
    return this.http.patch(httpEndpoint , JSON.stringify(dataProperty));
  }

  delete(httpEndpoint , id){
    return this.http.delete(httpEndpoint , id)
  }

}
