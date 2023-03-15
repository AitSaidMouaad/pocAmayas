import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerComponent } from './buyer.component';
import { BuyersListComponent } from './buyers-list.component';

const routes: Routes = [
  {
    path:'',
    component : BuyersListComponent,
  },
  {
    path: 'create',
    component: BuyerComponent
  },
  {
    path: 'edit',
    component: BuyerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
