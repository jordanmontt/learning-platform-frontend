import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import LoginService from './LoginService';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: false,
            incorrectLogin: false,
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

    createUserObject() {
        let email = this.state.email;
        let password = this.state.password;
        return {
            email: email,
            password: password
        };
    }

    login(event) {
        event.preventDefault();
        let user = this.createUserObject();
        LoginService.login(user)
            .then(response => {
                if (response) {
                    this.setState({ redirect: true, incorrectLogin: false })
                } else {
                    this.setState({ incorrectLogin: true })
                }
            }).catch(error => {
                console.log("Error in loging in: ", error);
            });
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    createIncorrectLoginMessage() {
        let message;
        if (this.state.incorrectLogin) {
            message =
                <p className="has-text-danger">
                    El usuario o la contraseña no coincide. Intente nuevamente.
                </p>;
        }
        return message;
    }

    render() {
        return (
            <section className="hero is-fullheight">
                {this.renderRedirect()}
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
                            {this.createIncorrectLoginMessage()}
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