import React from 'react'
import HttpService from '../Services/HttpService';

export default class VideoHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseName: ""
        };
    }

    // async componentDidMount() {
    //     console.log(this.props)
    //     await HttpService.fetchCourse(this.props.courseId)
    //         .then(response => {
    //             this.setState({ courseName: response.name })
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         });

    // }

    getCourseName() {
        if (this.props.courseId) {
            HttpService.fetchCourse(this.props.courseId)
                .then(course => {
                    this.setState({ courseName: course.name });
                })
        }
        return this.state.courseName;
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
            <div className="notification">
                <p className="subtitle is-size-2 has-text-black"> {this.getCourseName()}</p>
                <p className="title is-size-5 has-text-black">{this.getChapterName()}</p>
                <p className="subtitle is-size-6 has-text-black">{this.getLessonName()}</p>
            </div>
        );
    }
}