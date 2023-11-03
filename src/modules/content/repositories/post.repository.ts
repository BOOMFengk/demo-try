import { Repository } from 'typeorm/repository/Repository';

import { CustonRepository } from '@/modules/database/decorators';

import { PostEntity } from '../entites/post.entity';

@CustonRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  buildBaseQB() {
    return this.createQueryBuilder('post');
  }
}
