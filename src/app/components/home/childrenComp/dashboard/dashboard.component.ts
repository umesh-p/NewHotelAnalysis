import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemService } from '../../../../services/childServices/menu-item.service';
import { InventoryService } from '../../../../services/childServices/inventory.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  lessQtyItems:any = [];
  orderedItems:any = [];

  constructor(private menuService : MenuItemService , private router:Router , private inventoryService : InventoryService) { }

  ngOnInit() {
    this.inventoryService.getAll().subscribe((result) => {
      this.lessQtyItems = result['data'].filter(item =>((item.qtyPresent <= item.minQty ) && (item.orderedQty == 0)))
      this.orderedItems = result['data'].filter(item => item.orderedQty > 0);
    });

  }

  goToOrder(){
    this.router.navigateByUrl("home/stockInventory");
  }

  public doughnutChartLabels:string[] = ['Table Orders', 'Parcels', 'Online Orders'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40 , 90, 80, 78, 67 , 55], label: 'Orders'},
    {data: [28, 48, 40, 19, 86, 27, 90, 55, 40 , 90, 80, 78], label: 'Sales'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July' ,'August','Septmber','October','November','December'];
  public lineChartType:string = 'line';


  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }


}
