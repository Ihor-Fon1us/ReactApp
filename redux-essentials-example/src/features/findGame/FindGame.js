import React, { Component } from "react";
import './FindGame.css';
class FindGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      user: props.user,
      newGameId: null,
      games: [],
      isLoaded: false
    };
  }
  
  componentDidMount() {
    if(this.state.isLoaded === false) {
      fetch("http://localhost:5000/games/freegames", {method: 'GET', credentials: 'include'})
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        
          this.setState({
            games: data.games,
            isLoaded: true
          });
        
          this.setState({
            user: data.user,
            isAuth: true,
            isLoaded: true
          });
        
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
    const { games,  } = this.props;
    
    for (const game of games) {
      return (
        <div className="board"><div className="cell">{game.id}
        <button className="button" onClick={() => this.click(game.id)}>{game.id}</button>
        </div></div>
      )
    }
  }
}
 
export default FindGame;