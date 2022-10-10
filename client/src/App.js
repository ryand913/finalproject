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

const UserSignOutWithContext = withContext(UserSignOut);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn)
export default class App extends Component {
render() {

  return (

    <BrowserRouter>
    <Header />
    <Switch>
    <Route exact path="/" render= {()=> <Courses />} />
    <Route exact path="/courses/create" render= {()=> <CreateCourse />} />
    <Route exact path="/courses/update/:id" render= {()=> <UpdateCourse />} />
    <Route path="/courses/:id" render= {()=> <CourseDetail />} />
    <Route exact path="/signin" render= {()=> <UserSignInWithContext />} />
    <Route exact path="/signup" render= {()=> <UserSignUpWithContext />} />
    </Switch>
    </BrowserRouter>
  );
}
}