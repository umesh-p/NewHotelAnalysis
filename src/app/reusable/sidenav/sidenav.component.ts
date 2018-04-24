import { Component, OnInit ,Input , Output } from '@angular/core';
import { MenuDataService } from "../../services/childServices/menu-data.service";
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input('sideNavHideShow') sideNavHideShow:boolean = true;

  @Output ('closeSideNav') closeSideNavEvent = new EventEmitter<boolean>();

  menuDataArray:any = [];
  constructor(private menuData : MenuDataService) { }


  ngOnInit() {
    this.menuData.getAll().subscribe((result) => {
      this.menuDataArray = result;
    });
  }

  closeSideNav(){
    this.sideNavHideShow = !this.sideNavHideShow;
    this.closeSideNavEvent.emit(this.sideNavHideShow);

  }

}
