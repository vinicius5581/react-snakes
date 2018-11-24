import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import './App.css';

const matrixDimensions = {height: 25, width: 25}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      matrix: this.generateMatrix(matrixDimensions.height,matrixDimensions.width),
      direction: 'right',
      speed: 1000,
      snake: [[12,12],[11,12],[10,12],[9,12],[8,12],[7,12],[6,12]],
      cellOff: [],
      cellOn: []
    }
  }

  generateMatrix = (rows, cols) => [...new Array(rows)].map(row => [...new Array(cols)].map(col => false));

  updateMatrix = () => {
    const snake = this.getSnake();
    const newMatrix = [...this.state.matrix].map((row, rIdx) => row.map((cel, cIdx) => {
      const xCel = rIdx;
      const yCel = cIdx;
      const isOn = snake.filter(n => {
        const xSnake = n[0];
        const ySnake = n[1];
        return xCel === xSnake && yCel === ySnake;
      });
      return isOn.length ? true : false;
    }));
    this.setState({matrix: newMatrix})
  }

  checkKey = e => {
      const event = window.event ? window.event : e;
      const keycode = event.keyCode;
      switch (keycode) {
        case 38:
          return 'up';
        case 40:
          return 'down';
        case 37:
          return 'left';
        case 39:
          return 'right';
      }
  }

  handleKeydown = event => {
    this.setState({direction: this.checkKey(event)})
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeydown);

    this.interval = setInterval(
      () => {          
          this.updateMatrix();
      },
      this.state.speed
    );
  }

  
  stop = () => {
    this.setState({speed: 0});
    clearInterval(this.interval);
  }

  speedUp = () => this.setState((previousState)=>({speed: previousState.speed - 200}));

  speedDown = () => this.setState((previousState)=>({speed: previousState.speed + 200}));

  getSnake = () => {
    console.log('Get Snake');
    const { direction, snake } = this.state;
    const updatedSnake = [...snake];
    const cellOff = updatedSnake.splice(-1,1)[0];
    const snakeHead = snake[0];

    if (direction === 'up') {
      updatedSnake.unshift([snakeHead[0] - 1,snakeHead[1]]); // up       
    }

    if (direction === 'right') {
      updatedSnake.unshift([snakeHead[0],snakeHead[1] + 1]); // right
    }

    if (direction === 'down') {
      updatedSnake.unshift([snakeHead[0] + 1,snakeHead[1]]); // down
    }

    if (direction === 'left') {      
      updatedSnake.unshift([snakeHead[0],snakeHead[1] - 1]); // left
    }

    const updatedSnakeHeadX = updatedSnake[0][0];
    const updatedSnakeHeadY = updatedSnake[0][1];
    const cellOn = updatedSnake[0];
    
    // Game Over if snakeHead leaves bounderies
    if (updatedSnakeHeadX < 0 || updatedSnakeHeadX > matrixDimensions.width || updatedSnakeHeadY < 0 || updatedSnakeHeadY > matrixDimensions.heigth) {
      console.log('Game Over - Out of bonderies');
      this.stop();
    }
    // Game Over if sankeHead cross its own body
    if (updatedSnake.filter((i, idx) => idx > 1 ? updatedSnakeHeadX === i[0] && updatedSnakeHeadY === i[1] : false).length) {
      console.log('Game Over - Crossing');
      this.stop();
    }

    updatedSnake.map(i => console.log(i));

    this.setState({snake: updatedSnake, cellOff, cellOn})
    return updatedSnake;
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClick);
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">
       <Header />
       <Main 
        direction={this.state.direction}
        matrix={this.state.matrix}
        snake={this.state.snake}
        cellOn={this.state.cellOn}
        cellOff={this.state.cellOff}
       />
       <Footer />
      </div>
    );
  }
}

export default App;
