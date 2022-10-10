import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        errors: [],
      }
    render(){
        const {
            firstName,
            lastName,
            email,
            password,
            errors,
          } = this.state;
        return(
            <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                
                <form onSubmit={this.submit}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" defaultValue="" onChange={this.change} />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" defaultValue="" onChange={this.change} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" defaultValue="" onChange={this.change} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" defaultValue="" onChange={this.change}/>
                    <button className="button" type="submit" errors={errors}>Sign Up</button>
                    <button className="button button-secondary" onClick={cancel}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <NavLink to="/signin">sign in</NavLink>!</p>
            </div>
            </main>
        )
    }
submit = () => {
    const { context } = this.props;
    console.log(context)
    const {
      firstName,
      lastName,
      username,
    password,
  } = this.state;

  const user = {
    firstName,
    lastName,
    username,
    password,
  };
  context.data.createUser(user)
  .then( errors => {
    if(errors.length){
      this.setState({ errors });
    } else {
      console.log(`${firstName} is successfully signed up and authenticated!`)
      // .then(() => {
      //   this.props.history.push('/authenticated');
      // })
    }
  })
  .catch( err => {
    console.log(err);
    this.props.history.push('/error');
  })
}
cancel = () => {
    this.props.history.push('/');
  }
}


