import { Controller, Get, Param, Body, Post, Put, Patch, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }

  @Post()
  createCourse(@Body() course: CreateCourseDto) {
    return this.courseService.createCourse(course);
  }

  @Put(':id')
  updateCourse(@Param('id') id: string, @Body() course: UpdateCourseDto) {
    return this.courseService.updateCourse(id, course);
  }

  @Patch(':id')
  patchCourse(@Param('id') id: string, @Body() course: UpdateCourseDto) {
    return this.courseService.patchCourse(id, course);
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }

  //fiel uoload 
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadCourseMaterial(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.courseService.uploadCourseMaterial(id, file);
  }

}
