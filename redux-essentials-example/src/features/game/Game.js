import React, { Component } from "react";
import { useSelector, useDispatch } from 'react-redux';
import './Game.css';

const symbols = ['X', 'O'];

class Game extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      user: props.user,
      id: props.id,
      isLoaded: false,
      cell_1: null,
      cell_2: null,
      cell_3: null,
      cell_4: null,
      cell_5: null,
      cell_6: null,
      cell_7: null,
      cell_8: null,
      cell_9: null
    };
  }

  getСondition() {
    fetch(`http://localhost:5000/games/${this.id}/condition`, {method: 'GET', credentials: 'include'})
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if(data.message === "success") {
        this.setState({
          cell_1: data.cell_1,
          cell_2: data.cell_2,
          cell_3: data.cell_3,
          cell_4: data.cell_4,
          cell_5: data.cell_5,
          cell_6: data.cell_6,
          cell_7: data.cell_7,
          cell_8: data.cell_8,
          cell_9: data.cell_9,
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

  postStep(x, y) {
    fetch(`http://localhost:5000/games/${this.id}/step/${x}/${y}`, {method: 'POST', credentials: 'include'})
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if(data.message === "Unauthorized") {
        this.setState({
          
          isLoaded: true
        });
      } else if(data.message === "Authorized") {
        this.setState({
          
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

  click(cell, x, y) {
    if(!cell) {
      this.postStep(x, y);
    }
  }

  render() {
    const { error,user , cell_1 , cell_2, cell_3, cell_4, cell_5, cell_6, cell_7, cell_8, cell_9} = this.state;
    return (
      <div>
        <div className="bar"> 
          <p>{user}</p>
        </div>
        <div className="game-container">
          <div className="board">
          <button
          className="cell"
           onClick={() => this.click(cell_1, 0, 0)}
            >{cell_1}</button>
          <button
          className="cell"
           onClick={() => this.click(cell_2, 1, 0)}
            >{cell_2}</button>
          <button
          className="cell"
           onClick={() => this.click(cell_3, 2, 0)}
            >{cell_3}</button>
          <button
          className="cell"
           onClick={() => this.click(cell_4, 0, 1)}
            >{cell_4}</button>
          <button
          className="cell"
           onClick={() => this.click(cell_5, 1, 1)}
            >{cell_5}</button>
          <button
          className="cell"
           onClick={() => this.click(cell_6, 2, 1)}
            >{cell_6}</button>
          <button
          className="cell"
           onClick={() => this.click(cell_7, 0, 2)}
            >{cell_7}</button>
          <button
          className="cell"
           onClick={() => this.click(cell_8, 1, 2)}
            >{cell_8}</button>
          <button
          className="cell"
           onClick={() => this.click(cell_9, 2, 2)}
            >{cell_9}</button>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Game;