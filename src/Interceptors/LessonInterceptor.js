export default class LessonInterceptor {

    static parseOne(unparsedLesson) {
        return {
            idLesson: parseInt(unparsedLesson.idLesson),
            idChapter: parseInt(unparsedLesson.idChapter),
            idVideo: parseInt(unparsedLesson.idVideo),
            lessonNumber: parseInt(unparsedLesson.lessonNumber),
            name: unparsedLesson.name
        };
    }

    static parseMany(unparsedLessons) {
        let parsedLessons = [];
        unparsedLessons.forEach(l => {
            parsedLessons.push(this.parseOne(l));
        })
        return parsedLessons
    }
}