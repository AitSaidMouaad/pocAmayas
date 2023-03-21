import { Injectable } from '@angular/core';
import { ApolloQueryResult, Observable } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { tap, map, of } from 'rxjs';
import { BuyerCreateInput, BuyerFilterInput, BuyerModel, PaginateInput } from '../graphql/graphql';

interface PaginateResult {
  paginateBuyers: {
    count: number,
    buyers: BuyerModel[]
  }
}

interface CountBuyers {
  countBuyers: number
}

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private apollo: Apollo) { }

  createBuyer(payload: BuyerCreateInput) {
    return this.apollo.mutate({
      mutation: CREATE_BUYER,
      variables: payload
    })
  }

  editBuyer(payload: BuyerCreateInput) {
    return this.apollo.mutate({
      mutation: EDIT_BUYER,
      variables: payload
    })
  }

  paginateBuyers(payload: PaginateInput) {
    return this.apollo.watchQuery<PaginateResult>({
      query: BUYERS,
      variables: payload
    }).valueChanges.pipe(map(result => {
      return result.data.paginateBuyers
    }))
  }

  countBuyers() {
    return this.apollo.watchQuery<CountBuyers>({
      query: COUNT_BUYERS,
    }).valueChanges.pipe(map(result => {
      return result.data.countBuyers
    }))
  }

  getBuyer(id: any) {
    return this.apollo.watchQuery<{ buyer: BuyerModel }>({
      query: GET_BUYER,
      variables: { id: id.id }
    }).valueChanges.pipe(map(result => {
      return result.data
    }))
  }
  
  filterBuyers(payload: any) {
    return this.apollo.watchQuery<any>({
      query: FILTER_BUYERS,
      variables: { query: {
        ...payload.payload
      } }
    }).valueChanges.pipe(map(result => {
      return result.data.filterBuyers
    }))
  }

  searchBuyers(query: any) {
    return this.apollo.watchQuery<any>({
      query: SEARCH_BUYERS,
      variables: query
    }).valueChanges.pipe(map(result => {
      return result.data.searchBuyers
    }))
  }
}

const SEARCH_BUYERS = gql`
query SearchBuyers($query:  String!){
  searchBuyers(query: $query){
    id,
    firstName,
    lastName,
    country,
    createdAt,
    updatedAt
  }
}
`

const FILTER_BUYERS = gql`
query FilterBuyers($query:  BuyerFilterInput!){
  filterBuyers(query: $query){
    id,
    firstName,
    lastName,
    country,
    createdAt,
    updatedAt
  }
}
`

const GET_BUYER = gql`
query buyer($id: String!){
  buyer(id: $id){
    id,
    firstName,
    lastName,
    country
  }
}
`

const COUNT_BUYERS = gql`
query CountBuyers{
  countBuyers
}
`

const CREATE_BUYER = gql`
mutation CreateBuyer($payload: BuyerCreateInput!) {
createBuyer(payload: $payload) {
      id,
      firstName,
      lastName,
      country,
      createdAt,
      updatedAt
  }
}
`

const EDIT_BUYER = gql`
mutation UpdateBuyer($payload: BuyerUpdateInput!){
  updateBuyer(payload: $payload ) {
       id,
      firstName,
      lastName,
      country,
      createdAt,
      updatedAt
      }
}
`

const BUYERS = gql`
query paginateBuyers($payload: PaginateInput!){
  paginateBuyers(payload: $payload){
    buyers {
      id
      firstName
      lastName
      country
      createdAt
      updatedAt
    }
    count
  }
}
`