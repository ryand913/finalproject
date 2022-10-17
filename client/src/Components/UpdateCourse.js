import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Form from './Form'
class UpdateCourse extends Component{

  state = {
    title:'',
    description: '',
    materialsNeeded: '',
    estimatedTime: '',
    errors: [],
  }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.apiCall(id);
      }

    apiCall = (params) => {


      fetch(`http://localhost:5000/api/courses/${params}`)
        .then(response => response.json())
        .then(responseData => {
          this.setState({
            title: responseData.title,
            description: responseData.description,
            materialsNeeded: responseData.materialsNeeded,
            estimatedTime: responseData.estimatedTime,
            id: responseData.id
          })
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
    }  

    render(){
      const {
        title,
        description,
        materialsNeeded,
        estimatedTime,
        id,
        errors,
      } = this.state;

        let course = this.state.courses
        const { context } = this.props;
        return(
            <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <Form
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Update Course"
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
    const courseid = this.state.id
    const userId = context.authenticatedUser.id
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
  context.data.updateCourse(course, courseid, context.authenticatedUser.emailAddress, context.password )
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

export default withRouter(UpdateCourse);