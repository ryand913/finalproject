import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom'

class CourseDetail extends Component {
    constructor() {
        super();
        this.state = {
          courses: []
        };
      } 

    componentDidMount() {
        const id = this.props.match.params.id;
        this.apiCall(id);
      }

    apiCall = (params) => {


      fetch(`http://localhost:5000/api/courses/${params}`)
        .then(response => response.json())
        .then(responseData => {
          this.setState({courses: responseData})
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
    }  

    
    render(){
      let { context } = this.props
      let course = this.state.courses

        return(

          <main>
          <div className="actions--bar">
            <div className="wrap">
            {(context.authenticatedUser && context.authenticatedUser.id === course.User?.id)  ? (
              <React.Fragment>
                <NavLink className="button" to={`/courses/update/${course.id}`}>Update Course</NavLink>
                <button className="button" onClick={this.remove}>Delete Course</button>
                <button className="button button-secondary" onClick={this.cancel}>Return To List</button>
            </React.Fragment>
            ) : (
              <React.Fragment>
              <button className="button button-secondary" onClick={this.cancel}>Return To List</button>
            </React.Fragment>
            )}
            </div>
            </div>
        <div className="wrap">
        <h2>Course Detail</h2>
        <form>
            <div className="main--flex">
                <div>
                    <h3 className="course--detail--title">Course</h3>
                    <h4 className="course--name">{course.title}</h4>
                    <p>By {course.User?.firstName} {course.User?.lastName}</p>
                    <p>{course.description}</p>
                </div>
                <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime}</p>

                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ul className="course--detail--list">
                        <li>{`${course.materialsNeeded}`}</li>
                    </ul>
                </div>
            </div>
        </form>
    </div>
</main>
        )
    }
    remove = () => {
      const id = this.state.courses.id
      const { context } = this.props;
      console.log(context)
    context.data.deleteCourse(id, context.authenticatedUser.emailAddress, context.password)
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


export default withRouter(CourseDetail);