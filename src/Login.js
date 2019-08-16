import React from 'react';
import { Link } from 'react-router-dom';

const axios = require('axios');

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }

    handleEmailChange(event) {
        let email = event.target.value;
        this.setState({ email: email });
    }

    handlePasswordChange(event) {
        let password = event.target.value;
        this.setState({ password: password });
    }

    isCredentialsCorrect(user) {
        let localPassword = this.state.password;
        let passwordInDB = user.password;
        return localPassword === passwordInDB
    }

    async login(event) {
        event.preventDefault();
        var user = await this.getUser();
        if (this.isCredentialsCorrect(user)) {
            console.log("login successful");
        } else {
            console.log("login unsuccessful")
        }
    }

    async getUser() {
        let email = this.state.email;
        var user = {};
        await axios.get('https://localhost:5001/api/person/email/' + email)
            .then(function (response) {
                user = response.data;
            })
            .catch(function (error) {
                console.log("ERROR searching person: ", error);
            });
        return user;
    }

    render() {
        return (
            <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="column is-4 is-offset-4">
                            <h3 className="title has-text-grey">Iniciar sesión</h3>
                            <p className="subtitle has-text-grey">Por favor inicie sesión para continuar.</p>
                            <div className="box">
                                <form>
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="email"
                                                placeholder="Email" onChange={e => this.handleEmailChange(e)}
                                                autoFocus />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="password"
                                                placeholder="Contraseña" onChange={e => this.handlePasswordChange(e)} />
                                        </div>
                                    </div>

                                    <button className="button is-block is-info is-fullwidth"
                                        onClick={(e) => this.login(e)}>
                                        Iniciar sesión
                                    </button>
                                </form>

                            </div>
                            <p className="has-text-grey">
                                <Link to='/sign-up'>Crear cuenta &nbsp;·&nbsp;</Link>
                                <Link to=''>¿Olvidaste la contraseña?</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}