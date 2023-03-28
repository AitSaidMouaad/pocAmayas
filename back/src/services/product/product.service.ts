import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from 'src/db/models/product/product.model';
import { PaginateInput } from 'src/dto/pagination.dto';
import { ProductFilterInput } from 'src/dto/product.dto';
import { buildProductFilterQuery } from 'src/queryBuilders';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductModel) private productRepo: Repository<ProductModel>) { }

    async getAll(): Promise<ProductModel[]> {
        return await this.productRepo.find()
    }

    async create(product: ProductModel): Promise<ProductModel> {
        let entity = this.productRepo.create(product);
        return await this.productRepo.save(entity);
    }

    async getOne(id: number): Promise<ProductModel> {
        return this.productRepo.findOneBy({ id });
    }

    async update(product: ProductModel): Promise<ProductModel> {
        const oldProduct = await this.getOne(product.id)
        const newProduct = {
            ...oldProduct,
            ...product
        }
        return await this.productRepo.save(newProduct);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.productRepo.delete(id);
    }

    async search(query: string): Promise<ProductModel[]> {
        return await this.productRepo.find(
            {
                relations: {
                    buyer: true
                },
                where: [{
                    name: Like(`%${query}%`),
                },
                {
                    buyer: {
                        firstName: Like(`%${query}%`),
                    }
                }, {
                    buyer: {
                        lastName: Like(`%${query}%`),
                    }
                }, {
                    buyer: {
                        country: Like(`%${query}%`)
                    }
                }
                ]
            }
        )
    }

    async filter(query: ProductFilterInput): Promise<ProductModel[]> {
        const builderQuery = buildProductFilterQuery(query)
        const filterQuery = this.productRepo.createQueryBuilder('product')
        builderQuery && filterQuery.where(builderQuery.query, builderQuery.queryParam).leftJoinAndSelect('product.buyer', 'buyer');
        return await filterQuery.getMany();
    }

    async paginate(payload: PaginateInput): Promise<{ count: number, products: ProductModel[] }> {
        const query = this.productRepo.createQueryBuilder('product')
        query.orderBy('product.createdAt', "DESC").take(payload.pageSize).skip(payload.page * payload.pageSize).leftJoinAndSelect('product.buyer', 'buyer')
        const products = await query.getMany();
        const count = await this.productRepo.createQueryBuilder().getCount()

        return await new Promise((resolve) => {
            resolve({
                count,
                products
            })
        })
    }

    async count(): Promise<number> {
        const query = this.productRepo.createQueryBuilder('product')
        return await query.getCount();
    }
}
