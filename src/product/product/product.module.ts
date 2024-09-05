import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from 'src/user/user/user.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth/auth.module';

@Module({
    imports:[TypeOrmModule.forFeature([ProductEntity, UserEntity]),
AuthModule],
    controllers:[ProductController],
    providers: [ProductService],
})
export class ProductModule {



}
