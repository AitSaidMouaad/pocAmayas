import { ProductModel, ProductCreateInput, ProductUpdateInput, PaginateInput, ProductFilterInput } from "../graphql/graphql";

export interface ProductStateModel {
    products: ProductModel[],
    count: number,
    selectedProduct? : {
      product: ProductModel
    }
  }
  
  export class CreateProduct {
    static readonly type = '[Product] Create';
    constructor(public payload: ProductCreateInput) { }
  }
  
  export class EditProduct {
    static readonly type = '[Product] Edit';
    constructor(public payload: ProductUpdateInput) { }
  }
  
  export class PaginateProducts {
    static readonly type = '[Product] Paginate';
    constructor(public payload: PaginateInput) { }
  }
  
  export class CountProducts {
    static readonly type = '[Product] Count';
    constructor() { }
  }
  
  export class SelectedProduct {
    static readonly type = '[Product] Select';
    constructor(public id: string) { }
  }
  
  export class FilterProducts {
    static readonly type = '[Product] Filter';
    constructor(public payload: ProductFilterInput) { }
  }
  
  export class SearchProducts {
    static readonly type = '[Product] Search';
    constructor(public query: string) { }
  }