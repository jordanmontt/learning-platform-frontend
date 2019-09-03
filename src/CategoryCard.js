import React from 'react';

export default class CategoryCard extends React.Component {

    render() {
        return (
            <div className="tile is-parent">
                <article className="tile is-child box" onClick={() => console.log("clicked")}>
                    <p className="title has-text-black">{this.props.name}</p>
                    <div className="content">
                        <p className="has-text-black">{this.props.description}</p>
                    </div>
                </article>
            </div>
        )
    }
}