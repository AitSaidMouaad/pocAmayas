import { Inject } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { Args, Mutation, Query, Resolver, InputType, Field, Float } from "@nestjs/graphql";
import { ProductModel } from "src/db/models/product/product.model";
import { ProductCreateInput, ProductFilterInput, ProductUpdateInput } from "src/dto/product.dto";
import { PaginateInput, ProductsPaginationOutput } from "src/dto/pagination.dto";
import { ProductService } from "src/services/product/product.service";
import { BuyerService } from "src/services/buyer/buyer.service";



@InputType()
export class DeleteOutput{
    constructor(result: boolean){
        this.result = result
    }

    @Field()
    result: boolean
}

@Resolver(of => ProductModel)
export class ProductResolver {
    constructor(@Inject(ProductService) private productSrv: ProductService,@Inject(BuyerService) private buyerSrv: BuyerService,
    ) { }

    /** queries **/

    @Query(returns => ProductModel)
    async product(@Args('id') id: string): Promise<ProductModel> {
        return await this.productSrv.getOne(parseInt(id))
    }

    @Query(returns => [ProductModel])
    async products(): Promise<ProductModel[]> {
        return await this.productSrv.getAll()
    }

    @Query(returns => [ProductModel])
    async searchProducts(@Args('query') query: string): Promise<ProductModel[]> {
        return await this.productSrv.search(query)
    }

    @Query(returns => [ProductModel])
    async filterProducts(@Args('query') query: ProductFilterInput): Promise<ProductModel[]> {
        return await this.productSrv.filter(query)
    }

    @Query(returns =>ProductsPaginationOutput)
    async paginateProducts(@Args('payload') payload: PaginateInput): Promise<ProductsPaginationOutput> {
        return await this.productSrv.paginate(payload)
    }

    @Query(returns => Float)
    async countProducts(): Promise<number> {
        return await this.productSrv.count()
    }

    /** mutations **/

    @Mutation(returns => ProductModel)
    async createProduct(@Args('payload') payload: ProductCreateInput
    ): Promise<ProductModel> {
        const buyer = await this.buyerSrv.getOne(parseInt(payload.buyerId))
        delete payload.buyerId;
        return await this.productSrv.create({...payload,buyer})
    }

    @Mutation(returns => ProductModel)
    async updateProduct(
        @Args('payload') payload: ProductUpdateInput
    ): Promise<ProductModel> {
        const buyer = await this.buyerSrv.getOne(parseInt(payload.buyerId))
        delete payload.buyerId;
        const product = await this.productSrv.update({
            ...payload,
            buyer,
            id: parseInt(payload.id),
            updatedAt: new Date()  // delete ça, utiliser entity coté services
        })
        return product;
    }

    @Mutation(returns => ProductModel)
    async deleteProduct(
        @Args('id') id: string
    ): Promise<ProductModel> {
            const product =await this.productSrv.getOne(parseInt(id))
            await this.productSrv.delete(parseInt(id))
            return product;
    }
}