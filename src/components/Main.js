import React from 'react';
import Matrix from './Matrix';

const Main = ({matrix, direction, cellOn, cellOff}) => (
    <main>
        <Matrix 
            matrix={matrix}
        />
    </main>
)

export default Main;