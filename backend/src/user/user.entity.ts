import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert, 
  PrimaryGeneratedColumn,
  Index
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';

@Entity({
  name: 'user'
})
export class UserEntity {
  static async comparePassword(pwdBefore: string, pwdLater: string) {
    return bcrypt.compareSync(pwdBefore, pwdLater);
  }

  static encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Index({ unique: true })
  @Column({ length: 50 })
  username: string;

  @ApiProperty()
  @Column({ length: 512 })
  password: string;


  @ApiProperty()
  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
  })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
  })
  updatedAt: Date;

  @BeforeInsert()
  encrypt() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
