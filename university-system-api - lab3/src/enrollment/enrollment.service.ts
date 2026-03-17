import { Injectable } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';
import { forwardRef, Inject } from '@nestjs/common';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class EnrollmentService {
    constructor( 
        private readonly courseService: CourseService,
        @Inject(forwardRef(() => NotificationService)) 
        private readonly notificationService: NotificationService, 
    ) {}    

    private enrollments: {studentName: string, courseId: string}[] = [];

    enrollStudent(studentName: string, courseId: string) {
        const course = this.courseService.getCourseById(Number(courseId));
        
        const newEnrollment = { studentName, courseId };
        this.enrollments.push(newEnrollment);

        const notification = this.notificationService.sendNotification(
            studentName,
            'Enrollment successful'
        );   

        return {
            message: 'Student enrolled successfully',
            student: studentName,
            course: course,
            notification: notification
        };
    }

    getEnrollments() {
        return {
            message : "All enrollments fetched",
            data : this.enrollments
        }
    }

    getEnrollmentsByStudentName(studentName: string) {
        return this.enrollments.filter(enrollment => enrollment.studentName === studentName);
    }
}
