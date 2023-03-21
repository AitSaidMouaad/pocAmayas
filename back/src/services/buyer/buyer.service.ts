import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyerModel } from 'src/db/models/buyer/buyer.model';
import { BuyerCreateInput, BuyerFilterInput } from 'src/dto/buyer.dto';
import { PaginateInput } from 'src/dto/pagination.dto';
import { buildBuyerFilterQuery } from 'src/queryBuilders';
import { DeleteResult, Like, Repository } from 'typeorm';

@Injectable()
export class BuyerService {

    constructor(@InjectRepository(BuyerModel) private buyerRepo: Repository<BuyerModel>) { }

    async getAll(): Promise<BuyerModel[]> {
        return await this.buyerRepo.find()
    }

    async create(buyer: BuyerCreateInput): Promise<BuyerModel> {
        return await this.buyerRepo.save(buyer);
    }

    async getOne(id: number): Promise<BuyerModel> {
        return this.buyerRepo.findOneBy({ id });
    }

    async update(buyer: BuyerModel): Promise<BuyerModel> {
        const oldBuyer = await this.getOne(buyer.id)
        const newBuyer = {
            ...oldBuyer,
            ...buyer
        }
        return await this.buyerRepo.save(newBuyer);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.buyerRepo.delete(id);
    }

    async search(query: string): Promise<BuyerModel[]> {
        return await this.buyerRepo.find(
            {
                where: [{
                    firstName: Like(`%${query}%`)
                },
                {
                    lastName: Like(`%${query}%`)
                },
                {
                    country: Like(`%${query}%`)
                }]
            }
        )
    }

    async filter(query: BuyerFilterInput): Promise<BuyerModel[]> {
        const builderQuery = buildBuyerFilterQuery(query)
        const filterQuery = this.buyerRepo.createQueryBuilder('buyer')
        builderQuery && filterQuery.where(builderQuery.query, builderQuery.queryParam);
        return await filterQuery.getMany();
    }

    async paginate(payload: PaginateInput): Promise<{ count: number, buyers: BuyerModel[] }> {
        const query = this.buyerRepo.createQueryBuilder('buyer')
        query.orderBy('buyer.createdAt', "DESC").take(payload.pageSize).skip(payload.page * payload.pageSize)
        const buyers = await query.getMany();
        const count = await this.buyerRepo.createQueryBuilder().getCount()

        return await new Promise((resolve) => {
            resolve({
                count,
                buyers
            })
        })
    }

    async count(): Promise<number> {
        const query = this.buyerRepo.createQueryBuilder('buyer')
        return await query.getCount();
    }
}
