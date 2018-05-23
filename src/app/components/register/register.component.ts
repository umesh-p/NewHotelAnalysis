import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/childServices/register.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService , private toastr :ToastsManager) { }

  ngOnInit() {
  }

  registerFrom(registerFromObject){

    this.registerService.post(registerFromObject.value).subscribe((result) => {
      this.toastr.success('User Registered Successfully ..', 'Success!' ,{showCloseButton : true});
    })
  }

}
