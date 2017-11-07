import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseComponent } from './expense.component';
import { ReportComponent } from './report.component';
import {ViewexpenseComponent} from './viewexpense.component';
import {AuthGuard} from '../user/auth-guard.service';

const routes: Routes = [
  { path: 'report', canActivate: [ AuthGuard], component: ReportComponent },
  { path: 'expense', canActivate: [ AuthGuard], component: ExpenseComponent },
  { path: 'expense/:id', canActivate: [ AuthGuard], component: ExpenseComponent },
  { path: 'expense/view/:id', canActivate: [ AuthGuard], component: ViewexpenseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule {}
