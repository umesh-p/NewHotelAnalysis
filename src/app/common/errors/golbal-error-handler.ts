import { ErrorHandler } from "@angular/core";

export class GlobalErrorHandler implements ErrorHandler{

  constructor() {}
  
  handleError(error){
    console.log('An unexpected error occured .. ')
    console.log(error);
  }

}
