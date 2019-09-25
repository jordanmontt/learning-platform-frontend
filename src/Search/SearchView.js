import React from 'react';
import Navbar from '../Navbar/Navbar';
import queryString from 'query-string';
import HttpService from '../Services/HttpService';
import CourseRow from '../Course/CourseRow';

export default class SearchView extends React.Component {

    constructor(props) {
        super(props);
        let urlParams = queryString.parse(this.props.location.search);
        this.query = urlParams.q;
        this.state = {
            groupedCourses: []
        };
    }

    async componentDidMount() {
        this.obtainCourses();
    }

    async obtainCourses() {
        if (this.query) {
            let courses = await HttpService.searchCourse(this.query);
            this.groupCoursesInARowOfThree(courses);
        }
    }

    async groupCoursesInARowOfThree(courses) {
        let groupedCourses = [];
        courses.forEach((course, index) => {
            if (index % 3 === 0) {
                groupedCourses.push([]);
            }
            let position = Math.trunc(index / 3);
            groupedCourses[position].push(course);
        })
        this.setState({ groupedCourses: groupedCourses });
    }

    async handleInput(event) {
        if (event.key === 'Enter') {
            let query = event.target.value;
            if (query) {
                let courses = await HttpService.searchCourse(query);
                this.groupCoursesInARowOfThree(courses);
            }
        }
    }

    renderGroupedCourses() {
        var renderedGroupedCategories = [];
        this.state.groupedCourses.forEach(group => {
            renderedGroupedCategories.push(<CourseRow key={group[0].idCourse} courses={group} />)
        });
        return renderedGroupedCategories;
    }

    renderNoMatchMessage() {
        if (this.state.groupedCourses.length === 0) {
            return (
                <h1 className="title is-3 has-text-centered">No se encontró ningún curso</h1>
            );
        }
    }

    render() {
        return (
            <>
                <Navbar />
                <section className="hero is-link is-fullheight dashboard-background" >
                    <div className="hero-head">
                        <div className="container">
                            <br />
                            <div className="columns is-mobile is-centered">
                                <div className="column is-6" >
                                    <p className="control has-icons-left has-icons-right">
                                        <input className="input" type="text" placeholder="¿Qué deseas aprender?"
                                            onKeyDown={(e) => this.handleInput(e)} />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-search"></i>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hero-body">
                        <div className="container">
                            {this.renderGroupedCourses()}
                            {this.renderNoMatchMessage()}
                        </div>
                    </div>
                </section>
            </>
        );
    }
}