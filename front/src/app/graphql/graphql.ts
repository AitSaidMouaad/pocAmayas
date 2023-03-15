
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface BuyerFilterInput {
    id?: Nullable<JSON>;
    country?: Nullable<string>;
    createdAt?: Nullable<JSON>;
    updatedAt?: Nullable<JSON>;
}

export interface PaginateInput {
    pageSize: number;
    page: number;
}

export interface BuyerCreateInput {
    lastName: string;
    firstName: string;
    country?: Nullable<string>;
}

export interface BuyerUpdateInput {
    id: string;
    lastName: string;
    firstName: string;
    country: string;
    updatedAt?: Nullable<JSON>;
}

export interface BuyerModel {
    id: number;
    firstName: string;
    lastName: string;
    country: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface PaginationOutput {
    buyers: BuyerModel[];
    count: number;
}

export interface IQuery {
    buyer(id: string): BuyerModel | Promise<BuyerModel>;
    buyers(): BuyerModel[] | Promise<BuyerModel[]>;
    searchBuyers(query: string): BuyerModel[] | Promise<BuyerModel[]>;
    filterBuyers(query: BuyerFilterInput): BuyerModel[] | Promise<BuyerModel[]>;
    paginateBuyers(payload: PaginateInput): PaginationOutput | Promise<PaginationOutput>;
    countBuyers(): number | Promise<number>;
}

export interface IMutation {
    createBuyer(payload: BuyerCreateInput): BuyerModel | Promise<BuyerModel>;
    updateBuyer(payload: BuyerUpdateInput): BuyerModel | Promise<BuyerModel>;
    deleteBuyer(id: string): BuyerModel | Promise<BuyerModel>;
}

export type DateTime = any;
export type JSON = any;
type Nullable<T> = T | null;
