import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { AppError } from '../../common/errors/app-error';
import { NotFoundError } from '../../common/errors/not-found-error';

import { LoginService } from '../../services/childServices/login.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { environment } from '../../../environments/environment';
import { MenuItemService } from '../../services/childServices/menu-item.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService , private router:Router,public toastr: ToastsManager,private menuService:MenuItemService) {
  }

  ngOnInit() {
  }

  loginUser(userData : any){
    let loginUserData = userData.value;

    this.loginService.post(loginUserData).subscribe( (responseData) => {
      if(responseData.success){
        sessionStorage.setItem('userName',responseData.data.userName);
        sessionStorage.setItem('tableCount',responseData.data.tableCount);
        sessionStorage.setItem('zomatoid',responseData.data.zomatoid);
        
        this.router.navigateByUrl('/home/dashboard');
      }else{
        this.toastr.error(responseData.message, 'Error!' ,{showCloseButton : true});
      }
    },(error:AppError) => {
      if(error instanceof NotFoundError){
        console.log('not found')
      }
      else throw error;
    })
  }
}
