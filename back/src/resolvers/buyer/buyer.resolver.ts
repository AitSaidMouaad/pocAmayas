import { Inject } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, InputType, Field, Float } from "@nestjs/graphql";
import { BuyerModel } from "src/db/models/buyer/buyer.model";
import { BuyerCreateInput, BuyerFilterInput, BuyerUpdateInput } from "src/dto/buyer.dto";
import { PaginateInput, BuyersPaginationOutput } from "src/dto/pagination.dto";
import { BuyerService } from "src/services/buyer/buyer.service";



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

    @Query(returns =>BuyersPaginationOutput)
    async paginateBuyers(@Args('payload') payload: PaginateInput): Promise<BuyersPaginationOutput> {
        return await this.buyerSrv.paginate(payload)
    }

    @Query(returns => Float)
    async countBuyers(): Promise<number> {
        return await this.buyerSrv.count()
    }

    /** mutations **/

    @Mutation(returns => BuyerModel)
    async createBuyer(@Args('payload') payload: BuyerCreateInput
    ): Promise<BuyerModel> {
        return await this.buyerSrv.create(payload)
    }

    @Mutation(returns => BuyerModel)
    async updateBuyer(
        @Args('payload') payload: BuyerUpdateInput
    ): Promise<BuyerModel> {
        const buyer = await this.buyerSrv.update({
            ...payload,
            id: parseInt(payload.id),
            updatedAt: new Date()
        })
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