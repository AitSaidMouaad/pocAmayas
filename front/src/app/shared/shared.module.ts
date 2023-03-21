import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpLink } from 'apollo-angular/http';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { createHttpLink, InMemoryCache } from '@apollo/client/core';
import { PaginationComponent } from './pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    ApolloModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{
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
  exports: [PaginationComponent, HttpClientModule,
    FormsModule,
    ReactiveFormsModule,]
})
export class SharedModule { }
