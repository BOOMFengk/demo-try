import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export type QueryHook<Entity> = (
  qb: SelectQueryBuilder<Entity>,
) => Promise<SelectQueryBuilder<Entity>>;

/**
 * 分页原数据
 */

export interface PaginateMeta {
  /**
   * 当前页项目数量
   */
  itemCount: number;
  /**
   * 项目总数量
   */
  totalItems?: number;
  /**
   * 每页显示数量
   */
  perPage: number;
  /**
   * 总页数
   */
  totalPages?: number;
  /**
   * 当前页码
   */
  currentPage: number;
}

/**
 * 分页选项
 */
export interface PaginateOptions {
  /**
   * 分页数据
   */
  page: number;
  /**
   * 每页显示数量
   */
  limit: number;
}

/**
 * 分页返回数据
 */
export interface PaginateReturn<E extends ObjectLiteral> {
  /**
   * 数据
   */
  items: E[];
  /**
   * 分页原数据
   */
  meta: PaginateMeta;
}
