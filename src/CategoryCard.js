import React from 'react';
import { Redirect } from 'react-router-dom';

export default class CategoryCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            redirectRoute: "",
        };
    }

    renderRedirect() {
        if (this.state.redirect)
            return <Redirect to={this.state.redirectRoute} />
    }

    categoryClicked() {
        this.setState({
            redirect: true,
            redirectRoute: "/category?id=" + this.props.category.idCategory
        })
    }

    render() {
        return (
            <div className="tile is-parent">
                {this.renderRedirect()}
                <article className="tile is-child box" onClick={() => this.categoryClicked()}>
                    <p className="title has-text-black">{this.props.category.name}</p>
                    <div className="content">
                        <p className="has-text-black">{this.props.category.description}</p>
                    </div>
                </article>
            </div>
        )
    }
}