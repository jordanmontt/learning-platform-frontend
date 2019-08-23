import React from 'react';
import LoginService from './LoginService';
import UnloggedDashboard from './UnloggedDashboard';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isUserLoggedIn: LoginService.isLoggedIn()
        };
    }

    render() {
        return (
            <>
                <UnloggedDashboard />
            </>
        );
    }
}