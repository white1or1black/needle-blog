import { PageViewService } from './pageview.service';
import { StoreService } from '../store/store.service';
import { StoreModule } from '../store/store.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PageService } from './page.service';
import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
@Module({
  imports: [PrismaModule, StoreModule],
  providers: [PageService, StoreService, PageViewService],
  controllers: [PageController],
  exports: [PageService]
})
export class PageModule {}