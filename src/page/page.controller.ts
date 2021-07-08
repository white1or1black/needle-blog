import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { PageEntity } from './page.entity';
import { AddPageDto, PageDto, CheckPageDto, UpdatePageDto } from './page.dto';
import { PageService } from './page.service';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Request, Res, Body, Controller, Post, Get, Put, Delete, Query, UseGuards, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

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

  @UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads'
    , filename: (req, file, cb) => {
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
      cb(null, `${randomName}${extname(file.originalname)}`)
    }
  })
}))
  @Post('upload')
  async upload(@UploadedFile() file: Express.Multer.File): Promise<any> {
    return file.filename;
  }
  @Get('uploads/*')
  async uploadedFile(@Request() req, @Res() res): Promise<any> {
    const pathArr: string[] = req.originalUrl.split('/');
    const filename: string = pathArr[pathArr.length - 1];
    const uploadDir = join('./uploads');
    return fs.createReadStream(join(uploadDir, filename)).pipe(res);
  }
}