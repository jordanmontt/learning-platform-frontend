import React from 'react';
import LoginService from './LoginService';

const axios = require('axios');

export default class LoggedDashboard extends React.Component {

    componentDidMount() {
        this.fetchCoursesInProgress().then(res => console.log(res))
    }

    async fetchCoursesInProgress() {
        let user = LoginService.isLoggedIn();
        let userId = user.idPerson;
        let coursesInProgress;
        await axios.get('https://localhost:5001/api/courseinprogress/all-courses/' + userId)
            .then(function (response) {
                coursesInProgress = response.data;
            })
            .catch(function (error) {
                console.log("ERROR in fetching courses in progress: ", error);
            })
        return coursesInProgress;
    }

    render() {
        return (
            <div>
                Logueado
            </div>
        );
    }
}