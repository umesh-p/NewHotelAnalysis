import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  title:string = 'app';

  constructor( public toastr: ToastsManager, private vRef: ViewContainerRef)
 {
   this.toastr.setRootViewContainerRef(vRef);
 }

}
