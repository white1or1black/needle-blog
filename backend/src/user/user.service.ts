import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private userList: Array<UserDto>;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo:Repository<UserEntity>
  ) {}

  async findUserById(id: number): Promise<UserDto> {
    return await this.userRepo.findOne(id);
  }

  async findUserByName(username: string, columns?: Array<keyof UserEntity>): Promise<UserEntity> {
    return await this.userRepo.findOne({
      select: columns,
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

  async compNameAndPwd(name: string, password: string): Promise<UserEntity> {
    const user = await this.findUserByName(name, ['username', 'password']);
    if (!user || !await UserEntity.comparePassword(password, user.password))
      return null

    delete user.password;
    return user;
  }

  async getUserList(): Promise<Array<UserDto>> {
    return this.userList;
  }

  async addUser(username: string, password:string): Promise<boolean> {
    const now = new Date();
    const newUser = await this.userRepo.create({
        username,
        password,
        createdAt: now,
        updatedAt: now
      });

    await this.userRepo.save( newUser );
    return true;
  }
}