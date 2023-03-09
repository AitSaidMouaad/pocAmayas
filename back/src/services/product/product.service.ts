import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from 'src/db/models/product/product.model';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductModel) private productRepo: Repository<ProductModel>) { }

    async getAll(): Promise<ProductModel[]> {
        return await this.productRepo.find()
    }

    async create(product: ProductModel): Promise<ProductModel> {
        return await this.productRepo.save(product);
    }

    async getOne(id: number): Promise<ProductModel> {
        return this.productRepo.findOneBy({id});
    }

    async update(id: number, product: ProductModel): Promise<UpdateResult> {
        return await this.productRepo.update(id, product);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.productRepo.delete(id);
    }
}
