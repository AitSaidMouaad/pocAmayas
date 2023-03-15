import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpLink } from 'apollo-angular/http';

import {  ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { createHttpLink, InMemoryCache } from '@apollo/client/core';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    ApolloModule,
  ],
  providers: [  {
    provide: APOLLO_OPTIONS,
    useFactory(httpLink: HttpLink) {
      return {
        cache: new InMemoryCache(),
        link: createHttpLink({
          uri: 'http://localhost:3000/graphql'
        })
      };
    },
    deps: [HttpLink],
  }],
  exports: [PaginationComponent]
})
export class SharedModule { }
