import React from 'react';

export default class ProgressBar extends React.Component {

    calculatePercentage() {
        let totalLessons = this.props.totalLessons.length;
        let finishedLessons = this.props.finishedLessons.length;
        return (finishedLessons / totalLessons) * 100 + "%";
    }

    render() {
        return (
            <p className="title is-4 has-text-centered	">Progreso:&nbsp;
                <b className="title is-5" style={{ color: "#4BB543" }}>{this.calculatePercentage()}</b>
            </p>
        );
    }
}