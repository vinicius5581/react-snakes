import React from 'react';
import Cel from './Cel';

const Matrix = ({matrix}) => {
    return (
        <div className='matrixWrapper'>
            {matrix.map((row, rIdx) => (<div key={`row-${rIdx}`} className='matrixRow'>
                {row.map((col, cIdx) => {
                    return  (
                        <Cel 
                            key={`col-${cIdx}`}                            
                            celState={matrix[rIdx][cIdx]}
                        />
                    );
                }
                )}
            </div>))}
        </div>
    )
}

export default Matrix;