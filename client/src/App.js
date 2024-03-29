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
import Optinpage from './Components/Optinpage';
import withContext from './Context'
import PrivateRoute from './PrivateRoute';
const braze = require("@braze/web-sdk");

braze.initialize('e93769d0-8159-454f-9a37-dce9c16ea4b3', {
  baseUrl: "sondheim.braze.com",
  enableLogging: true,
  noCookies: true
});

braze.openSession();
braze.automaticallyShowInAppMessages();
braze.requestContentCardsRefresh();
braze.showContentCards();

//Components with Context
const CreateCourseWithContext = withContext(CreateCourse);
const UserSignOutWithContext = withContext(UserSignOut);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
export default class App extends Component {

  //Creates main site directory. Uses Context from Context file to pass into components so they have access to the current authenticatedUser
render() {

  return (


    <BrowserRouter>
    <Header />
    <Switch>
    <Route exact path="/" render= {()=> <Courses />} />
    <PrivateRoute exact path="/courses/create" component = {CreateCourseWithContext} />
    <PrivateRoute path="/courses/:id/update" component = {UpdateCourseWithContext} />
    <Route path="/courses/:id" component={CourseDetailWithContext} />
    <Route path="/optin" component={Optinpage} />
    <Route exact path="/signin" component={UserSignInWithContext} />
    <Route exact path="/signup" component={UserSignUpWithContext} />
    <Route path="/signout" component={UserSignOutWithContext} />
    </Switch>
    </BrowserRouter>
  );
}
}