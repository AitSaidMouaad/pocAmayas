import { Injectable } from '@angular/core';
import { ApolloQueryResult, Observable } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { tap, map, of } from 'rxjs';
import { ProductCreateInput, ProductFilterInput, ProductModel, PaginateInput } from '../graphql/graphql';

interface PaginateResult {
  paginateProducts: {
    count: number,
    products: ProductModel[]
  }
}

interface CountProducts {
  countProducts: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apollo: Apollo) { }

  createProduct(payload: ProductCreateInput) {
    return this.apollo.mutate({
      mutation: CREATE_PRODUCT,
      variables: payload
    })
  }

  editProduct(payload: ProductCreateInput) {
    return this.apollo.mutate({
      mutation: EDIT_PRODUCT,
      variables: payload
    })
  }

  paginateProducts(payload: PaginateInput) {
    return this.apollo.watchQuery<PaginateResult>({
      query: PRODUCTS,
      variables: payload
    }).valueChanges.pipe(map(result => {
      return result.data.paginateProducts
    }))
  }

  countProducts() {
    return this.apollo.watchQuery<CountProducts>({
      query: COUNT_PRODUCTS,
    }).valueChanges.pipe(map(result => {
      return result.data.countProducts
    }))
  }

  getProduct(id: any) {
    return this.apollo.watchQuery<{ product: ProductModel }>({
      query: GET_PRODUCT,
      variables: { id: id.id }
    }).valueChanges.pipe(map(result => {
      return result.data
    }))
  }

  filterProducts(payload: any) {
    return this.apollo.watchQuery<any>({
      query: FILTER_PRODUCTS,
      variables: {
        query: {
          ...payload.payload
        }
      }
    }).valueChanges.pipe(map(result => {
      return result.data.filterProducts
    }))
  }

  searchProducts(query: any) {
    return this.apollo.watchQuery<any>({
      query: SEARCH_PRODUCTS,
      variables: query
    }).valueChanges.pipe(map(result => {
      return result.data.searchProducts
    }))
  }
}

const SEARCH_PRODUCTS = gql`
query SearchProducts($query:  String!){
  searchProducts(query: $query){
    id,
    name,
    buyer{
      id,
      firstName,
      lastName,
      country
    }
    createdAt,
    updatedAt
  }
}
`

const FILTER_PRODUCTS = gql`
query FilterProducts($query:  ProductFilterInput!){
  filterProducts(query: $query){
    id,
    name,
    buyer{
      id,
      firstName,
      lastName,
      country
    }
    createdAt,
    updatedAt
  }
}
`

const GET_PRODUCT = gql`
query product($id: String!){
  product(id: $id){
    id,
    name,
    buyer{
      id,
      firstName,
      lastName,
      country
    }
  }
}
`

const COUNT_PRODUCTS = gql`
query CountProducts{
  countProducts
}
`

const CREATE_PRODUCT = gql`
mutation CreateProduct($payload: ProductCreateInput!) {
createProduct(payload: $payload) {
  id,
    name,
    buyer{
      id,
      firstName,
      lastName,
      country
    }
      createdAt,
      updatedAt
  }
}
`

const EDIT_PRODUCT = gql`
mutation UpdateProduct($payload: ProductUpdateInput!){
  updateProduct(payload: $payload ) {
    id,
    name,
    buyer{
      id,
      firstName,
      lastName,
      country
    }
      createdAt,
      updatedAt
      }
}
`

const PRODUCTS = gql`
query paginateProducts($payload: PaginateInput!){
  paginateProducts(payload: $payload){
    products {
      id,
      name,
      buyer{
        id,
        firstName,
        lastName,
        country
    }
    createdAt
    updatedAt
    }
    count
  }
}
`