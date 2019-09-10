import React from 'react';
import Navbar from '../Navbar/Navbar';
import HttpService from '../Services/HttpService';
import CategoryRow from './CategoryRow';

export default class CategoriesView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groupedCategories: []
        };
    }

    componentDidMount() {
        this.groupCategories();
    }

    async groupCategories() {
        let groupedCategories = [];
        let categories = await HttpService.fetchCategories()
        if (categories) {
            categories.forEach((cat, index) => {
                if (index % 3 === 0) {
                    groupedCategories.push([]);
                }
                let position = Math.trunc(index / 3);
                groupedCategories[position].push(cat);
            })
        }
        this.setState({ groupedCategories: groupedCategories });
    }

    renderGroupedCategories() {
        var renderedGroupedCategories = [];
        this.state.groupedCategories.forEach(group => {
            renderedGroupedCategories.push(<CategoryRow key={group[0].idCategory} categories={group} />)
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
                                Categorias
                            </h3>
                        </div>
                    </div>
                    <div className="hero-body">
                        <div className="container">
                            {this.renderGroupedCategories().map(c => { return c })}
                        </div>
                    </div>
                </section>
            </>
        );
    }
}