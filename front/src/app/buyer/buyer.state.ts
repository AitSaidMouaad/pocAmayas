import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { BuyerService } from './buyer.service';
import { BuyerCreateInput, BuyerFilterInput, BuyerModel, BuyerUpdateInput, PaginateInput } from '../graphql/graphql';
import { BuyerStateModel, CountBuyers, CreateBuyer, EditBuyer, FilterBuyers, PaginateBuyers, SearchBuyers, SelectedBuyer } from './buyer.dto';



@Injectable()
@State<BuyerStateModel>({
  name: 'buyer',
  defaults: {
    buyers: [],
    count: 0,
  }

})
export class BuyerState {

  @Selector()
  static buyers(state: BuyerStateModel) {
    return state.buyers;
  }

  @Selector()
  static count(state: BuyerStateModel) {
    return state.count;
  }

  @Selector()
  static selectedBuyer(state: BuyerStateModel) {
    return state.selectedBuyer?.buyer;
  }


  constructor(private buyerSvc: BuyerService) { }

  @Action(CreateBuyer)
  createBuyer({ getState }: StateContext<BuyerStateModel>, payload: BuyerCreateInput) {
    return this.buyerSvc.createBuyer(payload);
  }

  @Action(EditBuyer)
  editBuyer({ getState }: StateContext<BuyerStateModel>, payload: BuyerUpdateInput) {
    return this.buyerSvc.editBuyer(payload);
  }

  @Action(PaginateBuyers)
  PaginateBuyers(ctx: StateContext<BuyerStateModel>, payload: PaginateInput) {
    const state = ctx.getState();
    return this.buyerSvc.paginateBuyers(payload).pipe(tap((data) => {
      ctx.setState({
        ...state,
        buyers: data.buyers,
        count: data.count
      })
    }));
  }

  @Action(CountBuyers)
  CountBuyers(ctx: StateContext<BuyerStateModel>) {
    const state = ctx.getState();
    return this.buyerSvc.countBuyers().pipe(tap((data) => {
      ctx.setState({
        ...state,
        count: data
      })
    }));
  }

  @Action(SelectedBuyer)
  SelectedBuyer(ctx: StateContext<BuyerStateModel>, id: string) {
    const state = ctx.getState();
    return this.buyerSvc.getBuyer(id).pipe(tap((res) => {
      ctx.setState({
        ...state,
        selectedBuyer: res
      })
    }));
  }

  @Action(FilterBuyers)
  FilterBuyers(ctx: StateContext<BuyerStateModel>, payload: BuyerFilterInput) {
    const state = ctx.getState();
    return this.buyerSvc.filterBuyers(payload).pipe(tap((data) => {
      ctx.setState({
        ...state,
        buyers: data,
        count: data.length
      })
    }));
  }

  @Action(SearchBuyers)
  SearchBuyers(ctx: StateContext<BuyerStateModel>, query: string) {
    const state = ctx.getState();
    return this.buyerSvc.searchBuyers(query).pipe(tap((data) => {
      ctx.setState({
        ...state,
        buyers: data,
        count: data.length
      })
    }));
  }
}
