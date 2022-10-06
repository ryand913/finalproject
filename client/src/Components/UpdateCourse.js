import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class UpdateCourse extends Component{

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
            <div class="wrap">
                <h2>Update Course</h2>
                <form>
                    <div class="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title} />

                            <p>By Joe Smith</p>

                            <label for="courseDescription">Course Description</label>
                            <textarea defaultValue={course.description} id="courseDescription" name="courseDescription"/>
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime} />

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea defaultValue={course.materialsNeeded} id="materialsNeeded" name="materialsNeeded"/>
                        </div>
                    </div>
                    <button class="button" type="submit">Update Course</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
            </div>
        </main>
        )
    }
}

export default withRouter(UpdateCourse);