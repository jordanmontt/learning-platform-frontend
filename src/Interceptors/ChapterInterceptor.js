export default class ChapterInterceptor {
    
    static parseOne(unparsedChapter) {
        return {
            idChapter: parseInt(unparsedChapter.idChapter),
            name: unparsedChapter.name,
            chapterNumber: parseInt(unparsedChapter.chapterNumber),
            idCourse: parseInt(unparsedChapter.idCourse)
        }
    }

    static parseMany(unparsedChapters) {
        let parsedChapters = [];
        unparsedChapters.forEach(c => {
            parsedChapters.push(this.parseOne(c));
        })
        return parsedChapters
    }
}