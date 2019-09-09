import React from 'react';
import HttpService from '../HttpService';

export default class CourseCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            creatorNameAndPrice: "",
        };
    }

    componentDidMount() {
        this.obtainCreatorName();
    }

    async obtainCreatorName() {
        let person = await HttpService.fetchPersonById(this.props.course.idCreator);
        let name = this.concatenateName(person);
        let nameWithPrice = this.concatenateNameWithPrice(name);
        this.setState({ creatorNameAndPrice: nameWithPrice });
    }

    concatenateName(person) {
        let name = person.firstName;
        if (person.secondName)
            name += " " + person.secondName;
        name += " " + person.fatherLastName;
        if (person.motherLastName)
            name += " " + person.motherLastName;
        return name;
    }

    concatenateNameWithPrice(name) {
        let newName = name;
        newName += " $" + this.props.course.price;
        return newName;
    }

    render() {
        return (
            <div className="column is-4">
                <article className="media">
                    <figure className="media-left">
                        <p className="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Imagen del curso" />
                        </p>
                    </figure>
                    <div className="media-content">
                        <h1 className="title is-5 has-text-white">{this.props.course.name}</h1>
                        <p className="has-text-black is-7 has-text-weight-bold">{this.state.creatorNameAndPrice}</p>
                        <p className="has-text-white is-7">{this.props.course.description}</p>
                        <div className="field">
                            <p className="control">
                                <a href='/' className="button is-inverted is-white">Ir al curso</a>
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}