import React from 'react'
import { Link } from 'react-router-dom'

const axios = require('axios');

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            lastName: "",
            userCreatedSuccessfully: false,
            userAlreadyCreated: false,
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

    handleNameChange(event) {
        let name = event.target.value;
        this.setState({ name: name });
    }

    handleLastNameChange(event) {
        let lastName = event.target.value;
        this.setState({ lastName: lastName });
    }

    preparePersonObj() {
        let email = this.state.email;
        let password = this.state.password;
        let name = this.state.name;
        let lastName = this.state.lastName;
        return {
            email: email,
            password: password,
            rol: "Profesor",
            firstName: name,
            fatherLastName: lastName,
            birthDate: new Date()
        }
    }

    async createUser(event) {
        event.preventDefault();
        var isSuccess = false;
        let userAlreadyCreated = false;
        let user = this.preparePersonObj();
        await axios.post('https://localhost:5001/api/person', user)
            .then(function (response) {
                // eslint-disable-next-line eqeqeq
                if (response.status == 200) {
                    isSuccess = true
                }
            })
            .catch(function (error) {
                console.log("ERROR creating user: ", error);
                // eslint-disable-next-line eqeqeq
                if (error.response.status == 409) {
                    userAlreadyCreated = true;
                }
            })
        this.setState({ userCreatedSuccessfully: isSuccess, userAlreadyCreated: userAlreadyCreated })
    }

    createSuccessfulSignInMessage() {
        let message;
        if (this.state.userCreatedSuccessfully) {
            message =
                <p className="has-text-success">
                    Usuario creado exitosamente.
                </p>;
        }
        return message;
    }

    createAlreadyCreatedUserMessage() {
        let message;
        if (this.state.userAlreadyCreated) {
            message =
                <p className="has-text-danger">
                    Ya existe un usuario registrado con el mismo email.
                </p>;
        }
        return message;
    }

    render() {
        return (
            <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="column is-4 is-offset-4">
                            <h3 className="title has-text-grey">Crear cuenta</h3>
                            <div className="box">
                                <form>
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="text"
                                                placeholder="Nombre" onChange={e => this.handleNameChange(e)}
                                                autoFocus />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="text"
                                                placeholder="Apellido" onChange={e => this.handleLastNameChange(e)} />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="email"
                                                placeholder="Email" onChange={e => this.handleEmailChange(e)} />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="password"
                                                placeholder="Contraseña" onChange={e => this.handlePasswordChange(e)} />
                                        </div>
                                    </div>
                                    <button className="button is-block is-info is-fullwidth"
                                        onClick={(e) => this.createUser(e)}>
                                        Crear cuenta
                                    </button>
                                </form>
                            </div>
                            {this.createSuccessfulSignInMessage()}
                            {this.createAlreadyCreatedUserMessage()}
                            <p className="has-text-grey">
                                <Link to='/login'>¿Ya tienes una cuenta?&nbsp;Inicia sesión</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}