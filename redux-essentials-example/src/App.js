import React, { Component } from "react";
import List from "./features/interrogation/List";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      list: [],
      name: '',
      surname: '',
      date: '',
      email: '',
    };
  }

  async postList() {
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
      }
    
    function validateString(name) {
        var re = /^[a-zA-Z]+$/;
        return re.test(name);
    }

    if (validateString(this.state.name) && validateString(this.state.surname) && validateEmail(this.state.email)) {
        const list = {
            link: {
                Name: this.state.name,
                Surname: this.state.surname,
                DateOfBirth: this.state.date,
                Email: this.state.email
            } 
          }
          this.setState({
            isLoaded: false
          });
          await fetch("http://localhost:5000/api/list", {method: 'POST',headers: {'Content-Type': 'application/json' }, body: JSON.stringify(list)})
          .then(response => response.json())
          .then((data) => {
            
            this.setState({
              list: data.links,
              isLoaded: true
            })
            
          })
          
        
    } else {
        this.showAlertNoValide()
    } 
  }

  showAlertNoValide() {
    alert("NO VALID");
  }


  componentDidMount() {
    if(this.state.isLoaded === false) {
      fetch("http://localhost:5000/api/lists", {method: 'POST'})
      .then(response => {console.log(response);
        return response.json()})
      .then((data) => {
        console.log("eto data", data);
        this.setState({
          list: data.links,
          isLoaded: true
        })
        
      },
      (error) => {
        this.setState({
          error,
          isLoaded: true
        })
      });
    }
  }
  

  render() {
    const { error, isLoaded, list, name, surname, date, email } = this.state;
    if (error) {
      return <div className="App" >Error: {error.message}</div>;
    } else if(isLoaded === false) {
        return (
        <div className="App">
          <div className="App-header">
            <h1>Loaing...</h1>
          </div>
          <div className="App-body">
          <div>
            <div className="board">
            <input
                className="textbox"
                placeholder="Name"
                value={name}
                onChange={(e) => this.setState({name: e.target.value})}
                />
            <input
                className="textbox"
                placeholder="Surname"
                value={surname}
                onChange={(e) => this.setState({surname: e.target.value})}
                />
            <input
                className="textbox"
                placeholder="Date of birth"
                type="date"
                value={date}
                onChange={(e) => this.setState({date: e.target.value})}
                />
            <input
                className="textbox"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => this.setState({email: e.target.value})}
                />
            <button
                className="button"
                aria-label="Increment value"
                onClick={() => this.postList()}
                >
                Send
                </button>
            </div>
        </div>
          </div>
            
            
        </div>
      )} else {
      return (
        <div className="App">
          <div className="App-header">
            <List list={list}/>
          </div>
          <div className="App-body">
          <div>
            <div className="board">
            <input
                className="textbox"
                placeholder="Name"
                value={name}
                onChange={(e) => this.setState({name: e.target.value})}
                />
            <input
                className="textbox"
                placeholder="Surname"
                value={surname}
                onChange={(e) => this.setState({surname: e.target.value})}
                />
            <input
                className="textbox"
                placeholder="Date of birth"
                type="date"
                value={date}
                onChange={(e) => this.setState({date: e.target.value})}
                />
            <input
                className="textbox"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => this.setState({email: e.target.value})}
                />
            <button
                className="button"
                aria-label="Increment value"
                onClick={() => this.postList()}
                >
                Send
                </button>
            </div>
        </div>
          </div>
        </div>
      );
    }
  }
}
 

export default App;
