import { PrismaModule } from './../prisma/prisma.module';
import { PageService } from './page.service';
import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
@Module({
  imports: [PrismaModule],
  providers: [PageService],
  controllers: [PageController],
  exports: [PageService]
})
export class PageModule {}