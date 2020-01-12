import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairsPage } from './repairs.page';

const routes: Routes = [
  {
    path: '',
    component: RepairsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepairsPageRoutingModule {}
