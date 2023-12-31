import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';

import { PaginateOptions } from '@/modules/database/types';

import { PostService } from '../services/post.service';

@Controller('posts')
export class PostController {
  constructor(private service: PostService) {}

  @Get()
  async list(
    @Query()
    options: PaginateOptions,
  ) {
    return this.service.paginate(options);
  }

  @Get(':id')
  async detail(
    @Param('id', new ParseIntPipe())
    id: string,
  ) {
    return this.service.detail(id);
  }

  @Post()
  async store(
    @Body()
    data: Record<string, any>,
  ) {
    return this.service.create(data);
  }

  @Patch()
  async update(
    @Body()
    data: Record<string, any>,
  ) {
    return this.service.update(data);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.delete(id);
  }
}
