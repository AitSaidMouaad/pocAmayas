import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyerModel } from 'src/db/models/buyer/buyer.model';
import { BuyerFilterInput } from 'src/dto/buyer.dto';
import { buildBuyerFilterQuery } from 'src/queryBuilders';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class BuyerService {
    constructor(@InjectRepository(BuyerModel) private buyerRepo: Repository<BuyerModel>) { }

    async getAll(): Promise<BuyerModel[]> {
        return await this.buyerRepo.find()
    }

    async create(buyer: BuyerModel): Promise<BuyerModel> {
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
        // console.log(query);
        const builderQuery = buildBuyerFilterQuery(query)
        // console.log(builderQuery);
        const filterQuery = this.buyerRepo.createQueryBuilder('buyer')
        builderQuery && filterQuery.where(builderQuery.query,builderQuery.queryParam);
        return await filterQuery.getMany();
    }
}
