import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
export default class UserSignIn extends Component {
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
            <div class="form--centered">
                <h2>Sign In</h2>
                <form>
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" 
                    name="emailAddress" 
                    type="email" 
                    value={emailAddress}
                    onChange={this.change}
                    />
                    <label for="password">Password</label>
                    <input id="password" 
                    name="password" 
                    type="password" 
                    value={password} 
                    onChange={this.change}/>
                    <button class="button" 
                    type="submit" 
                    errors={errors}
                    submit={this.submit}>Sign In</button><button class="button button-secondary" cancel={this.cancel}>Cancel</button>
                </form>
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
    const { context } = this.props
    const { email, password} = this.state
    context.actions.signIn(email, password)
    .then(user => {
      if (user == null){
        this.setState(() => {
          return { errors: ['Sign-in unsuccessful']}
        })
      } else {
        this.props.history.push('/authenticated');
        console.log(`SUCCESS! ${email} is now signed in!`);
      }
    })
    .catch(err => {
      console.log(err);
      this.props.history.push('/error');
    })
  }

  cancel = () => {
    this.props.history.push('/');
  }
}
