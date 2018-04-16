import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  showSideNav:boolean = true;
  public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };

  constructor(){}

  ngOnInit(){

  }

}
