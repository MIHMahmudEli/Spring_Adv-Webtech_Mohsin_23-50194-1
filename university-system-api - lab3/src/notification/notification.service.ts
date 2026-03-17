import { Injectable } from '@nestjs/common';
import { EnrollmentService } from 'src/enrollment/enrollment.service';
import { forwardRef, Inject } from '@nestjs/common';

@Injectable()
export class NotificationService {
    constructor(
        @Inject(forwardRef(() => EnrollmentService))
        private readonly enrollmentService: EnrollmentService
    ) {}

    sendNotification(studentName: string, message: string) {
        const enrollments = this.enrollmentService.getEnrollmentsByStudentName(studentName);
        return {
            status: 'sent',
            studentName,
            message,
            enrollmentCount: enrollments.length,
        };
    }

    checkEnrollmentAndNotify(studentName: string, courseId: string) {
        const result = this.enrollmentService.getEnrollments();
        const enrollments = result.data;

        const isEnrolled = enrollments.some(
            (e) => e.studentName === studentName && e.courseId === courseId
        );

        return {
            message: isEnrolled
                ? `Student "${studentName}" IS enrolled in course ${courseId}`
                : `Student "${studentName}" is NOT enrolled in course ${courseId}`,
            student: studentName,
            courseId: courseId,
            isEnrolled,
        };
    }
}
