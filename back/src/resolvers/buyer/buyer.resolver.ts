import { Inject } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { Args, Mutation, Query, Resolver, InputType, Field } from "@nestjs/graphql";
import { BuyerModel } from "src/db/models/buyer/buyer.model";
import { BuyerFilterInput } from "src/dto/buyer.dto";
import { BuyerService } from "src/services/buyer/buyer.service";
import { ProductService } from "src/services/product/product.service";
import { DeleteResult } from "typeorm";


@InputType()
export class DeleteOutput{
    constructor(result: boolean){
        this.result = result
    }

    @Field()
    result: boolean
}

@Resolver(of => BuyerModel)
export class BuyerResolver {
    constructor(@Inject(BuyerService) private buyerSrv: BuyerService,
    ) { }

    /** queries **/

    @Query(returns => BuyerModel)
    async buyer(@Args('id') id: string): Promise<BuyerModel> {
        return await this.buyerSrv.getOne(parseInt(id))
    }

    @Query(returns => [BuyerModel])
    async buyers(): Promise<BuyerModel[]> {
        return await this.buyerSrv.getAll()
    }

    @Query(returns => [BuyerModel])
    async searchBuyers(@Args('query') query: string): Promise<BuyerModel[]> {
        return await this.buyerSrv.search(query)
    }

    @Query(returns => [BuyerModel])
    async filterBuyers(@Args('query') query: BuyerFilterInput): Promise<BuyerModel[]> {
        return await this.buyerSrv.filter(query)
    }

    /** mutations **/

    @Mutation(returns => BuyerModel)
    async createBuyer(
        @Args('firstName') firstName: string,
        @Args('lastName') lastName: string,
    ): Promise<BuyerModel> {
        return await this.buyerSrv.create({
            firstName, 
            lastName,
        })
    }

    @Mutation(returns => BuyerModel)
    async updateBuyer(
        @Args('id') id: string,
        @Args('firstName') firstName: string,
        @Args('lastName') lastName: string,
        @Args('country') country: string
    ): Promise<BuyerModel> {
        const buyer = await this.buyerSrv.update({
            id: parseInt(id),
            firstName, 
            lastName,
            country,
            updatedAt: new Date()
        })
        //console.log("Buyer Cr d: ", buyer)
        return buyer;
    }

    @Mutation(returns => BuyerModel)
    async deleteBuyer(
        @Args('id') id: string
    ): Promise<BuyerModel> {
            const buyer =await this.buyerSrv.getOne(parseInt(id))
            await this.buyerSrv.delete(parseInt(id))
            return buyer;
    }
}