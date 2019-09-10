import React from 'react';
import Navbar from '../Navbar/Navbar';

export default class CourseView extends React.Component {

    render() {
        return (
            <>
                <Navbar />
                <section className="hero is-link is-fullheight dashboard-background">
                    <div className="hero-head">
                        <div className="container">
                            <br />
                            <h1 className="title is-1 has-text-centered">Inteligencia artificial</h1>
                        </div>
                    </div>
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered is-mobile">
                                <div className=" column is-9">
                                    <p className="has-text-left is-size-5">Descripcion del curso </p>
                                </div>
                                <div className=" column is-3">
                                    <button className="button is-black">Inscribirse</button>
                                </div>
                            </div>
                            <br />
                            <div className="columns is-centered is-mobile">
                                <div className="notification column is-4">
                                    <h1 className="title is-size-5 has-text-black has-text-centered">
                                        Contenido
                                    </h1>
                                </div>
                            </div>

                            <div className="columns is-centered is-mobile is-multiline">
                                <div className="column is-6">
                                    <h1 className="title is-size-5 has-text-black has-text-centered">
                                        Capitulo 1
                                    </h1>
                                    <div className="content has-text-centered has-text-black">
                                        <li>Leccion 1</li>
                                        <li>Leccion 2</li>
                                        <li>Leccion 3</li>
                                        <li>Leccion 4</li>
                                    </div>
                                </div>
                                <div className="column is-6">
                                    <h1 className="title is-size-5 has-text-black has-text-centered">
                                        Capitulo 2
                                    </h1>
                                    <div className="content has-text-centered has-text-black">
                                        <li>Leccion 1</li>
                                        <li>Leccion 2</li>
                                        <li>Leccion 3</li>
                                        <li>Leccion 4</li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}