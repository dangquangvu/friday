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
  getBlog(@Query() filter: BlogFilter): Promise<any> {
    return this.blogService.getBlog(filter);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get details blog' })
  getDetailBlog(@Param('id') id: string): Promise<any> {
    return this.blogService.getDetailBlog(id);
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'create blog' })
  postBlog(@Body() createBlog: CreateBlogDTO): Promise<any> {
    return this.blogService.postBlog(createBlog);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update blog' })
  updateBlog(
    @Body() input: updateBlogDTO,
    @Param('id') id: string,
  ): Promise<any> {
    return this.blogService.updateBlog(input, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'delete blog' })
  deleteBlog(@Param('id') id: string): Promise<any> {
    return this.blogService.deleteBlog(id);
  }
}
