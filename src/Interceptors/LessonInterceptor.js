export default class LessonInterceptor {
    
    static parseLesson(unparsedLesson) {
        return {
            idLesson: parseInt(unparsedLesson.idLesson),
            idChapter: parseInt(unparsedLesson.idChapter),
            idVideo: parseInt(unparsedLesson.idVideo),
            name: unparsedLesson.name
        };
    }

    static parse(unparsedLessons) {
        let parsedLessons = [];
        unparsedLessons.forEach(l => {
            parsedLessons.push(this.parseLesson(l));
        })
        return parsedLessons
    }
}