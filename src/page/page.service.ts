import { AddPageDto, PageDto, UpdatePageDto } from './page.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageEntity } from "./page.entity";

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PageEntity)
    private readonly pageRepo: Repository<PageEntity> ) {}

  async addPage(blog: AddPageDto): Promise<boolean> {
    await this.pageRepo.save(
      await this.pageRepo.create({status: 1, ...blog})
    );

    return true;
  }

  async getPage(pageId?: number): Promise<Array<PageEntity>> {
    const query = this.pageRepo.createQueryBuilder('page').orderBy('created_at', 'DESC');
    query.andWhere(`status=1`);
    if (pageId) query.andWhere(`id=${pageId}`);

    query.select(['page.id', 'page.title', 'page.content', 'page.createdAt', 'page.updatedAt']);

    return await query.getMany();
  }

  async updatePage(body: UpdatePageDto): Promise<boolean> {
    const old = await this.pageRepo.findOne(body.pageId);
    await this.pageRepo.save(
      await this.pageRepo.merge(old, {
        title: body.title,
        content: body.content
      })
    );
    return true;
  }

  async delPage(pageId: string): Promise<boolean> {
    const page = await this.pageRepo.findOne(pageId);
    await this.pageRepo.save(
      await this.pageRepo.merge(page, { status: 0 })
    );
    return true;
  }
}