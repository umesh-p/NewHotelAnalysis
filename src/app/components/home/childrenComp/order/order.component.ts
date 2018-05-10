import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MenuItemService } from '../../../../services/childServices/menu-item.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {


  //Common Objects
  totaltables:any;

  completeMenu:any = [];
	allCategoriesArray: any;
  allFavouriteItems:any = [];
  Scrolled:number = 0;
  selectedCategory: any;

  tabActive:string = 'tableorder';

  //All Orders Array.
  allOrdersArray:any = [];

  //tableSpecific Orders
  activeTable: any = 1;
  allTableOrders:any = [];
  //For Online Orders
  activeOrder = 0;
  detailOrder:any;
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
  }];

  //For Parvel Orders
  parcelOrders:number = 10;
  allParcelOrders:any = [];

  constructor(private menuService:MenuItemService) { }

  ngOnInit() {

    this.allOrdersArray['tableOrders'] = this.allTableOrders;
    this.allOrdersArray['parcelOrders'] = this.allParcelOrders;
    this.allOrdersArray['onlinOrders'] = this.allOnlineOrders;

    if(sessionStorage.getItem('allOrders')){
      this.allOrdersArray = sessionStorage.getItem('allOrders');
    }else{
      sessionStorage.setItem('allOrders' , this.allOrdersArray);
    }

    this.totaltables = parseInt(sessionStorage.getItem('tableCount'));
    this.detailOrder = this.allOnlineOrders[0];

    this.menuService.getAll().subscribe((result) => {
        this.completeMenu = result['data'];
        this.completeMenu = this.groupBy(this.completeMenu, (c) => c.category);
        this.allCategoriesArray = Object.keys(this.completeMenu);
        this.selectedCategory = this.allCategoriesArray[0];
        this.allFavouriteItems = result['data'].filter((item) => (item.isfavourite.toLowerCase() == 'true' && item.isdisabled.toLowerCase() == 'false' ));
    });

    this.assignTableData();

  }


  groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
  }


  addItemToOrder(item){


    let orderedItem:any;

    console.log(item);

    item.forderdQty = '';
    item.orderdQty = '';

  }

  counter(i: number) {
    return new Array(i);
  }
  selectedTable(tableNumber){
    this.activeTable = tableNumber + 1;





  }

  selectCategory(clickedCategory){
      this.selectedCategory = clickedCategory;
  }
  scroll(ele , direction){

      let maxWidth = ele._scrollLeftMax;
      if(direction == 'left' && this.Scrolled >= 200){
          this.Scrolled = this.Scrolled - 300;
          ele.scrollXTo(this.Scrolled);
      }else if(direction == 'right' && this.Scrolled < maxWidth){
          this.Scrolled = this.Scrolled + 300;
          ele.scrollXTo(this.Scrolled);
      }
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








  }


  //AssignTable Objects to tableOrder Functions
  assignTableData(){


    for(let i = 0; i < this.totaltables ; i++){
        let tableInfoObj:any = {};

        tableInfoObj['tableNumber'] = i;
        tableInfoObj['totalBill'] = 0;
        tableInfoObj['orderedItems'] = [];
        tableInfoObj['status'] = '';
        tableInfoObj['startTime'] = '';
        this.allTableOrders.push(tableInfoObj);
    }

    console.log(this.allTableOrders , this.allOrdersArray)

  }







}
