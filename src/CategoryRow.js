import React from 'react';
import CategoryCard from './CategoryCard';

export default class CategoryRow extends React.Component {

    render() {
        return (
            <div className="tile is-ancestor">
                {this.props.categories.map(category => {
                    return <CategoryCard key={category.idCategory} name={category.name}
                        description={category.description} />
                })}
            </div>
        );
    }
}