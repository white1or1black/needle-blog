import { PrismaModule } from './prisma/prisma.module';
import { join } from 'path';
import { PageEntity } from './page/page.entity';
import { PageModule } from './page/page.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/user.entity';
import { ServeStaticModule} from '@nestjs/serve-static'; // New

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: 'needle_blog',
      entities: [UserEntity, PageEntity],
      synchronize: false
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    PageModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'frontend', 'dist')
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
