import { Component, OnInit ,Input } from '@angular/core';
import { MenuDataService } from "../../services/childServices/menu-data.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input('sideNavHideShow') sideNavHideShow:boolean = true;

  menuDataArray:any = [];
  constructor(private menuData : MenuDataService) { }


  ngOnInit() {
    this.menuData.getAll().subscribe((result) => {
      this.menuDataArray = result;
    })
    ;
  }

}
