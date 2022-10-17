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
const UserSignInWithContext = withContext(UserSignIn);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
export default class App extends Component {
render() {

  return (


    <BrowserRouter>
    <Header />
    <Switch>
    <Route exact path="/" render= {()=> <Courses />} />
    <PrivateRoute exact path="/courses/create" component = {CreateCourseWithContext} />
    <PrivateRoute path="/courses/:id/update" component = {UpdateCourseWithContext} />
    <Route path="/courses/:id" component={CourseDetailWithContext} />
    <Route exact path="/signin" component={UserSignInWithContext} />
    <Route exact path="/signup" component={UserSignUpWithContext} />
    <Route path="/signout" component={UserSignOutWithContext} />
    </Switch>
    </BrowserRouter>
  );
}
}