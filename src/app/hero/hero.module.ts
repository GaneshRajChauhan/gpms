import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms'
import { HeroListComponent } from './hero-list.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroRoutingModule } from './hero-routing.module';
import { HeroService }         from './hero.service'; //  <-- #1 import service


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeroRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ HeroListComponent,HeroDetailComponent ],
  providers:[HeroService]
})
export class HeroModule { }
