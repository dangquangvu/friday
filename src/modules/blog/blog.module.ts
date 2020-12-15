import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModel } from 'src/shared/constants';
import { UserSchema } from '../auth/user.schema';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DbModel.USER, schema: UserSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
