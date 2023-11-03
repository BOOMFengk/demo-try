import { SetMetadata } from '@nestjs/common';

import { ObjectType } from 'typeorm/common/ObjectType';

import { CUSTOMER_REPOSITORY_METADATA } from '../constants';

export const CustonRepository = <T>(entity: ObjectType<T>): ClassDecorator =>
  SetMetadata(CUSTOMER_REPOSITORY_METADATA, entity);
