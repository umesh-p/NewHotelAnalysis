import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { OrderComponent } from '../components/order/order.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { InventoryComponent } from '../components/inventory/inventory.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AnalyticsComponent } from '../components/analytics/analytics.component';
import { ReviewComponent } from '../components/review/review.component';
import { SettingComponent } from '../components/setting/setting.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'orderpanel', component: OrderComponent },
  { path: 'stockInventory', component: InventoryComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'analysis', component: AnalyticsComponent },
  { path: 'reviews', component: ReviewComponent },
  { path: 'settings', component: SettingComponent },

  { path: 'notFound', component: NotFoundComponent },
  { path: '**' , component: LoginComponent}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
