import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { HomeComponent } from '../components/home/home.component';

import { OrderComponent } from '../components/home/childrenComp/order/order.component';
import { InventoryComponent } from '../components/home/childrenComp/inventory/inventory.component';
import { DashboardComponent } from '../components/home/childrenComp/dashboard/dashboard.component';
import { AnalyticsComponent } from '../components/home/childrenComp/analytics/analytics.component';
import { ReviewComponent } from '../components/home/childrenComp/review/review.component';
import { SettingComponent } from '../components/home/childrenComp/setting/setting.component';
import { MenuManagement } from '../components/home/childrenComp/menu-management/menu-management.component';
import { DailyPreparationsComponent } from '../components/home/childrenComp/daily-preparations/daily-preparations.component';
import { Authguard } from '../services/childServices/authguard.service';
import { RegisterComponent } from '../components/register/register.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home',
    component: HomeComponent,
    children :[
      { path: 'orderpanel', component: OrderComponent,canActivate:[Authguard] },
      { path: 'stockInventory', component: InventoryComponent,canActivate:[Authguard] },
      { path: 'manageMenu', component : MenuManagement,canActivate:[Authguard]},
      { path: 'dashboard', component: DashboardComponent,canActivate:[Authguard] },
      { path: 'analysis', component: AnalyticsComponent,canActivate:[Authguard] },
      { path: 'reviews', component: ReviewComponent,canActivate:[Authguard] },
      { path: 'dailyprep', component : DailyPreparationsComponent,canActivate:[Authguard]},
      { path: 'settings', component: SettingComponent,canActivate:[Authguard] },
    ]},
  { path: 'notFound', component: NotFoundComponent },
  { path: '**' , component: LoginComponent}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
