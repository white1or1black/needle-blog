import { ParseIntPipe, Param } from '@nestjs/common';
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from "./user.service";
import { UserDto, AddUserDto } from './user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/get')
  async getUserList(): Promise<Array<any>> {
    return this.userService.getUserList();
  }

  @Get('/get/:id')
  async findUserById(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return this.userService.findUserById(id);
  }

  // @Post('adduser')
  // async addUser(@Body() body: AddUserDto): Promise<boolean> {
  //   return await this.userService.addUser(body.username, body.password);
  // }
}