import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) { 
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const userInfo =  await this.authService.localValidate(username, password);
    if (!userInfo) throw new UnauthorizedException('login failed!');
    return userInfo;
  }

}