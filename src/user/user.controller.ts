import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from "./user.service";
import { UserDto, AddUserDto } from './user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('userlist')
  async getUserList(): Promise<Array<UserDto>> {
    return this.userService.getUserList();
  }

  @Get('finduserbyid')
  async findUserById(@Query() query): Promise<UserDto> {
    return this.userService.findUserById(query.id);
  }

  // @Post('adduser')
  // async addUser(@Body() body: AddUserDto): Promise<boolean> {
  //   return await this.userService.addUser(body.username, body.password);
  // }
}