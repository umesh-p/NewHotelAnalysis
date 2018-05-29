import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';

@Injectable()
export class RegisterService extends DataService {

  constructor(http: Http) {
    super((environment.dataURL + 'register'), http);
  }

}
