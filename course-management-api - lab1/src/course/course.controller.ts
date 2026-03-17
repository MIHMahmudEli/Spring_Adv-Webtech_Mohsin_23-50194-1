import { Controller, Get, Param, Body, Post, Put, Patch, Delete } from '@nestjs/common';
import { CourseService } from './course.service';

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
  createCourse(@Body() course: { name: string; description: string }) {
    return this.courseService.createCourse(course);
  }

  @Put(':id')
  updateCourse(@Param('id') id: string, @Body() course: { name: string; description: string }) {
    return this.courseService.updateCourse(id, course);
  }

  @Patch(':id')
  patchCourse(@Param('id') id: string, @Body() course: Partial<{ name: string; description: string }>) {
    return this.courseService.patchCourse(id, course);
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }

}
