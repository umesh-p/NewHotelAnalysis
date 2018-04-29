import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../../../../services/childServices/menu-item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(private menuService : MenuItemService) { }

  ngOnInit() {
    this.menuService.getMenuData();
    this.showData();
  }

  showStockData(){

  }











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
