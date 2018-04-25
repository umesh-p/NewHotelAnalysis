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

  getMenuData(): any{

    if(this.allMenuItems.length == 0){
      this.getAll().subscribe((result)=> {
          this.allMenuItems = result['data'];
          for(let i in this.allMenuItems){
            this.allMenuItems[i]["isfavourite"] = this.allMenuItems[i]["isfavourite"].toLowerCase() == "true" ? true : false ;
            this.allMenuItems[i]["isdisabled"] = this.allMenuItems[i]["isdisabled"].toLowerCase() == "true" ? true : false ;
            this.allMenuItems[i]["availableat"] = this.allMenuItems[i]["availableat"].toString() ;

          }
          return this.allMenuItems;
      });
    }
    else{
      return this.allMenuItems;
    }
  }

  getEnabledMenuItems():any{

    let enableMenuItems = this.allMenuItems.filter(item => item.isdisabled == false)

    return enableMenuItems;

  }





}
