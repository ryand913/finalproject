import React, { Component } from 'react';
import Context from '../Context'
export default class CreateCourse extends Component {

        state = {
            title: '',
            desc: '',
            time:'',
            'materials': ''
          };

          handleSubmit = async (event) => {
            event.preventDefault();
            const course = {
              title: this.state.title,
              desc: this.state.desc,
              time: this.state.time,
              materials: this.state.materials
            }
            try {
            let res = await fetch("http://localhost:5000/api/courses", {
                        method: 'POST',
                        body: {
                            course
                        },
        
                      });
                      console.log(res)
                      if (res.status === 200) {
                        console.log(res)
                      } else {
                        console.log("fail")
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }
          
render(){

        return(
            <div id="root">  
        <body>
                <main>
                    <div className="wrap">
                        <h2>Create Course</h2>
                        <div className="validation--errors">
                            <h3>Validation Errors</h3>
                            <ul>
                                <li>Please provide a value for "Title"</li>
                                <li>Please provide a value for "Description"</li>
                            </ul>
                        </div>
                        {/* <form onSubmit={handleSubmit}>
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="courseTitle">Course Title</label>
                                    <input id="courseTitle"
                                    name="courseTitle" 
                                    type="text" 
                                    value={title || ''}
                                    onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <p>By Joe Smith</p>
        
                                    <label htmlFor="courseDescription">Course Description</label>
                                    <textarea id="courseDescription" 
                                    name="courseDescription"
                                    value={desc || ''} 
                                    onChange={(e) => setDesc(e.target.value)}></textarea>
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input id="estimatedTime" 
                                    name="estimatedTime" type="text" 
                                    value={time || ''} 
                                    onChange={(e) => setTime(e.target.value)}/>
        
                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                    <textarea 
                                    id="materialsNeeded" 
                                    name="materialsNeeded" 
                                    value={materials || ''} 
                                    onChange={(e) => setMaterials(e.target.value)}></textarea>
                                </div>
                            </div>
                            <button className="button" type="submit">Create Course</button><button className="button button-secondary">Cancel</button>
                        </form> */}
                    </div>
                </main>

        </body>
        </div>
        )
    }
}
