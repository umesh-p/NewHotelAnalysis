import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private dataService : DataService) { }

  ngOnInit() {
  }

  loginUser(userData : any){

    let loginUserData = userData.value;

    this.dataService.post('login' , loginUserData).subscribe( (responseData) => {
      console.log(responseData);
    })


  }

}
