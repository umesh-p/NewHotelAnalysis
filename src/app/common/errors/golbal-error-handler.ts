import { ErrorHandler } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

export class GlobalErrorHandler implements ErrorHandler {

  private toastr: ToastsManager;

  constructor() {}

  handleError(error) {
    console.log(error);
  }

}
