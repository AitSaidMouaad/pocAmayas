import { Field, Float, InputType, ObjectType } from "@nestjs/graphql"
import { BuyerModel } from "src/db/models/buyer/buyer.model"
import { ProductModel } from "src/db/models/product/product.model";



@InputType()
export class PaginateInput {

    @Field((type) => Float, { nullable: false })
    pageSize: number

    @Field((type) => Float, { nullable: false })
    page: number
}

@ObjectType()
export class BuyersPaginationOutput {

    constructor(buyers: BuyerModel[], count: number){
        this.buyers = buyers;
        this.count = count;
    }

    @Field(()=>[BuyerModel])
    buyers: BuyerModel[]

    @Field(()=>Float)
    count: number
}


@ObjectType()
export class ProductsPaginationOutput {

    constructor(products: ProductModel[], count: number){
        this.products = products;
        this.count = count;
    }

    @Field(()=>[ProductModel])
    products: ProductModel[]

    @Field(()=>Float)
    count: number
}

