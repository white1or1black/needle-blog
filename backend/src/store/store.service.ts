import { RedisService } from 'nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class StoreService {
  private clients: Map<string, Redis>;
  private defaultName: string;
  constructor(private readonly redisService: RedisService) {
    this.clients = new Map<string, Redis>();
    this.defaultName = 'default';
    this.clients[this.defaultName] = this.redisService.getClient();
  }

  getClient(name?: string) {
    if (!!name) return this.clients[name];
    return this.clients[this.defaultName];
  }
  
}