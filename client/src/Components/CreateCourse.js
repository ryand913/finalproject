import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Form from './Form';
import  Context   from '../Context'
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
        return(
          <>
          <div className="wrap">
            <main>
              <div className="main--flex">
                <h2>Create Course</h2>
                <Form
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Create Course"
                  elements={() => (
                    <React.Fragment>
                    <div>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={this.change}
                        placeholder="Course Title" />
                        </div>
                        <div>
                      <textarea
                        id="description"
                        name="description"
                        type="text"
                        value={description}
                        onChange={this.change}
                        placeholder="Course Description" />
                        </div>
                        <div>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="estimatedTime"
                        value={estimatedTime}
                        onChange={this.change}
                        placeholder="Estimated Time" />
                        </div>
                        <div>
                        <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        type="email"
                        value={materialsNeeded}
                        onChange={this.change}
                        placeholder="Materials Needed" />
                        </div>
                    </React.Fragment>
                  )} />
              </div>
            </main>
            </div></>
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
      title,
      description,
      materialsNeeded,
    estimatedTime,
  } = this.state;

  const course = {
    title,
    description,
    materialsNeeded,
    estimatedTime,
  };
  context.data.createCourse(course)
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