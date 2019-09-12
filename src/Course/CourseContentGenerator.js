import React from "react";
import ChapterContent from './ChapterContent'

export default class CourseContentGenerator {

    associateChaptersWithLessons(chapters, lessons) {
        var chaptersAssociatedWithLessons = [];
        chapters.forEach(chapter => {
            let lessonsBelongingToAChapter = this.findLessonsBelongingToAChapter(lessons, chapter.idChapter);
            chaptersAssociatedWithLessons.push({ chapter: chapter, lessons: lessonsBelongingToAChapter });
        })
        return chaptersAssociatedWithLessons;
    }

    findLessonsBelongingToAChapter(lessons, chapterId) {
        let lessonsBelongingToAChapter = [];
        lessons.forEach(lesson => {
            if (lesson.idChapter === chapterId) {
                lessonsBelongingToAChapter.push(lesson)
            }
        })
        return lessonsBelongingToAChapter;
    }

    createContentForOneChapter(chapterWithLessons, currentLesson, onLessonChange) {
        return (
            <ChapterContent key={chapterWithLessons.chapter.idChapter}
                chapter={chapterWithLessons.chapter}
                lessons={chapterWithLessons.lessons}
                currentLesson={currentLesson}
                onLessonChange={onLessonChange} />
        );
    }

    createListOfContent(chapters, lessons, currentLesson, onLessonChange) {
        var listOfContent = [];
        var chaptersAssociatedWithLessons = this.associateChaptersWithLessons(chapters, lessons);
        chaptersAssociatedWithLessons.forEach(chapterWithLessons => {
            listOfContent.push(this.createContentForOneChapter(chapterWithLessons, currentLesson, onLessonChange));
        });
        return listOfContent;
    }
}