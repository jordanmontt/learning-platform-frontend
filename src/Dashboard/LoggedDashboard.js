import React from 'react';
import CourseInProgressCard from '../CourseInProgress/CourseInProgressCard';
import LoginService from '../Services/LoginService';
import HttpService from '../Services/HttpService';
import { Redirect } from 'react-router-dom';

export default class LoggedDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coursesInProgress: [],
            redirectRoute: "",
            redirect: false,
        };
    }

    componentDidMount() {
        this.renderCoursesInProgress();
    }

    mapCourseInProgress(courseInProgress, course, lessons, chapters, finishedLessons) {
        return {
            idCourse: courseInProgress.idCourse,
            idStudent: courseInProgress.idStudent,
            isFinished: courseInProgress.isFinished,
            idLessonInProgress: courseInProgress.idLessonInProgress,
            idCourseInProgress: courseInProgress.idCourseInProgress,
            lastAccessDate: courseInProgress.lastAccessDate,
            course: course,
            lessons: lessons,
            chapters: chapters,
            finishedLessons: finishedLessons
        }
    }

    async fetchData() {
        let user = LoginService.isLoggedIn();
        let userId = user.idPerson;
        let coursesInProgress = await HttpService.fetchCoursesInProgressFromUser(userId);
        let mappedCoursesInP = []
        for (let cp of coursesInProgress) {
            let chapters = await HttpService.fetchChapters(cp.idCourse);
            let lessons = await HttpService.fetchLessonsFromChapters(chapters);
            let finishedLessons = await HttpService.fetchFinishedLessonsFromCourseInProgress(cp.idCourseInProgress);
            let course = await HttpService.fetchCourse(cp.idCourse);
            let mappedCourseInP = this.mapCourseInProgress(cp, course, lessons, chapters, finishedLessons);
            mappedCoursesInP.push(mappedCourseInP);
        }
        return mappedCoursesInP;
    }

    async renderCoursesInProgress() {
        let courses = [];
        let mappedCoursesInP = await this.fetchData();
        mappedCoursesInP.forEach(mcp => {
            let element = <CourseInProgressCard key={mcp.idCourseInProgress}
                idCourseInProgress={mcp.idCourseInProgress} finishedLessons={mcp.finishedLessons}
                lessons={mcp.lessons} course={mcp.course} idLessonInProgress={mcp.idLessonInProgress} />
            courses.push(element);
        });
        this.setState({ coursesInProgress: courses });
    }

    async handleInput(event) {
        if (event.key === 'Enter') {
            let query = event.target.value;
            if (query) {
                let redirectRoute = `/search?q=${query}`;
                this.setState({ redirect: true, redirectRoute: redirectRoute });
            }
        }
    }

    renderRedirect() {
        if (this.state.redirect)
            return <Redirect to={this.state.redirectRoute} />
    }

    render() {
        return (
            <section className="hero is-link is-fullheight dashboard-background" >
                {this.renderRedirect()}
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-mobile is-centered">
                            <div className="column is-5" >
                                <p className="control has-icons-left has-icons-right">
                                    <input className="input" type="text" placeholder="¿Qué deseas aprender?"
                                        onKeyDown={(e) => this.handleInput(e)} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <br />
                        <h1 className="title is-3 has-text-centered">Retómalos donde los dejaste</h1>
                        <div className="columns is-mobile is-multiline">
                            {this.state.coursesInProgress.map(e => { return e })}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}