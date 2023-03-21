import { Field, InputType } from "@nestjs/graphql";
import JSON from 'graphql-type-json'
import { BuyerModel } from "src/db/models/buyer/buyer.model";


interface Range {
    from?: any;
    to?: any;
}

/** Pour les filters on peut pousser ça et utiliser les SCALAR */
@InputType()
export class ProductFilterInput {

    @Field((type) => JSON, { nullable: true })
    createdAt?: Range

    @Field((type) => JSON, { nullable: true })
    updatedAt?: Range
    
}

@InputType()
export class ProductCreateInput {

    @Field({ nullable: false })
    name: string

    @Field({nullable: false})
    buyerId: string

    @Field({nullable: true})
    buyer: BuyerModel
}

@InputType()
export class ProductUpdateInput {

    @Field({ nullable: false })
    id: string

    @Field({ nullable: false })
    name: string

    @Field({nullable: false})
    buyerId: string

    @Field({nullable: true})
    buyer: BuyerModel

    @Field((type) => JSON, { nullable: true })
    updatedAt?: Range
}