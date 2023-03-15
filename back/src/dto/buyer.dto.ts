import { Field, InputType } from "@nestjs/graphql";
import JSON from 'graphql-type-json'

interface Range {
    from?: any;
    to?: any;
}


/** Pour les filters on peut pousser ça et utiliser les SCALAR */
@InputType()
export class BuyerFilterInput {

    @Field((type) => JSON, { nullable: true })
    id?: Range

    @Field({ nullable: true })
    country?: string

    @Field((type) => JSON, { nullable: true })
    createdAt?: Range

    @Field((type) => JSON, { nullable: true })
    updatedAt?: Range
}

@InputType()
export class BuyerCreateInput {

    @Field({ nullable: false })
    lastName: string

    @Field({ nullable: false })
    firstName: string

    @Field({ nullable: true })
    country?: string
}

@InputType()
export class BuyerUpdateInput {

    @Field({ nullable: false })
    id: string

    @Field({ nullable: false })
    lastName: string

    @Field({ nullable: false })
    firstName: string

    @Field({ nullable: false })
    country: string

    @Field((type) => JSON, { nullable: true })
    updatedAt?: Range
}