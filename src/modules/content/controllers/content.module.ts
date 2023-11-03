import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '@/modules/database/database.module';

import { PostEntity } from '../entites/post.entity';
import { PostRepository } from '../repositories';
import { SanitizeService } from '../services';
import { PostService } from '../services/post.service';

import { PostSubscriber } from '../sunscribers';

import { PostController } from './post.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    DatabaseModule.forRepository([PostRepository]),
  ],
  controllers: [PostController],
  providers: [PostService, PostSubscriber, SanitizeService],
  exports: [PostService, DatabaseModule.forRepository([PostRepository])],
})
export class ContentModule {}
