import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ObjectId } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCTMICROSERVICE')
    private readonly productMicroServiceClient: ClientProxy,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productMicroServiceClient.emit(
      'createProduct',
      createProductDto,
    );
  }

  findAll() {
    return this.productMicroServiceClient.send({ cmd: 'findAllProduct' }, {});
  }

  findOne(id: ObjectId) {
    return this.productMicroServiceClient.send(
      { cmd: 'findOneProduct' },
      { id },
    );
  }

  update(id: ObjectId, updateProductDto: UpdateProductDto) {
    updateProductDto.id = id;
    return this.productMicroServiceClient.emit(
      'updateProduct',
      updateProductDto,
    );
  }

  remove(id: ObjectId) {
    return this.productMicroServiceClient.emit('removeProduct', id);
  }
}
