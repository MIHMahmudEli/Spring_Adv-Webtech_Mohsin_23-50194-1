import { Controller,Get , Param, Post, Body} from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './interfaces/course.interface';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService){}

    @Get()
    getAllCourses(): Course[] {
        return this.courseService.getAllCourses();
    }

    @Get(':id')
    getCourseById(@Param('id') id: string) {
        return this.courseService.getCourseById(Number(id));
    }

    @Post()
    createCourse(@Body() createCourseDto: CreateCourseDto) {
        return this.courseService.createCourse(createCourseDto);
    }
}
