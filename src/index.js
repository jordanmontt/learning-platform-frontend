import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import Login from './UserAuthentication/Login';
import SignUp from './UserAuthentication/SignUp';
import CourseInProgressView from './CourseInProgress/CourseInProgressView';
import NotFound from './NotFound/NotFound';
import CategoryView from './Category/CategoryView';
import CategoriesView from './Category/CategoriesView';
import CourseView from './Course/CourseView';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/course-in-progress" component={CourseInProgressView} />
            <Route path="/categories" component={CategoriesView} />
            <Route path="/category" component={CategoryView} />
            <Route path="/course" component={CourseView} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
