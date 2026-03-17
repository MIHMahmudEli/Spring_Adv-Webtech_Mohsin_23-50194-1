import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './interfaces/course.interface';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
    private courses: Course[] = [
    { id: 1, name: 'OOP 1', code: 'CS101', instructor: 'Mohsin ', credits: 3, description: 'Java OOP Concepts' },
    { id: 2, name: 'OOP 2', code: 'CS102', instructor: 'Jamal', credits: 3, description: 'C# OOP Concepts' },
  ];

  getAllCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course {
    const course = this.courses.find((course) => course.id === id);
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  createCourse(createCourseDto: CreateCourseDto): Course {
    const course: Course = {
      id: this.courses.length + 1,
      ...createCourseDto,
    };
    this.courses.push(course);
    return course;
  }
}
