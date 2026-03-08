import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CourseService {
  private courses = [
    { id: 1, name: 'OOP 1', description: 'Java OOP Concepts' },
    { id: 2, name: 'OOP 2', description: 'C# OOP Concepts' },
  ];

  //Get
  getAllCourses() {
    return this.courses;
  }

  getCourseById(id: string) {
    const course = this.courses.find((course) => course.id === Number(id));
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  //Post
  createCourse(course: { name: string; description: string }) {
    const newCourse = { id: this.courses.length > 0? Math.max(...this.courses.map((c) => c.id)) + 1: 1,
      ...course,
    };
    this.courses.push(newCourse);
    return newCourse;
  }

  //Put
  updateCourse(id: string, course: { name: string; description: string }) {
    const index = this.courses.findIndex((course) => course.id === Number(id));
    if (index === -1) throw new NotFoundException('Course not found');
    this.courses[index] = { id: Number(id), ...course };
    return this.courses[index];
  }

  //Patch
  patchCourse(id: string, course: Partial<{ name: string; description: string }>) {
    const courses = this.getCourseById(id);
    if (course.name) courses.name = course.name;
    if (course.description) courses.description = course.description;
    return courses;
  }

  //Delete
  deleteCourse(id: string) {
    const index = this.courses.findIndex((course) => course.id === Number(id));
    if (index === -1) throw new NotFoundException('Course not found');
    const deletedCourse = this.courses.splice(index, 1);
    return deletedCourse;
  }
}
