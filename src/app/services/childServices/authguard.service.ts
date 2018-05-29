import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class Authguard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (sessionStorage.getItem('userName') != 'null') {
      return true;
    }
		this.router.navigateByUrl('/login');
    return false;
	}

}
