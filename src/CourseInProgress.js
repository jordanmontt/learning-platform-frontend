import React from 'react';
import ProgressBar from './ProgressBar';

export default class CourseInProgress extends React.Component {

    getRoute() {
        return "/course?c=" + this.props.course.idCourse + "&cp=" +
            this.props.idCourseInProgress + "&lp=" + this.props.idLessonInProgress;
    }

    render() {
        return (
            <div className="column is-7 is-offset-2">
                <article className="media">
                    <figure className="media-left">
                        <p className="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Imagen del curso" />
                        </p>
                    </figure>
                    <div className="media-content">
                        <h1 className="title is-5 has-text-black">{this.props.course.name}</h1>
                        <ProgressBar finishedLessons={this.props.finishedLessons}
                            totalLessons={this.props.lessons} textAlignment="has-text-left"
                            textColor="has-text-black" textSize="is-5" />
                        <div className="field">
                            <p className="control">
                                <a href={this.getRoute()} className="button is-outlined is-white">Continuar</a>
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}