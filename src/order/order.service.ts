import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './orderEntity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {

    constructor( @InjectRepository(OrderEntity) private orderRepo: Repository<OrderEntity>){}
}
