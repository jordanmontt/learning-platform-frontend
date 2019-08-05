export default class ChapterInterceptor {
    
    static parseChapter(unparsedChapter) {
        return {
            idChapter: parseInt(unparsedChapter.idChapter),
            name: unparsedChapter.name,
            chapterNumber: parseInt(unparsedChapter.chapterNumber),
            idCourse: parseInt(unparsedChapter.idCourse)
        }
    }

    static parseChapters(unparsedChapters) {
        let parsedChapters = [];
        unparsedChapters.forEach(c => {
            parsedChapters.push(this.parseChapter(c));
        })
        return parsedChapters
    }
}