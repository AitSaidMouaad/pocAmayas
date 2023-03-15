import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { BuyerFilterInput, BuyerModel, PaginateInput } from '../graphql/graphql';
import { BuyerState } from './buyer.state';
import { Observable, of } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { PaginateBuyers, FilterBuyers, SearchBuyers } from './buyer.dto';

@Component({
  selector: 'app-buyers-list',
  templateUrl: './buyers-list.component.html',
  styleUrls: ['./buyers-list.component.scss']
})
export class BuyersListComponent implements OnInit {

  @Select(BuyerState.buyers) buyers$!: Observable<BuyerModel[]>;
  @Select(BuyerState.count) count$!: Observable<number>;

  searchTerm = '';
  countryFilter = '';
  dateFilterFrom = new Date();
  dateFilterTo?: Date;
  totalItems = 0;
  paginationStuff: PaginateInput = {
    pageSize: 3,
    page: 0
  }

  countries: string[] = [
    'USA',
    'Canada',
    'Mexico',
    'Brazil',
    'Argentina',
    'Chile',
    'Peru',
    'Colombia',
    'Ecuador',
    'Bolivia',
    'Paraguay',
    'Uruguay',
    'Venezuela'
  ];
  filterStuff: BuyerFilterInput = {
    createdAt: {
      from: null,
      to: new Date()
    },
    country: null
  };

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.initBuyers()
  }

  async initBuyers(): Promise<void> {
    this.store.dispatch(new PaginateBuyers(this.paginationStuff))
    this.count$.subscribe(count => {
      this.totalItems = count
    })
  }



  getBuyers(): void {

  }

  editBuyer(id: number): void {
    this.store.dispatch(new Navigate(['/buyers/edit'], { id }))
  }

  filterBuyers(): void {
    if (this.filterStuff.country === '') { 
      this.filterStuff.country = null
      this.initBuyers()
    } else
      this.store.dispatch(new FilterBuyers(this.filterStuff))
  }

  searchBuyers(): void {
    this.store.dispatch(new SearchBuyers(this.searchTerm))
  }

  createBuyer(): void {
    this.store.dispatch(new Navigate(['/buyers/create']))
  }

  onPageChanged($event: any) {
    this.store.dispatch
    this.paginationStuff = {
      ...this.paginationStuff,
      page: $event
    }
    this.initBuyers()
  }

}