import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class DailyPlatesService extends DataService {


  constructor(http: Http) {
    super((environment.dataURL + 'dailyPlates') , http);
  }

}
