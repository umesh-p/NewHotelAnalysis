import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../../services/childServices/menu-item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  showSideNav = true;

  constructor(private menuService: MenuItemService , private router: Router) {}

  ngOnInit() {

  }

  onSignOut() {
    sessionStorage.setItem('userName', null);
    sessionStorage.setItem('tableCount', null);
    sessionStorage.setItem('zomatoid', null);
    this.router.navigateByUrl('/login');

  }

}
