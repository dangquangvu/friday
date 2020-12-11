import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  BlogFilter,
  BlogResponse,
  CreateBlogDTO,
  updateBlogDTO,
} from './blog.dto';
import { BlogService } from './blog.service';
@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get blogs' })
  getBlog(): Promise<any> {
    return this.blogService.getBlog();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get details blog' })
  getDetailBlog(@Param('id') id: number): Promise<any> {
    return this.blogService.getDetailBlog(id);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'create blog' })
  postBlog(@Param('id') id: number): Promise<any> {
    return this.blogService.postBlog(id);
  }
}
