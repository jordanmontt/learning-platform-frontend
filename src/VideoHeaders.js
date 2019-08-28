import React from 'react'
import HttpService from './HttpService';

export default class VideoHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseName: ""
        };
    }

    async componentDidMount() {
        let course = await HttpService.fetchCourse(this.props.courseId);
        if (course) {
            this.setState({
                courseName: course.name
            });
        }
    }

    getChapterName() {
        let totalChapters = this.props.totalChapters.length;
        let currentChapterNumber = this.props.chapter.chapterNumber;
        return "Capitulo " + currentChapterNumber + " de " + totalChapters;
    }

    getLessonName() {
        return this.props.lesson.name;
    }

    render() {
        return (
            <>
                <h1 className="title is-1"> {this.state.courseName}</h1>
                <p className="subtitle is-4">{this.getChapterName()}</p>
                <p className="subtitle is-5">{this.getLessonName()}</p>
            </>);
    }
}