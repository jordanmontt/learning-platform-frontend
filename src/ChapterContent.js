import React from 'react'

export default class ChapterContent extends React.Component {

    createHighlightedLesson(lesson) {
        return (
            <ins
                id={lesson.idLesson}
                key={lesson.idLesson}
                style={{ color: "#3399ff", cursor: "default" }}
                className="is-6">
                {lesson.name}
            </ins>
        );
    }

    createNormalLesson(lesson) {
        return (
            <p
                id={lesson.idLesson}
                key={lesson.idLesson}
                className="is-6"
                style={{ color: "", cursor: "default" }}
                onClick={this.props.onLessonChange}>
                {lesson.name}
            </p>
        );
    }

    createLesson(lesson) {
        var lessonHtmlElement;
        if (this.props.currentLesson.idLesson === lesson.idLesson) {
            lessonHtmlElement = this.createHighlightedLesson(lesson);
        } else {
            lessonHtmlElement = this.createNormalLesson(lesson);
        }
        return lessonHtmlElement;
    }

    render() {
        return (
            <div className="container">
                <p className="is-5"
                    style={{ cursor: "default" }}>
                    <b>{this.props.chapter.name}</b>
                </p>
                {this.props.lessons.map(lesson => {
                    return this.createLesson(lesson);
                })}
            </div>
        );
    }
}