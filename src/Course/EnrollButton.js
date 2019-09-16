import React from 'react';
import { Redirect } from 'react-router-dom';
import HttpService from '../Services/HttpService';
import LoginService from '../Services/LoginService';
import CourseContentGenerator from './CourseContentGenerator';

export default class EnrollButton extends React.Component {

    constructor(props) {
        super(props);
        let user = LoginService.isLoggedIn();
        this.state = {
            isButtonDisabled: false,
            redirect: false,
            user: user,
            redirectRoute: "",
        }
    }

    enrollToTheCourse(event) {
        event.preventDefault();
        this.disableButton();
        let userId = this.state.user.idPerson;
        let firstLesson = this.obtainFirstLesson();
        let firstLessonId = firstLesson.idLesson;
        HttpService.enrollToACourse(userId, this.props.courseId, firstLessonId)
            .then(response => {
                if (response) {
                    let route = `course-in-progress?c=${this.props.courseId}&cp=${response.idCourseInProgress}&lp=${firstLessonId}`
                    this.setState({ isButtonDisabled: false, redirect: true, redirectRoute: route });
                }
            })
            .catch(error => {
                console.log("ERROR rolling up to a course: ", error);
                this.setState({ isButtonDisabled: false });
            });
    }

    disableButton() {
        this.setState({ isButtonDisabled: true })
    }

    isButtonDisabled() {
        let doesCourseHaveContent = (this.props.chapters.length ? true : false) && (this.props.lessons.length ? true : false);
        return !this.state.user || !doesCourseHaveContent || this.state.isButtonDisabled;
    }

    renderRedirect() {
        if (this.state.redirect)
            return <Redirect to={this.state.redirectRoute} />
    }

    obtainFirstLesson() {
        let courseContentGenerator = new CourseContentGenerator();
        let lessonsWithChapeters = courseContentGenerator.associateChaptersWithLessons(this.props.chapters, this.props.lessons);
        let firstLesson = lessonsWithChapeters[0];
        if (firstLesson)
            firstLesson = lessonsWithChapeters[0].lessons[0];
        return firstLesson;
    }

    userNotLoggedMessage() {
        if (!this.state.user)
            return (
                <p className="title is-size-6 has-text-warning">
                    Para inscribirte al curso necesitas iniciar sesión
                </p>
            );
    }

    noContentMessage() {
        let doesCourseHaveContent = (this.props.chapters.length ? true : false) && (this.props.lessons.length ? true : false);
        if (!doesCourseHaveContent)
            return (
                <p className="title is-size-6 has-text-warning">
                    Lo sentimos, el curso actualmente no tiene contenido
                </p>
            );
    }

    render() {
        return (
            <>
                <button onClick={(e) => this.enrollToTheCourse(e)}
                    disabled={this.isButtonDisabled()}
                    className="button is-black">Inscríbete
                </button>
                {this.userNotLoggedMessage()}
                {this.noContentMessage()}
                {this.renderRedirect()}
            </>
        );
    }
}