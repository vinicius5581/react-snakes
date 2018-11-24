import React from 'react';
import Cel from './Cel';

const Matrix = ({matrix}) => {
    return (
        <div className='matrixWrapper'>
            {matrix.map((row, rIdx) => (<div className='matrixRow'>
                {row.map((col, cIdx) => {
                    return  (
                        <Cel 
                            isOn={matrix[rIdx][cIdx]}
                        />
                    );
                }
                )}
            </div>))}
        </div>
    )
}

export default Matrix;