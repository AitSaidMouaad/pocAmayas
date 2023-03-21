import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductState } from './product.state';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../shared/shared.module';
import { ProductService } from './product.service';
import { BuyerState } from '../buyer/buyer.state';
import { BuyerService } from '../buyer/buyer.service';
import { ProductsListComponent } from './products-list.component';


@NgModule({
  declarations: [ProductComponent, ProductsListComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxsModule.forFeature([ProductState,BuyerState]),
    SharedModule
  ],
  providers: [ProductService,BuyerService]
})
export class ProductModule { }
