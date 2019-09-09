import React from 'react';

export default class UnloggedDashboard extends React.Component {

    render() {
        return (
            <section className="hero is-fullheight dashboard-background" >
                <div className="hero-body">
                    <div className="container">
                        <div className="colums is-mobile is-multiline">
                            <div className="column is-5 is-offset-1">
                                <p className="control has-icons-left has-icons-right">
                                    <input className="input" type="text" placeholder="¿Qué deseas aprender?" />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </p>
                            </div>
                            <br />
                            <div className="column is-5 is-offset-1" >
                                <div className="field">
                                    <button className="button is-black has-text-white is-outlined is-medium">¡Empieza tu prueba gratis!</button>
                                </div>
                                <div className="field">
                                    <button className="button is-black has-text-white is-outlined is-medium">Inscríbete</button>
                                </div>
                                <div className="field">
                                    <button className="button is-black has-text-white is-outlined is-medium">Compra un curso</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}