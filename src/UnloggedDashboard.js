import React from 'react';

export default class UnloggedDashboard extends React.Component {

    render() {
        return (
            <section className="hero is-link is-fullheight" >
                <div className="hero-body">
                    <div className="container">
                        <div className="colums is-mobile">
                            <div className="column is-5 is-offset-1">
                                <p className="control has-icons-left has-icons-right">
                                    <input className="input" type="text" placeholder="¿Qué deseas aprender?" />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="colums is-mobile">
                            <div className="column is-5 is-offset-1" >
                                <div className="field">
                                    <button className="button is-info is-medium">¡Empieza tu prueba gratis!</button>
                                </div>
                                <div className="field">
                                    <button className="button is-info is-medium">Inscríbete</button>
                                </div>
                                <div className="field">
                                    <button className="button is-info is-medium">Compra un curso</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}