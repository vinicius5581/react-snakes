import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import './App.css';
import {EmptyCel, SnakeHead, SnakeBody, Food} from '../constants';

const matrixDimensions = {height: 25, width: 25}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      matrix: this.generateMatrix(matrixDimensions.height,matrixDimensions.width),
      direction: 'right',
      speed: 100,
      snake: [[12,12],[11,12],[10,12]],
      hasFood: false,
      foodPos: []
    }
  }

  generateMatrix = (rows, cols) => [...new Array(rows)].map(row => [...new Array(cols)].map(col => 0));

  getFood = () => {
    if (this.state.hasFood) {
      return this.state.foodPos;
    } else {
      const snake = this.state.snake;
      const maxWidth = matrixDimensions.width;
      const minWidth = 0;
      const maxHeight = matrixDimensions.height;
      const minHeight = 0;
      let hasConflict = true;
      let xFood;
      let yFood;
      while (hasConflict) {             
        xFood = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
        yFood = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
        hasConflict = !!snake.filter(n => n[0] === xFood && n[1] === yFood).length;
      }      
      this.setState({foodPos: [xFood, yFood], hasFood: true});
      return [xFood, yFood];
    }
  }

  updateMatrix = () => {
    let snake = this.getSnake(false);
    let food = this.getFood();
    let isEating = false;


    isEating = snake[0][0] === food[0] && snake[0][1] === food[1];

    if (isEating) {
      snake = this.getSnake(isEating);
      this.setState({
        hasFood: false,
        foodPos: []
      })
    }

    const newMatrix = [...this.state.matrix].map((row, rIdx) => row.map((cel, cIdx) => {
      const xCel = rIdx;
      const yCel = cIdx;

      const isSnakeBody = !!snake.filter(n => {
        const xSnake = n[0];
        const ySnake = n[1];
        return xCel === xSnake && yCel === ySnake;
      }).length;

      const isSnakeHead = xCel === snake[0][0] && yCel === snake[0][1];

      const isFood = xCel === food[0] && yCel === food[1];      
      
      return isSnakeBody ? isSnakeHead ? SnakeHead.value : SnakeBody.value : isFood ? Food.value : EmptyCel.value;
    }));
  
    this.setState({matrix: newMatrix})
  }

  getDirection = e => {
      const event = window.event ? window.event : e;
      const keycode = event.keyCode;
      if (keycode === 38){
        return 'up';
      }
      if (keycode === 40){
        return 'down';
      }
      if (keycode === 37){
        return 'left';
      }
      if (keycode === 39){
        return 'right';
      }
  }

  handleKeydown = event => {
    this.setState({direction: this.getDirection(event)})
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeydown);
    this.interval = setInterval(
      () => this.updateMatrix(),
      this.state.speed
    );
  }

  
  stop = () => {
    this.setState({speed: 0});
    clearInterval(this.interval);
  }

  speedUp = () => this.setState((previousState)=>({speed: previousState.speed - 200}), () => {
    this.interval = setInterval(
      () => this.updateMatrix(),
      this.state.speed
    );
  });

  speedDown = () => this.setState((previousState)=>({speed: previousState.speed + 200}), () => {
    this.interval = setInterval(
      () => this.updateMatrix(),
      this.state.speed
    );
  });

  getSnake = (isEating) => {
    const { direction, snake } = this.state;
    const updatedSnake = [...snake];
    if (!isEating) {
      updatedSnake.splice(-1,1);
    }    
    const snakeHead = snake[0];

    if (direction === 'up') {
      updatedSnake.unshift([snakeHead[0] - 1,snakeHead[1]]);     
    }

    if (direction === 'right') {
      updatedSnake.unshift([snakeHead[0],snakeHead[1] + 1]);
    }

    if (direction === 'down') {
      updatedSnake.unshift([snakeHead[0] + 1,snakeHead[1]]);
    }

    if (direction === 'left') {      
      updatedSnake.unshift([snakeHead[0],snakeHead[1] - 1]);
    }

    const updatedSnakeHeadY = updatedSnake[0][0];
    const updatedSnakeHeadX = updatedSnake[0][1];
    console.log('updatedSnakeHeadX', updatedSnakeHeadX);
    console.log(`updatedSnakeHeadX ${updatedSnakeHeadX} matrixDimensions.width ${matrixDimensions.width}`);
    console.log(`updatedSnakeHeadY ${updatedSnakeHeadY} matrixDimensions.height ${matrixDimensions.height}`);
    // Game Over if snakeHead leaves bounderies
    if (updatedSnakeHeadX < 0 || updatedSnakeHeadX >= matrixDimensions.width || updatedSnakeHeadY < 0 || updatedSnakeHeadY >= matrixDimensions.height) {
      console.log('Game Over - Out of bonderies');
      this.setState({snake: snake});
      this.stop();
      return snake;
    }
    // Game Over if sankeHead cross its own body
    if (updatedSnake.filter((i, idx) => idx > 1 ? updatedSnakeHeadY === i[0] && updatedSnakeHeadX === i[1] : false).length) {
      console.log('Game Over - Crossing');
      this.setState({snake: snake});
      this.stop();
      return snake;      
    }

    this.setState({snake: updatedSnake})
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
        matrix={this.state.matrix}
        snake={this.state.snake}
       />
       <Footer />
      </div>
    );
  }
}

export default App;
