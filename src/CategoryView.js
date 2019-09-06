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
            categoryName: "",
        };
    }

    componentDidMount() {
        this.groupCategories();
        this.obtainCategoryName();
    }

    async obtainCategoryName() {
        let category = await HttpService.fetchCategory(this.idCategory);
        if (category) {
            this.setState({ categoryName: category.name });
        }
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

    renderMessage() {
        if (this.state.groupedCourses.length === 0)
            return (
                <div>
                    <br />
                    <br />
                    <h1 className="title is-3 has-text-white has-text-centered">
                        Por el momento no existen cursos para esta categoria :(
                    </h1>
                </div>
            )
    }

    render() {
        return (
            <>
                <Navbar></Navbar>
                <section className="hero is-link is-fullheight dashboard-background">
                    <div className="hero-head">
                        <div className="container">
                            <h3 className="title is-2 has-text-centered has-background-danger has-text-white">
                                {this.state.categoryName}
                            </h3>
                            <br />
                            <br />
                            {this.renderGroupedCourses().map(c => { return c })}
                            {this.renderMessage()}
                        </div>
                    </div>
                </section>
            </>
        );
    }
}