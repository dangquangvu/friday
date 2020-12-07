import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { async } from 'rxjs';
import { Blog, User } from 'src/shared/interfaces/db.interface';
import { BlogFilter, CreateBlogDTO, updateBlogDTO } from './blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Blog') private blogModel: Model<Blog>,
  ) {}

  getBlog = async (filter: BlogFilter) => {
    let queryObject: any = {};
    console.log(typeof filter.authorId);
    console.log(filter);
    if (filter.authorId) {
      const exist = await this.userModel.findOne({ authorId: filter.authorId });
      if (exist) throw new BadRequestException('Param is not match!');
      queryObject.authorId = filter.authorId;
    }
    if (filter.title) {
      queryObject.title = filter.title;
    }
    const data = await this.blogModel.find(queryObject);
    return data;
  };

  getDetailBlog = async (id: string) => {
    if (!id) throw new BadRequestException('Id is not match!');
    return this.blogModel.findById({ _id: id });
  };

  postBlog = async (createBlog: CreateBlogDTO) => {
    if (!createBlog.authorId || !createBlog.title || !createBlog.content) {
      throw new BadRequestException('Param is not match!');
    }
    if (createBlog.authorId) {
      const exist = await this.userModel.findById(createBlog.authorId);
      if (!exist) {
        throw new BadRequestException('Author id is not found');
      }
    }

    return await this.blogModel.create(createBlog);
  };

  updateBlog = async (input: updateBlogDTO, id) => {
    if (!id) {
      throw new BadRequestException('Id blog is not match!');
    }
    const exist = await this.blogModel.findOne({ _id: id });
    if (!exist) {
      throw new BadRequestException('Id blog is not found!');
    }
    let filterParam: any = {};
    if (input.authorId) {
      const exist = await this.userModel.findById(input.authorId);
      if (!exist) {
        throw new BadRequestException('AuthorId is not found!');
      }
      filterParam.authorId = input.authorId;
    }
    if (input.content) {
      filterParam.content = input.content;
    }
    if (input.desc) {
      filterParam.desc = input.desc;
    }
    if (input.title) {
      filterParam.title = input.title;
    }
    const update = await this.blogModel.updateOne({ _id: id }, filterParam);
    if (!update) {
      throw new NotFoundException('Update is not success!');
    }
    return update;
  };

  deleteBlog = async id => {
    if (!id) {
      throw new BadRequestException('Id is not match!');
    }
    const exist = await this.blogModel.findOne({ _id: id });
    if (!exist) {
      throw new BadRequestException('Id is not found!');
    }
    return await this.blogModel.deleteOne({ _id: id });
  };
}
