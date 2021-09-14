import { UserDto } from './../user/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
   constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService) {}

  async login(user: object): Promise<object> {
    return {
      username: user['username'],
      token: this.jwtService.sign({...user})
    };
  }

  /**
   * validate login token
   * @param username 
   * @param password 
   * @returns 
   */
  async localValidate(username: string, password: string): Promise<UserDto> {
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
    return 'success';
  }
}