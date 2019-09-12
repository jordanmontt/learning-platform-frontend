import React from "react";
import CourseContentGenerator from './CourseContentGenerator';

export default class CourseContentForCourseInProgress extends React.Component {

    createListOfContent() {
        let courseContentGenerator = new CourseContentGenerator();
        let lessons = this.props.lessons;
        let chapters = this.props.chapters;
        let currentLesson = this.props.currentLesson;
        let onLessonChange = this.props.onLessonChange;
        let listOfContent = courseContentGenerator.createListOfContent(chapters, lessons, currentLesson, onLessonChange)
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