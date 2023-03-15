import { BuyerModel, BuyerCreateInput, BuyerUpdateInput, PaginateInput, BuyerFilterInput } from "../graphql/graphql";

export interface BuyerStateModel {
    buyers: BuyerModel[],
    count: number,
    selectedBuyer? : {
      buyer: BuyerModel
    }
  }
  
  export class CreateBuyer {
    static readonly type = '[Buyer] Create';
    constructor(public payload: BuyerCreateInput) { }
  }
  
  export class EditBuyer {
    static readonly type = '[Buyer] Edit';
    constructor(public payload: BuyerUpdateInput) { }
  }
  
  export class PaginateBuyers {
    static readonly type = '[Buyer] Paginate';
    constructor(public payload: PaginateInput) { }
  }
  
  export class CountBuyers {
    static readonly type = '[Buyer] Count';
    constructor() { }
  }
  
  export class SelectedBuyer {
    static readonly type = '[Buyer] Select';
    constructor(public id: string) { }
  }
  
  export class FilterBuyers {
    static readonly type = '[Buyer] Filter';
    constructor(public payload: BuyerFilterInput) { }
  }
  
  export class SearchBuyers {
    static readonly type = '[Buyer] Search';
    constructor(public query: string) { }
  }