import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment'
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


@Injectable()
export class InventoryService extends DataService {


  allStockItems:any = [];

  constructor(http: Http) {
    super((environment.dataURL + 'inventory') , http);
  }



}
