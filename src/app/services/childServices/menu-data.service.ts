import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment'
import { DataService } from '../data.service';

@Injectable()
export class MenuDataService extends DataService{

  constructor(http: Http) {
    super("../../../assets/json/FixedNav.json" , http);
  }

}
