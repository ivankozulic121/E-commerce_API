import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user/user.entity';

@Injectable()
export class ProductService {

    constructor( @InjectRepository(ProductEntity) private repo: Repository<ProductEntity>){}

    async getAllProducts(): Promise<ProductEntity[]>{

        return await this.repo.find()
    }

    async getProductById( id: number ) : Promise<ProductEntity> {

        return await this.repo.findOneBy({id});
    }


    async deleteProduct( id: number )  {
        return await this.repo.delete({id});
    }

    async updateStockCount ( id: number) {

        try {
            const product = await this.repo.findOneBy({id});
            product.stock_count = product.stock_count +1 ;
            return await this.repo.save(product);
        }
        catch {
            throw new InternalServerErrorException();
        }
    }
}
