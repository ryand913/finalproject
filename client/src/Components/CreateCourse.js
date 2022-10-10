import React, { useState } from 'react';

export default function CreateCourse(){

        const [title, setTitle] = useState("");
        const [desc, setDesc] = useState("");
        const [time, setTime] = useState("");
        const [materials, setMaterials] = useState("");

        let handleSubmit = async (e) => {
            console.log(title)
            e.preventDefault();
            try {
              let res = await fetch("http://localhost:5000/api/courses", {
                method: 'POST',
                body: JSON.stringify({
                  title: title,
                  description: desc,
                  estimatedTime: time,
                  materialsNeeded: materials
                }),

              });
              console.log(res)
              if (res.status === 200) {
                setTitle("");
                setDesc("");
                setTime("");
                setMaterials("")
              } else {
                console.log(res.headers)
              }
            } catch (err) {
              console.log(err);
            }
          };

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
                        <form onSubmit={handleSubmit}>
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
                        </form>
                    </div>
                </main>

        </body>
        </div>
        )
    }

