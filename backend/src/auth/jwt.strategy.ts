import { AuthService } from './auth.service';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './jwt.constants';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( private readonly authService:AuthService ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  async validate(payload: any): Promise<any> {
    return await this.authService.jwtValidate({
      username: payload.username,
      id: payload.sub
    });
  }
}