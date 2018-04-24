import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment'
import { DataService } from '../data.service';

@Injectable()
export class MenuItemService extends DataService {

  allMenuItems = [];

  constructor(http: Http) {
    super((environment.dataURL + 'menu') , http);
  }


}
