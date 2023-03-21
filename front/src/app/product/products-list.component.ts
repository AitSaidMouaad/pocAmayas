import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductFilterInput, ProductModel, PaginateInput } from '../graphql/graphql';
import { ProductState } from './product.state';
import { Observable, of } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { PaginateProducts, FilterProducts, SearchProducts } from './product.dto';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  @Select(ProductState.products) products$!: Observable<ProductModel[]>;
  @Select(ProductState.count) count$!: Observable<number>;

  searchTerm = '';
  dateFilterFrom = new Date();
  dateFilterTo?: Date;
  totalItems = 0;
  paginationStuff: PaginateInput = {
    pageSize: 3,
    page: 0
  }

  filterStuff: ProductFilterInput = {
    createdAt: {
      from: null,
      to: new Date()
    },
  };

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.initProducts()
  }

  async initProducts(): Promise<void> {
    this.store.dispatch(new PaginateProducts(this.paginationStuff))
    this.count$.subscribe(count => {
      this.totalItems = count
    })
  }


  editProduct(id: number): void {
    this.store.dispatch(new Navigate(['/products/edit'], { id }))
  }

  filterProducts(): void {
      this.store.dispatch(new FilterProducts(this.filterStuff))
  }

  searchProducts(): void {
    this.store.dispatch(new SearchProducts(this.searchTerm))
  }

  createProduct(): void {
    this.store.dispatch(new Navigate(['/products/create']))
  }

  onPageChanged($event: any) {
    this.store.dispatch
    this.paginationStuff = {
      ...this.paginationStuff,
      page: $event
    }
    this.initProducts()
  }

}