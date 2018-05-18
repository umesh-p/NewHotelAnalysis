import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MenuItemService } from '../../../../services/childServices/menu-item.service';
import { OrderService } from '../../../../services/childServices/order-service.service';
import { ToastsManager } from 'ng2-toastr';
import { DecimalPipe } from '@angular/common';

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

  //tableSpecific Orders
  activeTable: any = 1;
  allTableOrders:any = [];
  activetableOrder:any;

  //For Online Orders
  activeOrder = 0;
  detailOrder:any;
  allOnlineOrders:any = [];

  //all Parcel Orders

  parcelOrders:number = 10;
  allParcelOrders:any = [];

  constructor(private menuService:MenuItemService ,
              private orderService : OrderService,
              public toastr: ToastsManager) { }
  ngOnInit() {

    this.totaltables = parseInt(sessionStorage.getItem('tableCount'));

    this.allOnlineOrders = this.orderService.getOnlineOrdersObject();
    this.allTableOrders = this.orderService.getTableOrdersObject();
    this.allParcelOrders = this.orderService.getParcelOrdersObject()

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

  selectedTable(tableNumber){
    this.activeTable = tableNumber + 1;
    this.activetableOrder = this.allTableOrders[tableNumber];
  }

  addItemToOrder(item){

    let orderedItem:any = {};
    let dateObj = new Date();
    orderedItem['name'] = item['name'];
    orderedItem['orderedqty'] = item.forderdQty ? item.forderdQty : item.orderdQty;
    orderedItem['totalprice'] = (orderedItem['orderedqty'] * item['sellingprice']);
    orderedItem['totalcost'] = (orderedItem['orderedqty'] * item['costprice']);
    orderedItem['sellingprice'] = item['sellingprice']
    orderedItem['category'] = item['category'];

    this.activetableOrder.totalBill = this.activetableOrder.totalBill + orderedItem['totalprice'];

    this.activetableOrder.orderedItems.push(orderedItem);

    if(this.activetableOrder.orderedItems.length == 1){
      this.activetableOrder['startTime'] = dateObj.getTime();
    }else if(this.activetableOrder.orderedItems.length == 0){
      this.activetableOrder['startTime'] = 0;
    }

    if(this.activetableOrder.orderedItems.length > 0){
      this.activetableOrder.status = 'busy';
    }

    item.orderdQty = '';
    item.forderdQty = '';
  }

  qtyChanged(index , item){
    let newPrice = (item['orderedqty'] * item['sellingprice']);
    this.activetableOrder.totalBill = this.activetableOrder.totalBill - item['totalprice'] + newPrice;
    this.activetableOrder.orderedItems[index]['totalprice'] = newPrice;
  }

  removeOrderedItem(index , item){
    this.activetableOrder.totalBill = this.activetableOrder.totalBill - item['totalprice'];
    this.activetableOrder.orderedItems.splice(index , 1);
    if(this.activetableOrder.orderedItems.length == 0){
      this.activetableOrder.status = 'open';
    }
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

  this.allTableOrders[order.tableNumber] = this.getNewTableObject(order.tableNumber);
  this.activetableOrder = this.allTableOrders[order.tableNumber];

  let orderObject:any = {};
  let dateObj = new Date();

  orderObject['customername'] = "abc";
  orderObject['year'] = dateObj.getFullYear();
  orderObject['month'] = dateObj.getMonth() + 1;
  orderObject['day'] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dateObj.getDay()];
  orderObject['date'] = dateObj.getDate();
  orderObject['hour'] =dateObj.getHours();
  orderObject['totaltime'] = dateObj.getTime() - order['startTime'];
  orderObject['totalbillamt'] = order['totalBill'];
  orderObject['waitingtime'] = 0;
  orderObject['ordermethod'] = this.tabActive;
  orderObject['orderedItems'] = order.orderedItems;
  orderObject['paymentmethod'] = order.paymentmethod;

    this.orderService.post(orderObject).subscribe((result) => {
      this.toastr.success('Order Successfully Submitted' ,"Success" , {showCloseButton : true});
    });

  }
  //AssignTable Objects to tableOrder Functions
  assignTableData(){
    for(let i = 0; i < this.totaltables ; i++){
        this.allTableOrders.push(this.getNewTableObject(i));
    }
    this.activetableOrder = this.allTableOrders[0];
  }

  getNewTableObject(index){
    let tableInfoObj:any = {};

    tableInfoObj['tableNumber'] = index;
    tableInfoObj['totalBill'] = 0;
    tableInfoObj['orderedItems'] = [];
    tableInfoObj['status'] = 'open';
    tableInfoObj['startTime'] = '';
    tableInfoObj['paymentmethod'] = 'cash';

    return tableInfoObj;
  }

}
