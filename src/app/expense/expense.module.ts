import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ExpenseRoutingModule } from './expense-routing.module';
import { ReportComponent } from './report.component';
import { ExpenseComponent } from './expense.component';
import { ViewexpenseComponent } from './viewexpense.component';
import { AuthGuard } from '../user/auth-guard.service';
import { AuthService } from '../user/auth.service';
import { ExpenseService } from './expense.service';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
   ExpenseRoutingModule,
   CommonModule,
  ],
  declarations: [
    ReportComponent,
    ExpenseComponent,
    ViewexpenseComponent
  ],
  providers: [
    DatePipe,
    ExpenseService
  ]
})
export class ExpenseModule {}