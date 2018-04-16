import { BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA, ErrorHandler} from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './router/app-routing.module';
import { SidenavComponent } from './reusable/sidenav/sidenav.component';

import { GlobalErrorHandler } from './common/errors/golbal-error-handler';

import { DataService } from './services/data.service';
import { LoginService } from './services/childServices/login.service';
import { MenuDataService } from './services/childServices/menu-data.service';
import { InventoryService } from './services/childServices/inventory.service';

import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';


import { OrderComponent } from './components/home/childrenComp/order/order.component';
import { DashboardComponent } from './components/home/childrenComp/dashboard/dashboard.component';
import { AnalyticsComponent } from './components/home/childrenComp/analytics/analytics.component';
import { ReviewComponent } from './components/home/childrenComp/review/review.component';
import { SettingComponent } from './components/home/childrenComp/setting/setting.component';
import { InventoryComponent } from './components/home/childrenComp/inventory/inventory.component';
import { MenuManagement } from './components/home/childrenComp/menu-management/menu-management.component';

import {ToastModule} from 'ng2-toastr/ng2-toastr';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    OrderComponent,
    DashboardComponent,
    AnalyticsComponent,
    ReviewComponent,
    SettingComponent,
    InventoryComponent,
    NotFoundComponent,
    HomeComponent,
    MenuManagement
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [
    { provide : ErrorHandler , useClass:GlobalErrorHandler},
    DataService,
    LoginService,
    MenuDataService,
    InventoryService,
    HttpClient
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
