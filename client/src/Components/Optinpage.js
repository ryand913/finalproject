import React, { Component } from 'react';

const braze = require("@braze/web-sdk");

class OptinPage extends Component {

      render(){

        return(
          <>
            <main>
            <div className="wrap main--grid">         
                <h1>Opt-in agreement</h1>
                <p>click the below button to enroll in our push notifications
                <label class="switch">
                <input type="checkbox" onClick={braze.requestPushPermission}/>
                 <span class="slider round"></span>
</label>

                </p>
            </div>
        </main>
        </>
        )
    }
    
}
export default OptinPage