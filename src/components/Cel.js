import React from 'react';
import {SnakeHead, SnakeBody, Food, SuperFood} from '../constants';

const Cel = ({isOn, celState}) => {
    let className = `matrixCel `;
    if (celState === 1) {
        className += SnakeHead.class; 
    }
    if (celState === 2) {
        className += SnakeBody.class; 
    }
    if (celState === 3) {
        className += Food.class; 
    }
    if (celState === 4) {
        className += SuperFood.class; 
    }
    return (
        <div className={className}></div>
    )
}

export default Cel;