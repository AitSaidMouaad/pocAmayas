import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerComponent } from './buyer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { BuyerState } from './buyer.state';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { BuyerService } from './buyer.service';
import { BuyersListComponent } from './buyers-list.component';



@NgModule({
  declarations: [
    BuyerComponent,
    BuyersListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BuyerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([BuyerState]),
    SharedModule
  ],
  providers: [BuyerService]
}) 
export class BuyerModule { } 
