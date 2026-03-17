import { Controller, Post, Body, Get } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollment')
export class EnrollmentController {
    constructor(private readonly enrollmentService: EnrollmentService) {}

    @Get()
    getEnrollments() {
        return this.enrollmentService.getEnrollments();
    }

    @Post()
    enrollStudent(@Body() data: { studentName: string, courseId: string }) {
        return this.enrollmentService.enrollStudent(data.studentName, data.courseId);
    }
}
