import { PrismaService } from './../prisma/prisma.service';
import { AddPageDto, UpdatePageDto, GetPageResDto, AddPageResDto, UpdatePageResDto } from './page.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageEntity } from "./page.entity";

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PageEntity)
    private readonly pageRepo: Repository<PageEntity>,
    private readonly prismaService: PrismaService
    ) {}

  async addPage(blog: AddPageDto): Promise<AddPageResDto> {
    return await this.prismaService.page.create({
      data: { status: 1, ...blog }
    });
  }

  async getPage(id: number): Promise<GetPageResDto[]> {
    const select = {id: true, title: true, content: true, updatedAt: true};
    if (id) {
      return await this.prismaService.page.findMany({
        select,
        where: { id, status: 1 },
      });
    }

    return await this.prismaService.page.findMany({
      select,
      where: { status: 1 }
    });
  }

  async updatePage(id: number, body: UpdatePageDto): Promise<UpdatePageResDto> {
    const { title, content } = body;
    return await this.prismaService.page.update({
      data: { title, content },
      where: { id },
      select: { id: true, title: true, content: true, updatedAt: true }
    });
  }

  async delPage(id: number): Promise<boolean> {
    await this.prismaService.page.update({
      data: { status: 0 },
      where: { id }
    });
    return true;
  }
}