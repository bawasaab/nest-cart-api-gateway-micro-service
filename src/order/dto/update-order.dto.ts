import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ObjectId } from 'mongoose';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  id: ObjectId;
}
