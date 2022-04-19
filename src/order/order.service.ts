import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDERMICROSERVICE')
    private readonly orderMicroServiceClient: ClientProxy,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return this.orderMicroServiceClient.emit('createOrder', createOrderDto);
  }

  findAll() {
    return this.orderMicroServiceClient.send({ cmd: 'findAllOrder' }, {});
  }

  findOne(id: ObjectId) {
    return this.orderMicroServiceClient.send({ cmd: 'findOneOrder' }, { id });
  }

  update(id: ObjectId, updateOrderDto: UpdateOrderDto) {
    updateOrderDto.id = id;
    return this.orderMicroServiceClient.emit('updateOrder', updateOrderDto);
  }

  remove(id: ObjectId) {
    return this.orderMicroServiceClient.emit('removeOrder', { id });
  }
}
