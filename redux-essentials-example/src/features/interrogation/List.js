import React, { Component } from "react";
import './Interrogation.css';

class Interrogation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      list: props.list
    };
  }
  


  render() {
    const {error, list} = this.props
    if(error) {
        return <div>Error: {error.message}</div>;
    } else if(!list) {
        return <div> No records </div>
    } else {
        return (
            <div>
                <div className="list">
                    {list.map((user) =>  
                        <ul className="cell">
                            Name: {user.Name}
                            <br/>
                            Surname: {user.Surname}
                            <br/>
                            DateOfBirth: {user.DateOfBirth}
                            <br/>
                            Email: {user.Email}
                        </ul>

                        
                    )}
                </div>
            </div>
        );
    }
  }
}
  
    

 
export default Interrogation;