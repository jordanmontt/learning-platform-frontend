import React from 'react';
import Navbar from './Navbar';
import queryString from 'query-string';
import HttpService from './HttpService';
import CourseRow from './CourseRow';

export default class CategoryView extends React.Component {

    constructor(props) {
        super(props);
        let parsedParams = queryString.parse(this.props.location.search);
        this.idCategory = parseInt(parsedParams.id);
        this.state = {
            groupedCourses: [],
        };
    }

    componentDidMount() {
        this.groupCategories();
    }

    async groupCategories() {
        let groupedCourses = [];
        let courses = await HttpService.fetchCoursesFromCategory(this.idCategory);;
        if (courses) {
            courses.forEach((course, index) => {
                if (index % 3 === 0) {
                    groupedCourses.push([]);
                }
                let position = Math.trunc(index / 3);
                groupedCourses[position].push(course);
            })
        }
        this.setState({ groupedCourses: groupedCourses });
    }

    renderGroupedCourses() {
        var renderedGroupedCategories = [];
        this.state.groupedCourses.forEach(group => {
            renderedGroupedCategories.push(<CourseRow key={group[0].idCourse} courses={group} />)
        });
        return renderedGroupedCategories;
    }

    render() {
        return (
            <>
                <Navbar></Navbar>
                <section className="hero is-link is-fullheight dashboard-background">
                    <div className="hero-head">
                        <div className="container">
                            <h3 className="title is-2 has-text-centered has-background-danger has-text-white">
                                Categoria
                            </h3>
                            {this.renderGroupedCourses().map(c => { return c })}
                        </div>
                    </div>
                </section>
            </>
        );
    }
}