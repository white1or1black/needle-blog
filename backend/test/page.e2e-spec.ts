import { JwtAuthGuard } from './../src/auth/jwt-auth.guard';
import { PrismaServiceMock } from './mock/PrismaServiceMock';
import { PrismaService } from '../src/prisma/prisma.service';
import { PageModule } from './../src/page/page.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ExecutionContext } from '@nestjs/common';
import * as request from 'supertest';

describe('PageController (e2e)', () => {
  let app: INestApplication;
  const jwtGuard = {
    canActivate: (context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest();
      req.user = {};
      return true;
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PageModule],
      providers: [PrismaService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = {};
          return true;
        },
      })
      .overrideProvider(PrismaService)
      .useValue(PrismaServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/page/get (GET)', () => {
    it('Get page list', () => {
      return request(app.getHttpServer())
        .get('/page/get')
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBeGreaterThan(0);
        });
    });
    it('Get One page', () => {
      const id: number = 1;
      return request(app.getHttpServer())
        .get(`/page/get/${id}`)
        .expect(200)
        .then((res) => {
          expect(res.body.length).toEqual(1);
        });
    });
  });

  describe('/page/add (POST)', () => {
    it('Add one page successfully', () => {
      const pageInfo = {
        title: 'my title',
        content: 'my content',
      };
      return request(app.getHttpServer())
        .post('/page/add')
        .send(pageInfo)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.id).toBe(1);
          expect(res.body.title).toBe(pageInfo.title);
          expect(res.body.content).toBe(pageInfo.content);
        });
    });
  });

  describe('/page/update (PUT)', () => {
    const id: number = 1;
    const pageInfo = {
      title: 'new title',
      content: 'new content',
    };
    it('update page', () => {
      return request(app.getHttpServer())
        .put(`/page/update/${id}`)
        .send(pageInfo)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body).toMatchObject({
            id: 1,
            ...pageInfo,
          });
        });
    });
  });

  describe('/page/del (DELETE)', () => {
    const id: number = 1;
    it('delete one page', () => {
      return request(app.getHttpServer())
        .delete(`/page/del/${id}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body).toBeTruthy();
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
