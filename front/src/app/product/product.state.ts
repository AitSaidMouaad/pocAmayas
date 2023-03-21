import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ProductService } from './product.service';
import { ProductCreateInput, ProductFilterInput, ProductModel, ProductUpdateInput, PaginateInput } from '../graphql/graphql';
import { ProductStateModel, CountProducts, CreateProduct, EditProduct, FilterProducts, PaginateProducts, SearchProducts, SelectedProduct } from './product.dto';



@Injectable()
@State<ProductStateModel>({
  name: 'product',
  defaults: {
    products: [],
    count: 0,
  }

})
export class ProductState {

  @Selector()
  static products(state: ProductStateModel) {
    return state.products;
  }

  @Selector()
  static count(state: ProductStateModel) {
    return state.count;
  }

  @Selector()
  static selectedProduct(state: ProductStateModel) {
    return state.selectedProduct?.product;
  }


  constructor(private productSvc: ProductService) { }

  @Action(CreateProduct)
  createProduct({ getState }: StateContext<ProductStateModel>, payload: ProductCreateInput) {
    return this.productSvc.createProduct(payload);
  }

  @Action(EditProduct)
  editProduct({ getState }: StateContext<ProductStateModel>, payload: ProductUpdateInput) {
    return this.productSvc.editProduct(payload);
  }

  @Action(PaginateProducts)
  PaginateProducts(ctx: StateContext<ProductStateModel>, payload: PaginateInput) {
    const state = ctx.getState();
    return this.productSvc.paginateProducts(payload).pipe(tap((data) => {
      ctx.setState({
        ...state,
        products: data.products,
        count: data.count
      })
    }));
  }

  @Action(CountProducts)
  CountProducts(ctx: StateContext<ProductStateModel>) {
    const state = ctx.getState();
    return this.productSvc.countProducts().pipe(tap((data) => {
      ctx.setState({
        ...state,
        count: data
      })
    }));
  }

  @Action(SelectedProduct)
  SelectedProduct(ctx: StateContext<ProductStateModel>, id: string) {
    const state = ctx.getState();
    return this.productSvc.getProduct(id).pipe(tap((res) => {
      ctx.setState({
        ...state,
        selectedProduct: res
      })
    }));
  }

  @Action(FilterProducts)
  FilterProducts(ctx: StateContext<ProductStateModel>, payload: ProductFilterInput) {
    const state = ctx.getState();
    return this.productSvc.filterProducts(payload).pipe(tap((data) => {
      ctx.setState({
        ...state,
        products: data,
        count: data.length
      })
    }));
  }

  @Action(SearchProducts)
  SearchProducts(ctx: StateContext<ProductStateModel>, query: string) {
    const state = ctx.getState();
    return this.productSvc.searchProducts(query).pipe(tap((data) => {
      ctx.setState({
        ...state,
        products: data,
        count: data.length
      })
    }));
  }
}
