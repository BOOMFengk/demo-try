import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';

import { isNil, toNumber } from 'lodash';

import { toBoolean } from '@/modules/core/helpers';
import { PaginateOptions } from '@/modules/database/types';

import { PostOrderType } from '../contants';

/**
 * 文章分页查询验证
 */
export class QueryPostDto implements PaginateOptions {
  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsEnum(PostOrderType, {
    message: `排序规则必须是${Object.values(PostOrderType).join(',')}其中一项`,
  })
  @IsOptional()
  orderBy?: PostOrderType;

  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '当前页必须大于1' })
  @IsNumber()
  @IsOptional()
  page = 1;

  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '每页显示数据必须大于1' })
  @IsNumber()
  @IsOptional()
  limit: 10;
}
/**
 * 文章创建验证
 */
export class CreatePostDto {
  @MaxLength(255, {
    always: true,
    message: '文章标题长度是最大为$constraint1',
  })
  @IsNotEmpty({ message: '文章标题不能为空' })
  @IsOptional({ groups: ['update'] })
  body: string;

  @MaxLength(500, {
    always: true,
    message: '文章摘要长度最大为$constraint1',
  })
  summary?: string;

  @IsDateString({ strict: true }, { always: true })
  @IsOptional({ always: true })
  @ValidateIf((value) => !isNil(value.publishedAt))
  @Transform(({ value }) => (value === 'null' ? null : value))
  publishedAt?: Date;

  @MaxLength(20, {
    each: true,
    always: true,
    message: '文章关键字长度最大为$constraint1',
  })
  @IsOptional({ always: true })
  keywords?: string[];

  @Transform(({ value }) => toNumber(value))
  @Min(0, { always: true, message: '排序值必须大于0' })
  @IsNumber(undefined, { always: true })
  @IsOptional({ always: true })
  customOrder = 0;
}

/**
 * 文章更新验证
 */

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsUUID(undefined, { groups: ['update'], message: '文章ID格式错误' })
  @IsDefined({ groups: ['update'], message: '文章ID必须指定' })
  id: string;
}
