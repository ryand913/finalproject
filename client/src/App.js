import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import React, { Component } from 'react'
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import UpdateCourse from './Components/UpdateCourse';

import withContext from './Context'
import PrivateRoute from './PrivateRoute';

const CreateCourseWithContext = withContext(CreateCourse);
const UserSignOutWithContext = withContext(UserSignOut);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn)
export default class App extends Component {
render() {

  return (
    <body>
<div id="root">
    <BrowserRouter>
    <Header />
    <Switch>
    <Route exact path="/" render= {()=> <Courses />} />
    <PrivateRoute exact path="/courses/create" component = {CreateCourseWithContext} />
    <Route exact path="/courses/update/:id" render= {()=> <UpdateCourse />} />
    <Route path="/courses/:id" render= {()=> <CourseDetail />} />
    <Route exact path="/signin" component={UserSignInWithContext} />
    <Route exact path="/signup" component={UserSignUpWithContext} />
    <Route path="/signout" component={UserSignOutWithContext} />
    </Switch>
    </BrowserRouter>
    </div>
    </body>
  );
}
}