import React from 'react';
import CourseInProgress from './CourseInProgress';
import LoginService from './LoginService';
import HttpService from './HttpService';

export default class LoggedDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coursesInProgress: [],
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
        let coursesInProgress = await HttpService.fetchCoursesInProgress(userId);
        let mappedCoursesInP = []
        for (let cp of coursesInProgress) {
            let chapters = await HttpService.fetchChapters(cp.idCourse);
            let lessons = await HttpService.fetchLessons(chapters);
            let finishedLessons = await HttpService.fetchFinishedLessons(cp.idCourseInProgress);
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
            let element = <CourseInProgress key={mcp.idCourseInProgress}
                idCourseInProgress={mcp.idCourseInProgress} finishedLessons={mcp.finishedLessons}
                lessons={mcp.lessons} course={mcp.course} idLessonInProgress={mcp.idLessonInProgress} />
            courses.push(element);
        });
        this.setState({ coursesInProgress: courses });
    }

    render() {
        return (
            <section className="hero is-link is-fullheight dashboard-background" >
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-mobile is-centered">
                            <div className="column is-5" >
                                <p className="control has-icons-left has-icons-right">
                                    <input className="input" type="text" placeholder="¿Qué deseas aprender?" />
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