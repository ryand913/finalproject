import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Form from './Form'
const braze = require("@braze/web-sdk");

braze.initialize('e93769d0-8159-454f-9a37-dce9c16ea4b3', {
  baseUrl: "sondheim.braze.com",
  noCookies: true
});


function stringToHash(string) {
                  
  var hash = 0;
    
  if (string.length === 0) return hash;
    
  for (let i = 0; i < string.length; i++) {
      let char = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
  }
    
  return hash;
}
//Take credentials provided in form and submit to data base. Compare them using a helper method getUser in Data.js and authenticate if there is a match.
class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
      }
    render(){
        const {
            emailAddress,
            password,
            errors,
          } = this.state;
        return(
            <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <Form
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Sign In"
                  elements={() => (
                    <React.Fragment>
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
                <p>Don't have a user account? Click here to <NavLink to="/signup">sign up!</NavLink></p>
            </div>
        </main>
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
      const { emailAddress, password } = this.state;
  
      context.actions.signIn(emailAddress, password)
        .then((user) => {
          if (user === null) {
            this.setState(() => {
              return { errors: [ 'Sign-in was unsuccessful' ] };
            });
          } else {
            // this.setState(() => {
            //   return { password: password}
            // })
            braze.changeUser(`${stringToHash(user.emailAddress)}`);
            this.props.history.push('/');
          }
        })
        .catch((error) => {
          console.error(error);
          this.props.history.push('/error');
        });
    }
  
    cancel = () => {
      this.props.history.push('/');
    }
  }

  export default withRouter(UserSignIn)