import React from 'react';
import CourseContentGenerator from './CourseContentGenerator';

export default class CourseContentForCourseView extends React.Component {

    createListOfContent() {
        let courseContentGenerator = new CourseContentGenerator();
        let lessons = this.props.lessons;
        let chapters = this.props.chapters;
        let listOfContent = courseContentGenerator.createListOfContent(chapters, lessons)
        return listOfContent;
    }

    renderListOfContent() {
        let listOfContent = this.createListOfContent();
        let renderedContent = listOfContent.map((content, index) => {
            return (
                <div className="column is-3 is-offset-1" key={index}>
                    {content}
                </div>
            );
        })
        return renderedContent;
    }

    render() {
        return (
            <div className="columns is-centered is-mobile is-multiline has-text-black">
                {this.renderListOfContent().map(e => { return e })}
            </div>
        );
    }
}