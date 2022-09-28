import './App.css';
import {
  BrowserRouter,
  // Switch,
  // Route
} from "react-router-dom";
import React, { Component } from 'react'
import Test from './Components/Test';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      courses: []
    };
  } 

  componentDidMount() {
    this.apiCall();
  }

apiCall = () => {
  fetch('http://localhost:5000/api/courses')
    .then(response => response.json())
    .then(responseData => {
      this.setState({courses: responseData})
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
}  
render() {

  return (
    <BrowserRouter>
    <Test data={this.state.courses}/>
    </BrowserRouter>
  );
}
}