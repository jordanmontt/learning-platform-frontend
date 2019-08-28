export default class FinishedLessonInterceptor {

    static parseOne(unparsedFinishedLesson) {
        return {
            idFinishedLesson: parseInt(unparsedFinishedLesson.idFinishedLesson),
            idCourseInProgress: parseInt(unparsedFinishedLesson.idCourseInProgress),
            idLesson: parseInt(unparsedFinishedLesson.idLesson)
        }
    }

    static parseMany(unparsedFinishedLessons) {
        let parsedFinishedLessons = [];
        unparsedFinishedLessons.forEach(fl => {
            parsedFinishedLessons.push(this.parseOne(fl));
        })
        return parsedFinishedLessons
    }
}