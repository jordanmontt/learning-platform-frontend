import React from 'react'
import { Link } from 'react-router-dom'

const axios = require('axios');

export default class SignUp extends React.Component {

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

    preparePersonObj() {
        let email = this.state.email;
        let password = this.state.password;
        return {
            email: email,
            password: password,
            rol: "Profesor",
            firstName: "Jon",
            fatherLastName: "Lord",
            birthDate: new Date()
        }
    }

    async createUser() {
        var isSuccess = false;
        let user = this.preparePersonObj();
        await axios.post('https://localhost:5001/api/person', user)
            .then(function (response) {
                // eslint-disable-next-line eqeqeq
                if (response.status == 200)
                    isSuccess = true;
            })
            .catch(function (error) {
                console.log("ERROR creating user: ", error);
            })
        return isSuccess;
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
                                        onClick={() => this.createUser()}>
                                        Crear cuenta
                                    </button>
                                </form>
                            </div>
                            <p className="has-text-grey">
                                <Link to='/login'>Ya tengo una cuenta</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}