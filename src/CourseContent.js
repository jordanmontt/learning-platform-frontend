import React from "react";
import ChapterContent from './ChapterContent'

export default class CourseContent extends React.Component {

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

    createContentOfOneChapter(chapterWithLessons) {
        return (
            <ChapterContent key={chapterWithLessons.chapter.idChapter}
                chapter={chapterWithLessons.chapter}
                lessons={chapterWithLessons.lessons}
                currentLesson={this.props.currentLesson}
                onLessonChange={this.props.onLessonChange} />
        );
    }

    createListOfContent() {
        var listOfContent = [];
        var chaptersAssociatedWithLessons = this.associateChaptersWithLessons(this.props.chapters, this.props.lessons);
        chaptersAssociatedWithLessons.forEach(chapterWithLessons => {
            listOfContent.push(this.createContentOfOneChapter(chapterWithLessons));
        });
        return listOfContent;
    }

    render() {
        return (
            <div className="container is-fluid">
                <div className="notification ">
                    {this.createListOfContent().map(e => { return e })}
                </div>
            </div>
        );
    }
}