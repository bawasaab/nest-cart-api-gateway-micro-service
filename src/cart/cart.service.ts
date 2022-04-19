import { Inject, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ObjectId } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CartService {
  constructor(
    @Inject('CARTMICROSERVICE')
    private readonly cartMicroServiceClient: ClientProxy,
  ) {}

  create(createCartDto: CreateCartDto) {
    return this.cartMicroServiceClient.emit('createCart', createCartDto);
  }

  findAll() {
    return this.cartMicroServiceClient.send({ cmd: 'findAllCart' }, {});
  }

  findOne(id: ObjectId) {
    return this.cartMicroServiceClient.send({ cmd: 'findOneCart' }, { id });
  }

  update(id: ObjectId, updateCartDto: UpdateCartDto) {
    updateCartDto.id = id;
    return this.cartMicroServiceClient.emit('updateCart', updateCartDto);
  }

  remove(id: ObjectId) {
    return this.cartMicroServiceClient.emit('removeCart', { id });
  }
}
