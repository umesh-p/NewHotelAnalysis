import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DataService } from '../data.service';
import { Http } from '@angular/http';

@Injectable()
export class CategoryService extends DataService {


  allCategories: any = [];

  constructor(http: Http) {
    super((environment.dataURL + 'category') , http);
  }


}
