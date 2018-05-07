import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../../../../services/childServices/menu-item.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {


  tabActive:string = 'tableorder';



  onlineOrders:number = 20;
  allOnlineOrders:any = [{
    "orderNumber":1,
    "orderSource":"zomato",
    "orderName":"abc",
    "totalBill":80,
    "orderItems":[{
        "itemName":"pohe",
        "qty":2,
        "price": 20
    },{
        "itemName":"upma",
        "qty":2,
        "price": 20
    }]
  },{
    "orderNumber":2,
    "orderSource":"FoodPanda",
    "orderName":"XYZ",
    "totalBill":80,
    "orderItems":[{
        "itemName":"pohe",
        "qty":2,
        "price": 20
    },{
        "itemName":"upma",
        "qty":2,
        "price": 20
    }]
  },{
    "orderNumber":3,
    "orderSource":"Swiggy",
    "orderName":"qwe",
    "totalBill":80,
    "orderItems":[{
        "itemName":"pohe",
        "qty":2,
        "price": 20
    },{
        "itemName":"upma",
        "qty":2,
        "price":20
    }]
  }];
  activeOrder = 0;
  detailOrder:any;

  tableOrders:number = 0;
  parcelOrders:number = 10;

  completeMenu:any = [];
	allCategoriesArray: any;

  constructor(private menuService:MenuItemService) { }

  ngOnInit() {
    this.tableOrders = parseInt(sessionStorage.getItem('tableCount'));
    this.detailOrder = this.allOnlineOrders[0];

    this.menuService.getAll().subscribe((result) => {
        this.completeMenu = result['data'];
        this.completeMenu = this.groupBy(this.completeMenu, (c) => c.category);
        this.allCategoriesArray = Object.keys(this.completeMenu)
    });

  }


  groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
  }









  //Online order functions...

  showOrderDetails(onlineOrder){
      this.activeOrder = onlineOrder;
      this.detailOrder = this.allOnlineOrders[onlineOrder];
  }

  onlineOrderDispatched(detailOrder){
      this.allOnlineOrders.splice(this.activeOrder , 1);
      this.activeOrder = 0;
      this.detailOrder = this.allOnlineOrders[0];
      this.submitOrder(detailOrder);

  }


  // Common submit order function .
  submitOrder(order:any){

    console.log(order)

  }





}
