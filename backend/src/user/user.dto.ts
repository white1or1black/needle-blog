export class UserDto {
  id: number;
  username: string;
  password?: string;
}

export class AddUserDto {
  username: string;
  password: string;
}