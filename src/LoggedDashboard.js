import React from 'react';
import ProgressBar from './ProgressBar'
import LoginService from './LoginService';

const axios = require('axios');

export default class LoggedDashboard extends React.Component {

    componentDidMount() {
        this.fetchCoursesInProgress().then(res => console.log(res))
    }

    async fetchCoursesInProgress() {
        let user = LoginService.isLoggedIn();
        let userId = user.idPerson;
        let coursesInProgress;
        await axios.get('https://localhost:5001/api/courseinprogress/all-courses/' + userId)
            .then(function (response) {
                coursesInProgress = response.data;
            })
            .catch(function (error) {
                console.log("ERROR in fetching courses in progress: ", error);
            })
        return coursesInProgress;
    }

    render() {
        return (
            <section className="hero is-link is-fullheight dashboard-background" >
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-mobile">
                            <div className="column is-5 is-offset-1" >
                                <p className="control has-icons-left has-icons-right">
                                    <input className="input" type="text" placeholder="¿Qué deseas aprender?" />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <br />
                        <h1 className="title is-3 has-text-centered">Retómalos donde los dejaste</h1>
                        <div className="columns is-mobile is-multiline">
                            <div className="column is-7 is-offset-2">
                                <article className="media">
                                    <figure className="media-left">
                                        <p className="image is-128x128">
                                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Imagen del curso" />
                                        </p>
                                    </figure>
                                    <div className="media-content">
                                        <h1 className="title is-5 has-text-black">Nombre del curso</h1>
                                        <ProgressBar finishedLessons={[]}
                                            totalLessons={[]} textAlignment="has-text-left"
                                            textColor="has-text-black" textSize="is-5" />
                                        <div className="field">
                                            <p className="control">
                                                <button className="button is-outlined is-white">Continuar</button>
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}