import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../../services/childServices/menu-item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  showSideNav:boolean = true;

  constructor(private menuService:MenuItemService){}

  ngOnInit(){

  }

  onSignOut(){
    
  }

}
