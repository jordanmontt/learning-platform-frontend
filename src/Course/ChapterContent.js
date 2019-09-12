import React from 'react'

export default class ChapterContent extends React.Component {

    createHighlightedLesson(lesson) {
        return (
            <li
                id={lesson.idLesson}
                key={lesson.idLesson}
                style={{ color: "#3399ff", cursor: "default" }}
                className="is-size-6">
                {lesson.name}
            </li>
        );
    }

    createNormalLessonWithClickHandler(lesson) {
        return (
            <li
                id={lesson.idLesson}
                key={lesson.idLesson}
                className="is-size-6"
                style={{ cursor: "default" }}
                onClick={this.props.onLessonChange}>
                {lesson.name}
            </li>
        );
    }

    createNormalLesson(lesson) {
        return (
            <li
                id={lesson.idLesson}
                key={lesson.idLesson}
                className="is-size-6"
                style={{ cursor: "default" }}>
                {lesson.name}
            </li>
        );
    }

    createLesson(lesson) {
        var lessonHtmlElement;
        if (this.props.currentLesson && this.props.currentLesson.idLesson === lesson.idLesson) {
            lessonHtmlElement = this.createHighlightedLesson(lesson);
        } else if (this.props.onLessonChange) {
            lessonHtmlElement = this.createNormalLessonWithClickHandler(lesson);
        } else {
            lessonHtmlElement = this.createNormalLesson(lesson);
        }
        return lessonHtmlElement;
    }

    render() {
        return (
            <div>
                <p className="is-size-5"
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