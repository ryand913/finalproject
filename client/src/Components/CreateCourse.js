import React, { Component } from 'react';
import Form from './Form';
export default class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        materialsNeeded: '',
        estimatedTime: '',
        errors: [],
      }

    render(){

        const {
            title,
            description,
            materialsNeeded,
            estimatedTime,
            errors,
          } = this.state;
          const { context } = this.props;

        return(
          <>

            <main>
              <div className="wrap">
                <h2>Create Course</h2>
                <Form
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Create Course"
                  elements={() => (
                    <React.Fragment>
                    <div className="main--flex">
                    <div>
                    <label>
                    Course Title
                      <input
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={this.change}
                         />
                    </label>
                    <p>By {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</p>
                    <label>
                    Course Description
                      <textarea
                        id="description"
                        name="description"
                        type="text"
                        value={description}
                        onChange={this.change}
                         />
                        </label>
                        </div>
                        <div>
                        <label>
                    Esimated Time
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="estimatedTime"
                        value={estimatedTime}
                        onChange={this.change}
                         />
                        </label>
                        <label>
                    Materials Needed
                        <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        type="email"
                        value={materialsNeeded}
                        onChange={this.change}
                         />
                        </label>
                        </div>
                        </div>
                    </React.Fragment>
                  )} />
              </div>
            </main>
            </>
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
    const userId = context.authenticatedUser.id
    console.log(userId)
    const {
      title,
      description,
      materialsNeeded,
    estimatedTime
  } = this.state;

  const course = {
    title,
    description,
    materialsNeeded,
    estimatedTime,
    userId: userId
  };
  console.log(course)
  context.data.createCourse(course, context.authenticatedUser.emailAddress, context.authenticatedUser.password )
  .then( errors => {
    if(errors.length){
      this.setState({ errors });
    } else {
      this.props.history.push('/');
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