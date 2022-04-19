import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CARTMICROSERVICE',
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
