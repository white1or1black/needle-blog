import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { Injectable } from "@nestjs/common";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class AuthService {
   constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService) {}

  async login(user: object): Promise<object> {
    return {
      token: this.jwtService.sign({...user})
    };
  }

  /**
   * validate login token
   * @param username 
   * @param password 
   * @returns 
   */
  async localValidate(username: string, password: string): Promise<UserEntity> {
    return await this.userService.compNameAndPwd(username, password);
  }

  async jwtValidate(userInfo: object): Promise<object> {
    return userInfo;
  }

  /**
   * check if user can manipulate responsible page
   * @param username 
   * @param pageId 
   * @returns 
   */
  async checkPageAuth(username: string, pageId: string): Promise<string> {
    const user = await this.userService.findBaseUseInfo(username);
    return username === user.username? 'success': 'failed';
  }
}