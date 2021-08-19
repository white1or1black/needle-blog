import { RedisModule } from 'nestjs-redis';
import { StoreService } from './store.service';
import { Module } from "@nestjs/common";

@Module({
  imports: [
    RedisModule.register({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      keyPrefix: 'needle:',
    }),
  ],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}