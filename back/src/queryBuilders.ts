import { BuyerFilterInput } from "./dto/buyer.dto";
import { flattenObject } from "./utils";

export interface BuilderOutput {
        query: string;
        queryParam: any;
}

export function buildBuyerFilterQuery(query: BuyerFilterInput): BuilderOutput | undefined{
    const builderQueryArray = [];
    if(query.id && (query.id.from || query.id.to)){
        query.id.from  && builderQueryArray.push( { qr: `buyer.id >= :idFrom` , params: {idFrom: query.id.from}})
        query.id.to  && builderQueryArray.push( { qr: `buyer.id <= :idTo` , params: {idTo: query.id.to}})
    }
    if(query.createdAt && (query.createdAt.from || query.createdAt.to)){
        query.createdAt.from  && builderQueryArray.push( { qr: `buyer.createdAt >= :createdAtFrom` , params: {createdAtFrom: query.createdAt.from}})
        query.createdAt.to  && builderQueryArray.push( { qr: `buyer.createdAt <= :createdAtTo` , params: {createdAtTo: query.createdAt.to}})
    }
    if(query.updatedAt && (query.updatedAt.from || query.updatedAt.to)){
        query.updatedAt.from  && builderQueryArray.push( { qr: `buyer.updatedAt >= :updatedAtFrom` , params: {updatedAtFrom: query.updatedAt.from}})
        query.updatedAt.to  && builderQueryArray.push( { qr: `buyer.updatedAt <= :updatedAtTo` , params: {updatedAtTo: query.updatedAt.from}})
    }
    if(query.country){
        query.country  && builderQueryArray.push( { qr: `buyer.country = :country` , params: {country: query.country}})
        
    }
    if(builderQueryArray.length>0){
        const queries = builderQueryArray.map(bq=>bq.qr).join(' AND ');
        //console.log(queries);
        const queriesParams = flattenObject(builderQueryArray.map(bq=>bq.params))
        return {
            query: queries,
            queryParam: queriesParams
        };
    }
    return undefined  
}