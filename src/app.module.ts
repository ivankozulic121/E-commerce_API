import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user/user.entity';
import { ProductEntity } from './product/product/product.entity';
import { ProductModule } from './product/product/product.module';
import { AuthModule } from './auth/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'e_commerce',
    entities: [UserEntity, ProductEntity],
    synchronize: true
  }), ProductModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
