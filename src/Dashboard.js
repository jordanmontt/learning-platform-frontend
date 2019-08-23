import React from 'react';
import LoginService from './LoginService';
import UnloggedDashboard from './UnloggedDashboard';
import LoggedDashboard from './LoggedDashboard';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isUserLoggedIn: LoginService.isLoggedIn()
        };
    }

    createDashboard() {
        if (this.state.isUserLoggedIn)
            return <LoggedDashboard />
        return <UnloggedDashboard />

    }

    render() {
        return (
            <>
                {this.createDashboard()}
            </>
        );
    }
}