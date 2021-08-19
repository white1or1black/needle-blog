import { StoreService } from '../store/store.service';
import { Injectable } from "@nestjs/common";
import { Redis } from 'ioredis';

@Injectable()
export class PageViewService {
  private store: Redis;
  private viewKey: string;
  constructor(
    private readonly storeService: StoreService
  ) {
    this.store = this.storeService.getClient();
    this.viewKey = 'page:view';
  }

  async incrView(pageId: number): Promise<number> {
    return await this.store.hincrby(this.viewKey, String(pageId), 1);
  }

  async getViewCount(pageId: number): Promise<number> {
    const view = await this.store.hget(this.viewKey, String(pageId));
    return view? parseInt(view): 0;
  }

  async getViewCounts(pageIds: number[]): Promise<number[]> {
    const views = await this.store.hmget(this.viewKey, pageIds.map(v => String(v)));
    return views.map(v => v? parseInt(v): 0);
  }

}