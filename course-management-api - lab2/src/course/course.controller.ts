import { Controller, Get, Param, Body, Post, Put, Patch, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdateCourseDto } from './dto/update-course.dto';

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
  updateCourse(@Param('id') id: string, @Body() course: CreateCourseDto) {
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),

      limits: { fileSize: 2 * 1024 * 1024, },
      
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/(jpg|jpeg|png|pdf)/)) {
          return cb(new BadRequestException('Only JPG, JPEG, PNG, PDF allowed'),false,);
        }
        cb(null, true);
      },
    }),
  )
  uploadCourseMaterial(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.courseService.uploadCourseMaterial(id, file);
  }

}
