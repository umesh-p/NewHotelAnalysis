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
  }

}
