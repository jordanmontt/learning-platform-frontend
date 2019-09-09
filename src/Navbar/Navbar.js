/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import LoginService from '../LoginService';

export default class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            burgerActive: false,
            userLoggedIn: LoginService.isLoggedIn(),
            redirect: false
        };
    }

    clickBurger(event) {
        event.preventDefault();
        var burgerStatus = !this.state.burgerActive
        this.setState({
            burgerActive: burgerStatus
        });
    }

    getBurgerClassName() {
        var className = "navbar-burger burger"
        if (this.state.burgerActive)
            className += " is-active"
        return className;
    }

    getMenuClassName() {
        var className = "navbar-menu"
        if (this.state.burgerActive)
            className += " is-active"
        return className;
    }

    getLogoSource() {
        return process.env.PUBLIC_URL + "learning-icon.svg";
    }

    logout(event) {
        event.preventDefault();
        LoginService.logout();
        this.setState({
            userLoggedIn: null,
            redirect: true,
        });
    }

    createLoggedUserButtons() {
        let userName = this.state.userLoggedIn.firstName;
        let loggedUserButton =
            <div className="navbar-item has-dropdown is-hoverable" key={"user-button"}>
                <a className="navbar-link">
                    <i className="fas fa-user"></i> &nbsp; Bienvenido,&nbsp;{userName}
                </a>
                <div className="navbar-dropdown">
                    <a className="navbar-item">
                        <i className="fas fa-user"></i> &nbsp;{userName}
                    </a>
                    <a className="navbar-item">
                        <i className="fas fa-book"></i> &nbsp;Mis cursos
                    </a>
                    <a role="button" onClick={(e) => this.logout(e)} className="navbar-item">
                        <i className="fas fa-sign-out-alt"></i> &nbsp;Cerrar sesión
                    </a>
                </div>
            </div>
        return [loggedUserButton];
    }

    createUnloggedUserButtons() {
        let loginButton =
            <Link to="/login" className="navbar-item" key={"login-button"}>
                <i className="fas fa-sign-in-alt"></i> &nbsp; Iniciar sesión
            </Link>;
        let signUpButton =
            <Link to="/sign-up" className="navbar-item" key={"sign-up-button"}>
                <i className="fas fa-user-plus"></i> &nbsp; Crear cuenta
            </Link>
        return [loginButton, signUpButton];
    }

    createUserButtons() {
        if (this.state.userLoggedIn) {
            return this.createLoggedUserButtons();
        }
        else {
            return this.createUnloggedUserButtons();
        }
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
    }

    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                {this.renderRedirect()}
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item">
                        <img src={this.getLogoSource()} width="112" height="28" alt="Logo" />
                    </Link>

                    <a role="button" className={this.getBurgerClassName()} aria-label="menu"
                        aria-expanded="false" data-target="navbarBasicExample" onClick={(e) => this.clickBurger(e)}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className={this.getMenuClassName()}>
                    <div className="navbar-start">
                        <Link to="/categories" className="navbar-item">
                            <i className="fas fa-th"></i> &nbsp; Categorias
                        </Link>

                        <Link to="/" className="navbar-item">
                            <i className="fas fa-search"></i> &nbsp; Buscar
                        </Link>

                        <Link to="/" className="navbar-item">
                            <i className="fas fa-tags"></i> &nbsp; Inscríbete
                        </Link>
                    </div>

                    <div className="navbar-end">
                        {this.createUserButtons().map(e => { return e })}
                    </div>
                </div>
            </nav >
        );
    }
}