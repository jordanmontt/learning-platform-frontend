import React from 'react';
import CategoryTile from './CategoryTile';

export default class CategoryRow extends React.Component {

    render() {
        return (
            <div className="tile is-ancestor">
                {this.props.categories.map(category => {
                    return <CategoryTile key={category.idCategory} category={category} />
                })}
            </div>
        );
    }
}