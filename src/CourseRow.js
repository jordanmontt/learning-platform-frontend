import React from 'react';
import CourseCard from './CourseCard';

export default class CourseRow extends React.Component {

    render() {
        return (
            <div className="columns is-mobile">
                {this.props.courses.map(course => {
                    return <CourseCard key={course.idCourse} course={course} />
                })}
            </div>
        );
    }
}