import { PrismaModule } from './../prisma/prisma.module';
import { PageService } from './page.service';
import { PageEntity } from './page.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageController } from './page.controller';
@Module({
  imports: [TypeOrmModule.forFeature([PageEntity]), PrismaModule],
  providers: [PageService, PageEntity],
  controllers: [PageController],
  exports: [PageService]
})
export class PageModule {}