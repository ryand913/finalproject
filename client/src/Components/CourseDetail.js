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
        let course = this.state.courses
        return(

<main>
            <div className="wrap">
                <NavLink className="button" to={`/courses/update/${course.id}`}>Update Course</NavLink>
                <NavLink className="button" to={`courses/delete/${course.id}`}>Delete Course</NavLink>
                <NavLink className="button" to="/">Return to List</NavLink>
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
                    {/* {course.map(material => {
                        return( */}
                            <li>{`${course.materialsNeeded}`}</li>
                            {/* )
                    })
                    } */}
                    </ul>
                </div>
            </div>
        </form>
    </div>
</main>
        )
    }
}

export default withRouter(CourseDetail);