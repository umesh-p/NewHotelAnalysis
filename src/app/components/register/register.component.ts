import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/childServices/register.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public displayThanks:boolean = false;

  constructor(private registerService: RegisterService , private toastr: ToastsManager , private router: Router) { }

  ngOnInit() {
  }

  registerFrom(registerFromObject) {
    let registrationObject = registerFromObject.value;
    registrationObject['adminname'] = 'admin';
    registrationObject['adminpassword'] = 'admin';

    this.registerService.post(registrationObject).subscribe((result) => {
      this.toastr.success('User Registered Successfully .. !' , 'Success!' , {showCloseButton : true});
      this.displayThanks = true;
    });
  }


}
