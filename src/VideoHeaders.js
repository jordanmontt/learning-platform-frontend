import React from 'react'

export default class VideoHeader extends React.Component {

    getChapterName() {
        let totalChapters = this.props.totalChapters;
        return "Capitulo " + this.props.chapter.chapterNumber + " de " + totalChapters;
    }

    getLessonName() {
        return this.props.lesson.name;
    }

    getCourseName() {
        return this.props.courseName;
    }

    render() {
        return (
            <>
                <h1 className="title is-1"> {this.getCourseName()}</h1>
                <p className="subtitle is-4">{this.getChapterName()}</p>
                <p className="subtitle is-5">{this.getLessonName()}</p>
            </>);
    }
}