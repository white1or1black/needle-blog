import { PrismaService } from './../prisma/prisma.service';
import { PageModule } from './page.module';
import { Test, TestingModule } from '@nestjs/testing';
import { PageService } from './page.service';
import { PrismaServiceMock } from '../../test/mock/PrismaServiceMock';
import { originPageInfoList, originPageInfo, now } from '../../test/mock/PrismaDataMock';

describe('Page', () => {
  let pageService: PageService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PageModule],
      providers: [PageService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(PrismaServiceMock)
      .compile();
    pageService = moduleRef.get<PageService>(PageService);
  });

  describe('get pages', () => {
    it('get page list', async () => {
      expect(await pageService.getPage(null)).toBeInstanceOf(Array);
    });

    it('get page by id', async () => {
      const id: number = 1;
      expect(await pageService.getPage(id)).toHaveLength(1);
    });
  });

  describe('add page', () => {
    it('should return new page information with id and status.', async () => {
      const addContent = {
        title: 'title',
        content: 'test content',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      expect(await pageService.addPage(addContent)).toEqual({
        id: 1,
        status: 1,
        ...addContent,
      });
    });
  });

  describe('update page', () => {
    it('Should return updated information by update title and content.', async () => {
      const id: number = 1;
      const body = {
        pageId: 1,
        title: 'new title',
        content: 'new Content',
      };
      expect(await pageService.updatePage(id, body)).toMatchObject({
        id,
        title: body.title,
        content: body.content,
        updatedAt: now,
      });
    });
    it('Should return updated information by just update title', async () => {
      const id: number = 1;
      const title: string = 'new title';
      expect(
        await pageService.updatePage(id, { pageId: 1, title }),
      ).toMatchObject({
        id,
        title,
        content: originPageInfo.content,
        updatedAt: now,
      });
    });
  });

  describe('delete page', () => {
    it('delete one page', async () => {
      const id: number = 1;
      expect(await pageService.delPage(id)).toBeTruthy();
    });
  });
});
