import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from "@nestjs/common";
import { UserDto } from "./user.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  private userList: Array<UserDto>;
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async findUserById(id?: number): Promise<any> {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async findUserByName(username: string, columns?: string[]): Promise<any> {
    const sel = {};
    for(const col of columns) sel[col] = true;
    return await this.prismaService.user.findUnique({
      select: sel,
      where: { username }
    });
  }

  /**
   * Retrieve base user information, avoid query all columns
   * @param username 
   * @returns 
   */
  async findBaseUseInfo(username: string) {
    return await this.findUserByName(username, ['username']);
  }

  async compNameAndPwd(name: string, password: string): Promise<any> {
    const user = await this.findUserByName(name, ['username', 'password']);
    if (!user || !this.comparePassword(password, user.password))
      return null

    delete user.password;
    return user;
  }

  async getUserList(): Promise<Array<UserDto>> {
    return this.userList;
  }

  async addUser(username: string, password:string): Promise<boolean> {
    const now = new Date();
    await this.prismaService.user.create({
      data: {
        username,
        password: this.encryptPassword(password),
        createdAt: now,
        updatedAt: now
      }
    })
    return true;
  }

  comparePassword(pwdBefore: string, pwdLater: string) {
    return bcrypt.compareSync(pwdBefore, pwdLater);
  }

  encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
  }
}