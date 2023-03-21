import { Component, ElementRef, NgZone, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Navigate, RouterDataResolved, RouterState } from '@ngxs/router-plugin';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { SearchBuyers } from '../buyer/buyer.dto';
import { BuyerState } from '../buyer/buyer.state';
import { BuyerModel, ProductCreateInput, ProductModel } from '../graphql/graphql';
import { SelectedProduct, CreateProduct, EditProduct } from './product.dto';
import { ProductState } from './product.state';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productForm!: FormGroup;
  id?: number;
  buyers!: BuyerModel[];
  searchInput!: string;

  @Select(ProductState.selectedProduct) selectedProduct$!: Observable<ProductModel>;
  @Select(BuyerState.buyers) buyers$!: Observable<BuyerModel[]>;
  selectedBuyer!: BuyerModel;
  listWidth: string = "0";

  constructor(private formBuilder: FormBuilder, private store: Store,public zone: NgZone ) {
    this.listWidth = `20px`;
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      buyerId: ['', Validators.required]
    });
    this.store.select(RouterState).subscribe(({ state }) => {
      this.id = state.root.queryParams.id
    });
  }

  private debouncer: Subject<string> = new Subject<string>();



  ngOnInit() {
    this.initForm();
    this.debouncer.pipe(debounceTime(300)).subscribe(value => {
      this.searchBuyer(value)
    });
  }

  initForm() {
    if (this.id) {
      this.store.dispatch(new SelectedProduct(this.id.toString()));
      this.selectedProduct$.subscribe((product) => {
        if (product?.id) {
          const { name, buyer } = product;
          this.selectedBuyer = buyer
          this.productForm = this.formBuilder.group({
            name: [name, Validators.required],
            buyerId: [buyer.firstName + ' ' + buyer.lastName, Validators.required]
          });
        }

      })
    }
  }

  onSubmit() {
    const { name }: ProductCreateInput = this.productForm.value;
    this.store.dispatch([!(this.id) ? new CreateProduct({ name, buyerId: this.selectedBuyer.id.toString() }) : new EditProduct({ name, buyerId: this.selectedBuyer.id.toString(), id: `${this.id}` },), new Navigate(['/products'])]);
  }

  searchBuyer(value: string) {
    if (!value) {
      this.buyers = [];
      return;
    }
    this.store.dispatch(new SearchBuyers(value))

  }

  onSearchInput($event: any) {
    this.searchInput = $event.target.value
    this.debouncer.next(this.searchInput);
  }

  onBuyerClick(buyer: BuyerModel) {
    this.productForm.controls['buyerId'].setValue(buyer.firstName + ' ' + buyer.lastName);
    this.selectedBuyer = buyer;
  }

}