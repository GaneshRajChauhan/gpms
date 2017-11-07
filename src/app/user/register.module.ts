import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {HttpModule}from '@angular/http'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import {UserService} from './user.service'

@NgModule({
  imports: [
    CommonModule,ReactiveFormsModule,
    RegisterRoutingModule,
    HttpModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ RegisterComponent ],
  providers:[UserService]
})
export class RegisterModule { }
