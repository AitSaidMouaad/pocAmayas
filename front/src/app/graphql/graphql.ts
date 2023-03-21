
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface BuyerModelInput {
    id: number;
    firstName: string;
    lastName: string;
    country: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

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

export interface ProductFilterInput {
    createdAt?: Nullable<JSON>;
    updatedAt?: Nullable<JSON>;
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

export interface ProductCreateInput {
    name: string;
    buyerId: string;
    buyer?: Nullable<BuyerModelInput>;
}

export interface ProductUpdateInput {
    id: string;
    name: string;
    buyerId: string;
    buyer?: Nullable<BuyerModelInput>;
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

export interface ProductModel {
    id: number;
    name: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    buyer: BuyerModel;
}

export interface BuyersPaginationOutput {
    buyers: BuyerModel[];
    count: number;
}

export interface ProductsPaginationOutput {
    products: ProductModel[];
    count: number;
}

export interface IQuery {
    buyer(id: string): BuyerModel | Promise<BuyerModel>;
    buyers(): BuyerModel[] | Promise<BuyerModel[]>;
    searchBuyers(query: string): BuyerModel[] | Promise<BuyerModel[]>;
    filterBuyers(query: BuyerFilterInput): BuyerModel[] | Promise<BuyerModel[]>;
    paginateBuyers(payload: PaginateInput): BuyersPaginationOutput | Promise<BuyersPaginationOutput>;
    countBuyers(): number | Promise<number>;
    product(id: string): ProductModel | Promise<ProductModel>;
    products(): ProductModel[] | Promise<ProductModel[]>;
    searchProducts(query: string): ProductModel[] | Promise<ProductModel[]>;
    filterProducts(query: ProductFilterInput): ProductModel[] | Promise<ProductModel[]>;
    paginateProducts(payload: PaginateInput): ProductsPaginationOutput | Promise<ProductsPaginationOutput>;
    countProducts(): number | Promise<number>;
}

export interface IMutation {
    createBuyer(payload: BuyerCreateInput): BuyerModel | Promise<BuyerModel>;
    updateBuyer(payload: BuyerUpdateInput): BuyerModel | Promise<BuyerModel>;
    deleteBuyer(id: string): BuyerModel | Promise<BuyerModel>;
    createProduct(payload: ProductCreateInput): ProductModel | Promise<ProductModel>;
    updateProduct(payload: ProductUpdateInput): ProductModel | Promise<ProductModel>;
    deleteProduct(id: string): ProductModel | Promise<ProductModel>;
}

export type DateTime = any;
export type JSON = any;
type Nullable<T> = T | null;
