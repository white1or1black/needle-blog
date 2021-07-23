import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { AddPageDto, UpdatePageDto, GetPageDto, GetPageResDto, AddPageResDto, UpdatePageResDto } from './page.dto';
import { PageService } from './page.service';
import { diskStorage, Multer } from 'multer';
import { extname, join } from 'path';
import { Request, Res, Body, Controller, Post, Get, Put, Delete, Query, Param, UseGuards, UploadedFile, UseInterceptors, ParseIntPipe } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@Controller('page')
export class PageController {
  constructor(
    private readonly pageService: PageService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addPage(@Body() body: AddPageDto): Promise<AddPageResDto> {
    return await this.pageService.addPage(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updatePage(@Param('id', new ParseIntPipe()) id: number, @Body() body: UpdatePageDto): Promise<UpdatePageResDto> {
    return this.pageService.updatePage(id, body);
  }

  @Get('get/:id?')
  async getPage(@Param() param: GetPageDto): Promise<GetPageResDto[]>{
    return await this.pageService.getPage(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('del/:id')
  async delPage(@Param('id', new ParseIntPipe()) id: number): Promise<boolean> {
    return await this.pageService.delPage(id);
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
  async upload(@UploadedFile() file: Multer.File): Promise<any> {
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