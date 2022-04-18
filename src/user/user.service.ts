import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERMICROSERVICE')
    private readonly userMicroServiceClient: ClientProxy,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userMicroServiceClient.emit('createUser', createUserDto);
  }

  findAll() {
    return this.userMicroServiceClient.send({ cmd: 'findAllUser' }, {});
  }

  findOne(id: ObjectId) {
    return this.userMicroServiceClient.send({ cmd: 'findOneUser' }, { id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id;
    return this.userMicroServiceClient.emit('updateUser', updateUserDto);
  }

  remove(id: ObjectId) {
    return this.userMicroServiceClient.emit('removeUser', id);
  }
}
