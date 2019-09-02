import React from 'react';
import Category from './Category';

export default class CategoryRow extends React.Component {

    render() {
        return (
            <div className="tile is-ancestor">
                {this.props.categories.map(category => {
                    return <Category key={category.idCategory} name={category.name}
                        description={category.description} />
                })}
            </div>
        );
    }
}