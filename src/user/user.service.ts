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
    this.userMicroServiceClient.emit('createUser', createUserDto);
  }

  findAll() {
    // return `This action returns all user`;
    this.userMicroServiceClient.emit('findAllUser', null);
  }

  findOne(id: number) {
    this.userMicroServiceClient.emit('findOneUser', id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id;
    this.userMicroServiceClient.emit('updateUser', updateUserDto);
  }

  remove(id: ObjectId) {
    this.userMicroServiceClient.emit('removeUser', id);
  }
}
