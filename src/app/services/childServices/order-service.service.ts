import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class OrderService extends DataService {


  allParcelOrders: any = [];

  allOnlineOrders: any = [{
    'orderNumber': 1,
    'orderSource': 'zomato',
    'orderName': 'abc',
    'totalBill': 80,
    'orderItems': [{
        'itemName': 'pohe',
        'qty': 2,
        'price': 20
    }, {
        'itemName': 'upma',
        'qty': 2,
        'price': 20
    }]
  }];

  allTableOrders: any = [];

  constructor(http: Http) {
    super((environment.dataURL + 'saveOrder'), http);
  }

  getTableOrdersObject() {
    return this.allTableOrders;
  }

  getParcelOrdersObject() {
    return this.allParcelOrders;
  }

  getOnlineOrdersObject() {
    return this.allOnlineOrders;
  }


}
