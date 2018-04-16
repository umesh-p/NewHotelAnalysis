import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment'
import { DataService } from '../data.service';


@Injectable()
export class InventoryService extends DataService {



  constructor(http: Http) {
    super((environment.dataURL + 'inventory') , http);
  }




}
