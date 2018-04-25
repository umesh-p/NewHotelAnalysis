import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../../../../services/childServices/menu-item.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(private menuService:MenuItemService) { }

  ngOnInit() {
    //console.log(this.menuService.getEnabledMenuItems());
  }

}
