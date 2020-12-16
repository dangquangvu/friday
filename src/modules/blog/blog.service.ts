import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as data from '../../../blog.json';
import axios from 'axios';
import { CreateBlogDTO } from './blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Blog, User } from 'src/shared/interfaces/db.interface';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class BlogService {
  constructor(
    @InjectModel('Blog') private blogModel: Model<Blog>,
    @InjectModel('User') private userModel: Model<User>,
    protected authService: AuthService,
  ) {}

  getBlog = async () => {
    const data = await this.blogModel.find({});
    if (!data) {
      return [];
    }
    return data;
  };

  getDetailBlog = async (id: string) => {
    if (!id || !isValidObjectId(id))
      throw new BadRequestException('Id is not match!');
    const data = await this.blogModel.find({ _id: id });
    if (!data) {
      throw new NotFoundException('Blog is not found!');
    }
    return data;
  };

  postBlog = async (createBlogDTO: CreateBlogDTO, accessToken: string) => {
    const user_token = await this.authService.checkUserToken(accessToken);
    const user = await this.userModel.findOne({ _id: user_token.id });
    if (!user) {
      throw new NotFoundException('User is not found!');
    }
    console.log(user_token);
    if (
      !createBlogDTO.blogTitle ||
      !createBlogDTO.blogImage ||
      !createBlogDTO.slug ||
      !createBlogDTO.blogText
    ) {
      throw new BadRequestException('Body blog is not match!');
    }
    if (createBlogDTO.blogTitle) {
    }
    const blog = createBlogDTO.blogText;
    //this.getDetailBlog(id)?.blogText;
    const url = 'http://127.0.0.1:5000/';
    const data = { bar: blog };
    const options = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data,
    };
    let post;
    try {
      post = await axios.post(url, options);
    } catch {
      post = {};
    }
    let save = {
      blogTitle: createBlogDTO.blogTitle,
      blogImage: createBlogDTO.blogImage,
      slug: createBlogDTO.slug,
      blogText: createBlogDTO.blogText,
      // blogCategory:post.id ,
    };
    return this.blogModel.create();
  };
  deleteBlog = async (id, accessToken) => {};
}
