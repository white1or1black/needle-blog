export class PageDto {
  id: number;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export class CheckPageDto {
  id?: number;
}

export class AddPageDto {
  title: string;
  content: string;
}

export class UpdatePageDto {
  pageId: number;
  title?: string;
  content?: string;
}