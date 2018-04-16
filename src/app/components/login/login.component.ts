import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { AppError } from '../../common/errors/app-error';
import { NotFoundError } from '../../common/errors/not-found-error';

import { LoginService } from '../../services/childServices/login.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService , private router:Router,public toastr: ToastsManager) {
  }

  ngOnInit() {
  }

  loginUser(userData : any){
    let loginUserData = userData.value;

    this.loginService.post(loginUserData).subscribe( (responseData) => {
      if(responseData.success){
        sessionStorage.setItem('userName',responseData.data.userName);
        sessionStorage.setItem('tableCount',responseData.data.tableCount);

        this.router.navigateByUrl('/home/orderpanel');
      }else{
        this.toastr.error(responseData.message, 'Error!' , environment.tostConfigurations);
      }
    },(error:AppError) => {
      if(error instanceof NotFoundError){
        console.log('not found')
      }
      else throw error;
    })
  }
}
