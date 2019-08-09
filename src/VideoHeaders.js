import React from 'react'

const axios = require('axios');

export default class VideoHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseName: ""
        };
    }

    async componentDidMount() {
        let course = await this.obtainCourseName();
        this.setState({
            courseName: course.name
        });
    }

    getChapterName() {
        let totalChapters = this.props.totalChapters.length;
        let currentChapterNumber = this.props.chapter.chapterNumber;
        return "Capitulo " + currentChapterNumber + " de " + totalChapters;
    }

    getLessonName() {
        return this.props.lesson.name;
    }

    async obtainCourseName() {
        let course;
        await axios.get('https://localhost:5001/api/course/' + this.props.courseId)
            .then(function (response) {
                course = response.data;
            })
            .catch(function (error) {
                console.log("ERROR in course name: ", error);
            })
        return course;
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