import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as data from '../../../blog.json';
import axios from 'axios';
@Injectable()
export class BlogService {
  constructor() {}

  getBlog = async () => {
    console.log(<any>data);
    return data;
  };

  getDetailBlog = (id: number) => {
    console.log(typeof id, id);
    if (!id) throw new BadRequestException('Id is not match!');
    const exist = (<any>data).data.filter(item => item.id == id);
    if (!exist || exist.length === 0) {
      throw new BadRequestException('Id is not found!');
    }
    return exist[0];
  };

  postBlog = async (id: number) => {
    const blog = this.getDetailBlog(id)?.blogText;
    const url = 'http://127.0.0.1:5000/';
    const data = { bar: blog };
    const options = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data,
    };
    const post = axios.post(url, options);
    return post;
  };
}
