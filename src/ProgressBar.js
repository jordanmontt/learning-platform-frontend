import React from 'react';

export default class ProgressBar extends React.Component {

    calculatePercentage() {
        let totalLessons = this.props.totalLessons.length;
        let finishedLessons = this.props.finishedLessons.length;
        return (finishedLessons / totalLessons) * 100 + "%";
    }

    getClassName() {
        let className = "title ";
        if (this.props.textSize)
            className += (this.props.textSize + " ");
        else
            className += "is-4 ";

        if (this.props.textAlignment)
            className += (this.props.textAlignment + " ");
        else
            className += "has-text-centered ";

        if (this.props.textColor)
            className += (this.props.textColor + " ");
        return className;
    }

    render() {
        return (
            <p className={this.getClassName()}>Progreso:&nbsp;
                <b className="title is-5" style={{ color: "#4BB543" }}>{this.calculatePercentage()}</b>
            </p>
        );
    }
}