import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemService } from '../../../../services/childServices/menu-item.service';
import { InventoryService } from '../../../../services/childServices/inventory.service';
import { DashboardService } from '../../../../services/childServices/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


	dashboardData: any = {};
  lessQtyItems:any = [];
  orderedItems:any = [];

  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  public lineChartData:Array<any> = [{'data': [], 'label': 'Orders last 10 Days'}];
  public lineChartLabels:Array<any> = [];
  public lineChartType:string = 'line';

  constructor(private menuService : MenuItemService,
              private router:Router,
              private inventoryService : InventoryService,
              private dashboardService : DashboardService) { }

  ngOnInit() {
    this.inventoryService.getAll().subscribe((result) => {
      this.lessQtyItems = result['data'].filter(item =>((item.qtyPresent <= item.minQty ) && (item.orderedQty == 0)))
      this.orderedItems = result['data'].filter(item => item.orderedQty > 0);
    });


    this.dashboardService.getAll().subscribe((result) => {
        this.dashboardData = JSON.parse(result['data']);
        this.doughnutChartLabels = this.dashboardData['allPaymentMethods'];
        this.doughnutChartData = this.dashboardData['allPaymentCount'];
        this.lineChartLabels = this.dashboardData['lastTenDays'];
        this.lineChartData = [{'data': this.dashboardData['orderCount'], 'label': 'Orders last 10 Days'}];
    })


  }

  goToOrder(){
    this.router.navigateByUrl("home/stockInventory");
  }


  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }


}
