import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppError } from '../../common/errors/app-error';
import { NotFoundError } from '../../common/errors/not-found-error';

import { LoginService } from '../../services/childServices/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService , private router:Router) { }

  ngOnInit() {
  }

  loginUser(userData : any){
    let loginUserData = userData.value;

    this.loginService.post(loginUserData).subscribe( (responseData) => {
      this.router.navigateByUrl('/orderpanel');
    },(error:AppError) => {
      if(error instanceof NotFoundError){
        console.log('not found')
      }
      else throw error;
    })


  }
}
