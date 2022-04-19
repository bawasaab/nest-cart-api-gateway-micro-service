import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ObjectId } from 'mongoose';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  findAll() {
    console.log('findAll controller api-gateway');
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.cartService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateCartDto: UpdateCartDto) {
    console.log('cart update api-gateway contr');
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.cartService.remove(id);
  }
}
