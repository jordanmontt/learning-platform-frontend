export default class CourseInProgressInterceptor {
    static parseOne(unparsedCourseInProgress) {
        return {
            idCourse: parseInt(unparsedCourseInProgress.idCourse),
            idCourseInProgress: parseInt(unparsedCourseInProgress.idCourseInProgress),
            idLessonInProgress: parseInt(unparsedCourseInProgress.idLessonInProgress),
            idStudent: parseInt(unparsedCourseInProgress.idStudent),
            isFinished: parseInt(unparsedCourseInProgress.isFinished),
            lastAccessDate: unparsedCourseInProgress.lastAccessDate
        }
    }

    static parseMany(unparsedCoursesInProgress) {
        let parsedCoursesInProgress = [];
        unparsedCoursesInProgress.forEach(cp => {
            parsedCoursesInProgress.push(this.parseOne(cp));
        })
        return parsedCoursesInProgress
    }
}