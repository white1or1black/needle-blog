import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { PageEntity } from './page.entity';
import { AddPageDto, PageDto, CheckPageDto, UpdatePageDto } from './page.dto';
import { PageService } from './page.service';
import { Body, Controller, Post, Get, Put, Delete, Query, UseGuards } from "@nestjs/common";

@Controller('page')
export class PageController {
  constructor(
    private readonly pageService: PageService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addPage(@Body() body: AddPageDto): Promise<boolean> {
    return await this.pageService.addPage(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updatePage(@Body() body: UpdatePageDto): Promise<boolean> {
    return this.pageService.updatePage(body);
  }

  @Get('get')
  async getPage(@Query() query:CheckPageDto): Promise<PageEntity[]>{
    return await this.pageService.getPage(query.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('del')
  async delPage(@Body() body, @Query() query): Promise<boolean> {
    await this.pageService.delPage(body.pageId);
    return true;
  }
}