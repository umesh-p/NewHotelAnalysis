import { BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA, ErrorHandler} from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './router/app-routing.module';
import { SidenavComponent } from './reusable/sidenav/sidenav.component';
import { MaincontainerComponent } from './components/maincontainer/maincontainer.component';
import { GlobalErrorHandler } from './common/errors/golbal-error-handler';

import { DataService } from './services/data.service';
import { LoginService } from './services/login.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    MaincontainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    { provide : ErrorHandler , useClass:GlobalErrorHandler},
    DataService,
    LoginService
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
