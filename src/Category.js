import React from 'react';

export default class Category extends React.Component {

    render() {
        return (
            <div className="tile is-parent">
                <article className="tile is-child box">
                    <p className="title has-text-black">{this.props.name}</p>
                    <div className="content">
                        <p className="has-text-black">{this.props.description}</p>
                    </div>
                </article>
            </div>
        )
    }
}