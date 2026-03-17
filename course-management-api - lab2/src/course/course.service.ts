import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './interfaces/course.interface';

@Injectable()
export class CourseService {
  private courses: Course[] = [
    { id: 1, name: 'OOP 1', code: 'CS101', instructor: 'Mohsin ', credits: 3, description: 'Java OOP Concepts' },
    { id: 2, name: 'OOP 2', code: 'CS102', instructor: 'Jamal', credits: 3, description: 'C# OOP Concepts' },
  ];

  // GET ALL
  getAllCourses() {
    return {
      message: "All courses fetched successfully",
      data: this.courses
    };
  }

  // GET BY ID
  getCourseById(id: string) {
    const course = this.courses.find(c => c.id === Number(id));

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return {
      message: "Course fetched successfully",
      data: course
    };
  }

  // CREATE
  createCourse(dto: CreateCourseDto) {

    const newCourse = {
      id: this.courses.length + 1,
      ...dto
    };

    this.courses.push(newCourse);

    return {
      message: "Course created successfully",
      data: newCourse
    };
  }

  //FULL UPDATE (PUT)
  updateCourse(id: string, updateCourseDto: UpdateCourseDto) {
    const index = this.courses.findIndex((course) => course.id === Number(id));
    if (index === -1) throw new NotFoundException('Course not found');
    this.courses[index] = { ...this.courses[index], ...updateCourseDto };
    return {
      message: "Course updated successfully",
      id: id,
      data: this.courses[index]
    };
  }

  //PARTIAL UPDATE (PATCH)
  patchCourse(id: string, updateCourseDto: UpdateCourseDto) {
    const index = this.courses.findIndex((course) => course.id === Number(id));
    if (index === -1) throw new NotFoundException('Course not found');
    Object.assign(this.courses[index], updateCourseDto);
    return {
      message: "Course patched successfully",
      id: id,
      updatedFields: Object.keys(updateCourseDto)
    };
  }

  //Delete
  deleteCourse(id: string) {
    const index = this.courses.findIndex((course) => course.id === Number(id));
    if (index === -1) throw new NotFoundException('Course not found');
    const deletedCourse = this.courses.splice(index, 1);
    return {
      message: "Course deleted successfully",
      id: id,
      data: deletedCourse
    };
  }

  // FILE UPLOAD
  uploadCourseMaterial(id: string, file: Express.Multer.File) {
    const course = this.courses.find(c => c.id === Number(id));
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return {
      message: "Material uploaded successfully",
      courseId: id,
      filename: file.filename,
      path: file.path
    };
  }
  
}
