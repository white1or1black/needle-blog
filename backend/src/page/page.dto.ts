import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';


export class GetPageDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id: number;
}
export class GetPageResDto {
  id: number;
  title: string;
  content: string;
  updatedAt: Date;
}

export class AddPageDto {
  @IsNotEmpty()
  title: string;
  content: string;
}
export class AddPageResDto {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdatePageDto {
  pageId: number;
  title?: string;
  content?: string;
}
export class UpdatePageResDto {
  id: number;
  title: string;
  content: string;
  updatedAt: Date;
}