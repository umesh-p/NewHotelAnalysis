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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home',
    component: HomeComponent ,
    children :[
      { path: 'orderpanel', component: OrderComponent },
      { path: 'stockInventory', component: InventoryComponent },
      { path: 'manageMenu', component : MenuManagement},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'analysis', component: AnalyticsComponent },
      { path: 'reviews', component: ReviewComponent },
      { path: 'settings', component: SettingComponent },
    ]},
  { path: 'notFound', component: NotFoundComponent },
  { path: '**' , component: LoginComponent}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
