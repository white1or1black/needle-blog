import { StoreService } from '../store/store.service';
import { PageModule } from './page.module';
import { Test } from '@nestjs/testing';
import { PageViewService } from './pageview.service';

describe('Page', () => {
  let pageViewService: PageViewService;
  beforeAll(async () => {
    const StoreServiceMock = {
      getClient: () => {
        return {
          get: () => 1,
          set: () => 1,
          incr: () => 1,
          hget: () => 1,
          hincrby: () => 1,
          hmget: () => [1],
        }
      }
    };
    const moduleRef = await Test.createTestingModule({
      imports: [PageModule],
      providers: [PageViewService, StoreService],
    })
      .overrideProvider(StoreService)
      .useValue(StoreServiceMock)
      .compile();
    pageViewService = moduleRef.get<PageViewService>(PageViewService);
  });

  describe('Gets view count.', () => {
    it('Tests viewKey generator.', async () => {
      expect(await pageViewService.getViewCount(10)).toBe(1);
    })
  });

  describe('Gets view count list.', () => {
    it('Tests view count type converter', async () => {
      expect(await pageViewService.getViewCounts([1])).toEqual([1]);
    });
  });

  describe('Increment view count', () => {
    it('Tests view count increment', async () => {
      expect(await pageViewService.incrView(1)).toBe(1);
    });
  });

});
