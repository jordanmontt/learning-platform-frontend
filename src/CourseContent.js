import React from "react";
import ChapterContent from './ChapterContent'

export default class CourseContent extends React.Component {

    associateChaptersWithLessons(chapters, lessons) {
        var formatedChapters = [];
        chapters.forEach(chapter => {
            let chapterLesson = [];
            lessons.forEach(lesson => {
                if (lesson.idChapter === chapter.idChapter) {
                    chapterLesson.push(lesson)
                }
            })
            formatedChapters.push({ chapter: chapter, lessons: chapterLesson });
        })
        return formatedChapters;
    }

    createListOfContent() {
        var formatedChapters = this.associateChaptersWithLessons(this.props.chapters, this.props.lessons);
        var result = [];
        formatedChapters.forEach(formatedChapter => {
            result.push(<ChapterContent key={formatedChapter.chapter.idChapter}
                chapter={formatedChapter.chapter}
                lessons={formatedChapter.lessons}
                currentLesson={this.props.currentLesson}
                onLessonChange={this.props.onLessonChange} />)
        });
        return result;
    }

    render() {
        return (
            <div className="container is-fluid">
                <div className="notification ">
                    {this.createListOfContent().map(e => { return e })}
                    <div className="buttons">
                        <button className="button" onClick={() => this.handleClick()}>Anterior</button>
                        <button className="button" >Siguiente</button>
                    </div>
                </div>
            </div>
        );
    }
}