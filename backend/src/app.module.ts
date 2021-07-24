import { PrismaModule } from './prisma/prisma.module';
import { PageModule } from './page/page.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    PageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
