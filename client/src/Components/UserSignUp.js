import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Form from './Form';
const braze = require("@braze/web-sdk");
//Intake form for site - creates info in our database that will be referenced to log in and create courses

braze.initialize('e93769d0-8159-454f-9a37-dce9c16ea4b3', {
  baseUrl: "sondheim.braze.com"
});



function stringToHash(string) {
                  
  var hash = 0;
    
  if (string.length == 0) return hash;
    
  for (let i = 0; i < string.length; i++) {
      let char = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
  }
    
  return hash;
}

export default class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        errors: [],
      }

    render(){

        const {
            firstName,
            lastName,
            emailAddress,
            password,
            errors,
          } = this.state;
        return(
          <>
            <main>
              <div className="form--centered">
                <h2>Sign Up</h2>
                <Form
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Sign Up"
                  elements={() => (
                    <React.Fragment>
                    <label>First Name</label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={firstName}
                        onChange={this.change}
                        placeholder="First Name" />
                        <label>Last Name</label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={lastName}
                        onChange={this.change}
                        placeholder="Last Name" />
                        <label>Email Address</label>
                      <input
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                        value={emailAddress}
                        onChange={this.change}
                        placeholder="Email Address" />
                        <label>Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={this.change}
                        placeholder="Password" />
                    </React.Fragment>
                  )} />

                <p>Already have a user account?Click here to <NavLink to="/signin">sign in</NavLink>!</p>
              </div>
            </main></>
        )
    }

    change = (event) => {
      const name = event.target.name;
      const value = event.target.value;
  
      this.setState(() => {
        return {
          [name]: value
        };
      });
    }

submit = () => {
    const { context } = this.props;
    const {
      firstName,
      lastName,
      emailAddress,
    password
  } = this.state;

  const user = {
    firstName,
    lastName,
    emailAddress,
    password,
  };
  context.data.createUser(user)
  .then( errors => {
    if(errors.length){
      this.setState({ errors });
    } else {
      context.actions.signIn(user.emailAddress, user.password)
      braze.changeUser(`${stringToHash(user.emailAddress)}`);
      braze.getUser().setFirstName(`${user.firstName}`);
      braze.getUser().setLastName(`${user.lastName}`);
      braze.getUser().setEmail(`${user.emailAddress}`);
      braze.logCustomEvent('signedup');
      this.props.history.push('/');
    }
  })
  .catch( err => {
    console.log(err);
    this.props.history.push('/error');
  })
}
cancel = () => {
  braze.logCustomEvent("canceled-signup");
    this.props.history.push('/');
  }
}


