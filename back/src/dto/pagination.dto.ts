import { Field, Float, InputType, ObjectType } from "@nestjs/graphql"
import { BuyerModel } from "src/db/models/buyer/buyer.model"



@InputType()
export class PaginateInput {

    @Field((type) => Float, { nullable: false })
    pageSize: number

    @Field((type) => Float, { nullable: false })
    page: number
}

@ObjectType()
export class PaginationOutput {

    constructor(buyers: BuyerModel[], count: number){
        this.buyers = buyers;
        this.count = count;
    }

    @Field(()=>[BuyerModel])
    buyers: BuyerModel[]

    @Field(()=>Float)
    count: number
}

