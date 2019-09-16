import React from 'react';
import HttpService from '../Services/HttpService';
import Navbar from '../Navbar/Navbar';
import CourseContentForCourseView from './CourseContentForCourseView';
import queryString from 'query-string';
import EnrollButton from './EnrollButton';

export default class CourseView extends React.Component {

    constructor(props) {
        super(props);
        let urlParams = queryString.parse(this.props.location.search);
        this.courseId = parseInt(urlParams.c);
        this.state = {
            courseName: "",
            courseDescription: "",
            lessons: [],
            chapters: [],
        }
    }

    componentDidMount() {
        this.obtainData();
    }

    obtainData() {
        this.fetchData()
            .then(data => {
                this.dataObtainedSuccessfully(data);
            })
            .catch(error => {
                console.log("ERROR obtaining course data: ", error);
            })
    }

    async fetchData() {
        let course = await HttpService.fetchCourse(this.courseId);
        let chapters = await HttpService.fetchChapters(this.courseId);
        let lessons = await HttpService.fetchLessons(chapters);
        return { course: course, lessons: lessons, chapters: chapters };
    }

    dataObtainedSuccessfully(data) {
        this.setState({
            courseName: data.course.name,
            courseDescription: data.course.description,
            lessons: data.lessons,
            chapters: data.chapters,
        })
    }

    render() {
        return (
            <>
                <Navbar />
                <section className="hero is-link is-fullheight dashboard-background">
                    <div className="hero-head">
                        <div className="container">
                            <br />
                            <h1 className="title is-1 has-text-centered">{this.state.courseName}</h1>
                        </div>
                    </div>
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered is-mobile">
                                <div className=" column is-9">
                                    <p className="has-text-left is-size-5">{this.state.courseDescription}</p>
                                </div>
                                <div className=" column is-3">
                                    <EnrollButton chapters={this.state.chapters} lessons={this.state.lessons}
                                        courseId={this.courseId} />
                                </div>
                            </div>
                            <br />
                            <div className="columns is-centered is-mobile">
                                <div className="notification column is-4">
                                    <h1 className="title is-size-5 has-text-black has-text-centered">
                                        Contenido
                                    </h1>
                                </div>
                            </div>
                            <br />
                            <CourseContentForCourseView lessons={this.state.lessons}
                                chapters={this.state.chapters} />
                        </div>
                    </div>
                </section>
            </>
        );
    }
}