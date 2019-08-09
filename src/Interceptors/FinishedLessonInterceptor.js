export default class FinishedLessonInterceptor {

    static parseFinishedLesson(unparsedFinishedLesson) {
        return {
            idFinishedLesson: parseInt(unparsedFinishedLesson.idFinishedLesson),
            idCourseInProgress: parseInt(unparsedFinishedLesson.idCourseInProgress),
            idLesson: parseInt(unparsedFinishedLesson.idLesson)
        }
    }

    static parse(unparsedFinishedLessons) {
        let parsedFinishedLessons = [];
        unparsedFinishedLessons.forEach(fl => {
            parsedFinishedLessons.push(this.parseFinishedLesson(fl));
        })
        return parsedFinishedLessons
    }
}