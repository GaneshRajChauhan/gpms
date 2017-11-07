import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { HeroListComponent } from './hero-list.component';
import { HeroDetailComponent } from './hero-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HeroListComponent,
    data: {
      title: 'hero'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroRoutingModule {}
