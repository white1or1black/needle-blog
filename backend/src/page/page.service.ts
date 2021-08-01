import { PrismaService } from './../prisma/prisma.service';
import {
  AddPageDto,
  UpdatePageDto,
  GetPageResDto,
  AddPageResDto,
  UpdatePageResDto,
} from './page.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PageService {
  constructor(private readonly prismaService: PrismaService) {}

  async addPage(blog: AddPageDto): Promise<AddPageResDto> {
    const page = await this.prismaService.page.create({
      data: { status: 1, ...blog },
    });
    return page;
  }

  async getPage(id: number): Promise<GetPageResDto[]> {
    const select = { id: true, title: true, content: true, updatedAt: true };
    if (id) {
      return await this.prismaService.page.findMany({
        select,
        where: { id, status: 1 },
      });
    }

    const pages = await this.prismaService.page.findMany({
      select,
      where: { status: 1 },
    });
    return pages;
  }

  async updatePage(id: number, body: UpdatePageDto): Promise<UpdatePageResDto> {
    if (!body.title && !body.content)
      throw new Error('One of title and content must be supplied.');

    const data: { title?: string; content?: string } = {};
    if (body.title) data.title = body.title;
    if (body.content) data.content = body.content;

    return await this.prismaService.page.update({
      data,
      where: { id },
      select: { id: true, title: true, content: true, updatedAt: true },
    });
  }

  async delPage(id: number): Promise<boolean> {
    const page = await this.prismaService.page.update({
      data: { status: 0 },
      where: { id },
    });
    return page.status === 0;
  }
}
