import React, { Component } from "react";
import { Home } from './features/login/Home';
import FindGame from './features/findGame/FindGame';
import Game from './features/game/Game';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      user: null,
      isAuth: false,
      isLoaded: false
    };
  }

  componentDidMount() {
    if(this.state.isAuth === false) {
      fetch("http://localhost:5000/api/login", {method: 'POST', credentials: 'include'})
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if(data.message === "Unauthorized") {
          this.setState({
            isAuth: false,
            isLoaded: true
          });
        } else if(data.message === "Authorized") {
          this.setState({
            user: data.user,
            isAuth: true,
            isLoaded: true
          });
        }
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      });
    }
  }
  

  render() {
    const { error,user, isAuth, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if(isLoaded === false) {
      return (
      <div className="App">
        <header className="App-header">
          <h1>Loaing...</h1>
        </header>
      </div>
    );
    } else if (isAuth === false) {
      return (
        <div className="App">
          <header className="App-header">
            <Home/>
          </header>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <FindGame user={user}/>
          </header>
        </div>
      );
    }
  }
}
 

export default App;
