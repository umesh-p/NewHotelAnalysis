import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../../../../services/childServices/menu-item.service';
import { InventoryService } from '../../../../services/childServices/inventory.service';
import { DecimalPipe } from '@angular/common';
import { DailyPlatesService } from '../../../../services/childServices/daily-plates.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-daily-preparations',
  templateUrl: './daily-preparations.component.html',
  styleUrls: ['./daily-preparations.component.scss']
})
export class DailyPreparationsComponent implements OnInit {


  allMenuData = [];
  allStockItems = [];
  allTodaysPreparations = [];

  selectedItem:any = {};

  constructor(private menuService:MenuItemService,
              private inventoryService:InventoryService,
              private dailyPlatesService:DailyPlatesService,
              public toastr: ToastsManager ) { }

  ngOnInit() {

    this.menuService.getAll().subscribe((result) => {
      this.allMenuData = result['data'];
    });
    this.inventoryService.getAll().subscribe((result) => {
      this.allStockItems = result['data'];
    });
    this.dailyPlatesService.getAll().subscribe((result) => {
      this.allTodaysPreparations = result['data'];
    })

  }

  prepareNoOfPlatesOfItem(menuItem , i){

    let item:any = {};
    item['name'] = menuItem.name;
    item['menuIndex'] = i;
    item['noOfPlatesToPrepare'] = menuItem['noOfPlatesToPrepare']
    item['platesperday'] = menuItem['platesperday']
    item['materialUsed'] = []

    for(i in menuItem.materialUsed){

      let qtyRequied = 0;
      if(menuItem.materialUsed[i].unit == 'Gms'){
          menuItem.materialUsed[i].unit = 'Kg';
          menuItem.materialUsed[i].qtyused = menuItem.materialUsed[i].qtyused / 1000;
      }
      qtyRequied = (menuItem.materialUsed[i].qtyused * menuItem['noOfPlatesToPrepare'] / menuItem['platesperday'] );
      menuItem.materialUsed[i]['qtyRequied'] = qtyRequied;
      let stockItem = this.allStockItems.filter((item) => item['itemname'] == menuItem.materialUsed[i]['materialname']);

      if(stockItem[0].qtyPresent < qtyRequied){
        menuItem.materialUsed[i]['isLessInStock'] = true;
      }else{
        menuItem.materialUsed[i]['isLessInStock'] = false;
      }

      item['materialUsed'].push(menuItem.materialUsed[i]);
    }

    this.selectedItem = item;
    menuItem.noOfPlatesToPrepare = '';

  }

  makeItem(menuItem){

    let preparationObject:any = {};

    preparationObject['name'] = menuItem.name;
    preparationObject['noofplates'] = menuItem.noOfPlatesToPrepare;
    preparationObject['dayDate'] = this.getDateString();

    for(let i in menuItem.materialUsed){

      let index = this.allStockItems.findIndex(x => x['itemname'] == menuItem.materialUsed[i]['materialname'] );
      this.allStockItems[index]['qtyPresent'] = this.allStockItems[index]['qtyPresent'] - menuItem.materialUsed[i]['qtyRequied'];
      this.inventoryService.put(this.allStockItems[index]).subscribe((result) => {
      });

    }
    this.allMenuData.splice(menuItem.menuIndex , 1);
    this.selectedItem = {};
    this.allTodaysPreparations.push(preparationObject);
    this.dailyPlatesService.post(preparationObject).subscribe((result)=> {
      this.toastr.success('Menu Has been prepared .' ,"Success" , {showCloseButton : true});
    });
  }

  getDateString(){
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

}
