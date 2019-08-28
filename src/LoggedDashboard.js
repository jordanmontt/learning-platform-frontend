import React from 'react';
import ProgressBar from './ProgressBar'
import LoginService from './LoginService';
import HttpService from './HttpService';

export default class LoggedDashboard extends React.Component {

    componentDidMount() {
        this.fetchData().then(data => console.log(data))
    }

    mapCourseInProgress(courseInProgress, courseName, lessons, chapters, finishedLessons) {
        return {
            idCourse: courseInProgress.idCourse,
            idStudent: courseInProgress.idStudent,
            isFinished: courseInProgress.isFinished,
            idLessonInProgress: courseInProgress.idLessonInProgress,
            idCourseInProgress: courseInProgress.idCourseInProgress,
            lastAccessDate: courseInProgress.lastAccessDate,
            courseName: courseName,
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
            let mappedCourseInP = this.mapCourseInProgress(cp, course.name, lessons, chapters, finishedLessons);
            mappedCoursesInP.push(mappedCourseInP);
        }
        return mappedCoursesInP;
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
                            <div className="column is-7 is-offset-2">
                                <article className="media">
                                    <figure className="media-left">
                                        <p className="image is-128x128">
                                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Imagen del curso" />
                                        </p>
                                    </figure>
                                    <div className="media-content">
                                        <h1 className="title is-5 has-text-black">Nombre del curso</h1>
                                        <ProgressBar finishedLessons={[]}
                                            totalLessons={[]} textAlignment="has-text-left"
                                            textColor="has-text-black" textSize="is-5" />
                                        <div className="field">
                                            <p className="control">
                                                <button className="button is-outlined is-white">Continuar</button>
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}